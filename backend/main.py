from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
import os
import sys
import traceback
from dotenv import load_dotenv
from backend.graph.workflow import app_graph, get_client
from backend.sre_agent import sre_agent_instance, SREAuditLog, db
from backend.utils.test_validator import validator
from backend.utils.bigquery_service import bq_service
from backend.utils.storage_service import storage_service

# Enforce UTF-8
if sys.stdout.encoding != 'utf-8':
    try: sys.stdout.reconfigure(encoding='utf-8')
    except: pass

load_dotenv()

app = FastAPI(title="Election Rover API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []
    role: str = "voter"
    language: str = "en"
    points: int = 0
    badges: List[str] = []

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        current_message = {"role": "user", "content": request.message}
        full_history = request.history + [current_message]
        
        initial_state = {
            "messages": full_history,
            "current_role": request.role,
            "language": request.language,
            "points": request.points,
            "badges": request.badges,
            "next_node": ""
        }
        
        result = app_graph.invoke(initial_state)
        last_msg = result['messages'][-1]
        
        return {
            "response": last_msg['content'],
            "points": result.get('points', 0),
            "badges": result.get('badges', [])
        }
            
    except Exception as e:
        error_str = str(e)
        error_code = "DIAGNOSIS_NEEDED"
        if "SERVICE_DISABLED" in error_str: error_code = "SERVICE_DISABLED"
        elif "PERMISSION_DENIED" in error_str: error_code = "PERMISSION_DENIED"
        elif "MODEL_NOT_FOUND" in error_str: error_code = "MODEL_NOT_FOUND"
        
        print(f"CRITICAL SYSTEM FAILURE:\n{traceback.format_exc()}")
        
        return {
            "response": f"Sorry, I am feeling a bit sick. [Code: {error_code}]. Visit /api/v1/sre/diagnostics for more info.",
            "points": request.points,
            "badges": request.badges,
            "error_detail": error_str
        }

@app.get("/api/v1/sre/diagnostics")
def get_diagnostics():
    # SECURE DIAGNOSTICS: Check environment status
    project_id = os.getenv("GCP_PROJECT_ID") or os.getenv("GOOGLE_CLOUD_PROJECT")
    location = os.getenv("GCP_LOCATION", "us-central1")
    
    client = get_client()
    model_list = []
    auth_status = "FAILED"
    if client:
        auth_status = "SUCCESS"
        try:
            model_list = [m.name for m in client.models.list()]
        except Exception as e:
            model_list = [f"ERROR_LISTING: {str(e)}"]
            
    return {
        "project_id": project_id,
        "location": location,
        "auth_status": auth_status,
        "available_models": model_list,
        "python_version": sys.version,
        "env_vars_present": {
            "GOOGLE_API_KEY": bool(os.getenv("GOOGLE_API_KEY")),
            "GCP_SA_KEY": bool(os.getenv("GCP_SA_KEY"))
        },
        "firestore_status": "CONNECTED" if db else "OFFLINE"
    }

@app.get("/api/v1/analysis/sentiment")
def analyze_sentiment(region: str = "national"):
    return bq_service.analyze_voter_sentiment(region)

class UploadRequest(BaseModel):
    filename: str
    content: str  # Base64 or plain string for mock

@app.post("/api/v1/storage/upload")
def upload_asset(request: UploadRequest):
    return storage_service.upload_voter_document(request.filename, request.content.encode())

@app.post("/api/v1/test/audit")
async def audit_test(request: dict):
    # This endpoint is specifically for the E2E test suite to verify semantic integrity
    text = request.get("text", "")
    role = request.get("role", "voter")
    lang = request.get("lang", "en")
    return await validator.audit_content(text, role, lang)

@app.get("/api/v1/sre/logs")
def get_sre_logs():
    return sre_agent_instance.get_logs()

class HealRequest(BaseModel):
    service: str
    issue: str

@app.post("/api/v1/sre/heal")
def sre_heal(request: HealRequest):
    return sre_agent_instance.simulate_heal(request.service, request.issue)

@app.get("/api/v1/sre/trigger_error")
def trigger_error():
    sre_agent_instance.log_real_issue("Database", "Intentional Database connection timeout simulation.")
    raise HTTPException(status_code=500, detail="Intentional Runtime Error for Chaos Engineering")

@app.get("/health")
def health():
    return {"status": "green", "version": "1.0.0"}

if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api/") or full_path == "chat" or full_path == "health":
            raise HTTPException(status_code=404)
        file_path = os.path.join("dist", full_path)
        if os.path.isfile(file_path): return FileResponse(file_path)
        return FileResponse("dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
