from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from backend.graph.workflow import app_graph
from langchain_core.messages import HumanMessage, AIMessage

app = FastAPI(title="Election Rover Backend")

@app.on_event("startup")
async def build_integrity_check():
    required_dirs = ["dist", "reel"]
    for d in required_dirs:
        if not os.path.exists(d) or not os.path.isdir(d):
            print(f"CRITICAL INTEGRITY FAILURE: Required directory '{d}' is missing!")
        elif not os.listdir(d):
            print(f"CRITICAL INTEGRITY FAILURE: Required directory '{d}' is empty!")
        else:
            print(f"Integrity Check: '{d}' directory validated successfully.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.sre_agent import sre_agent_instance
from starlette.requests import Request
from starlette.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the real issue directly to our SRE Agent instance
    sre_agent_instance.log_real_issue("API", f"Unhandled Exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error. Routed to SRE Agent for self-healing."}
    )

if os.path.exists("reel"):
    app.mount("/reel", StaticFiles(directory="reel"), name="reel")

# Serve Static Frontend
if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")



else:
    @app.get("/")
    def read_root():
        return {"message": "Election Rover API is running. Frontend not built yet."}

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
        # Simplified message handling for direct SDK
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
        
        # Get the last message content
        last_msg = result['messages'][-1]
        
        return {
            "response": last_msg['content'],
            "points": result['points'],
            "badges": result['badges']
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "green", "version": "1.0.0"}

from backend.sre_agent import sre_agent_instance

class SREHealRequest(BaseModel):
    service: str
    issue: str

@app.get("/api/v1/sre/logs")
async def get_sre_logs():
    return sre_agent_instance.get_logs()

@app.post("/api/v1/sre/heal")
async def trigger_sre_heal(request: SREHealRequest):
    return sre_agent_instance.simulate_heal(request.service, request.issue)

@app.get("/api/v1/sre/trigger_error")
def trigger_intentional_error():
    raise RuntimeError("Intentional Database connection timeout simulation.")

from backend.utils.bigquery_service import bq_service
from backend.utils.storage_service import storage_service
from fastapi import UploadFile, File

@app.get("/api/v1/analysis/sentiment")
async def get_sentiment(region: str = "national"):
    return bq_service.analyze_voter_sentiment(region)

from backend.utils.test_validator import validator

@app.post("/api/v1/test/audit")
async def audit_ui_content(data: dict):
    text = data.get("text", "")
    role = data.get("role", "voter")
    lang = data.get("lang", "en")
    return await validator.audit_content(text, role, lang)

if os.path.exists("dist"):
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Explicitly exclude API routes from being caught by the SPA handler
        if full_path.startswith("api/") or full_path in ["chat", "health"]:
            raise HTTPException(status_code=404, detail="API Route Not Found")

        if full_path.startswith("reel"):
            clean_path = full_path.replace("reel/", "", 1)
            if not clean_path or clean_path == "reel":
                clean_path = "index.html"
            reel_file = os.path.join("reel", clean_path)
            if os.path.exists(reel_file) and os.path.isfile(reel_file):
                return FileResponse(reel_file)
            return FileResponse("reel/index.html")
        
        file_path = os.path.join("dist", full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse("dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
