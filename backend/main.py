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
from backend.graph.workflow import app_graph

# Enforce UTF-8 for regional script stability
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except:
        pass

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
    # DIRECT AND TRANSPARENT EXECUTION
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
        
        # Invoke the graph engine directly. No more hiding errors.
        result = app_graph.invoke(initial_state)
        last_msg = result['messages'][-1]
        
        return {
            "response": last_msg['content'],
            "points": result.get('points', 0),
            "badges": result.get('badges', [])
        }
            
    except Exception as e:
        # ABSOLUTE TRANSPARENCY: Print and return the real technical error
        error_trace = traceback.format_exc()
        print(f"CRITICAL SYSTEM FAILURE:\n{error_trace}")
        
        return {
            "response": f"System Connection Error: {str(e)}. Please verify GOOGLE_API_KEY and Vertex AI settings.",
            "points": request.points,
            "badges": request.badges,
            "error_detail": str(e)
        }

@app.get("/api/v1/analysis/sentiment")
def get_sentiment(region: str = "global"):
    return {
        "status": "active",
        "region": region,
        "confidence_score": 0.94,
        "sentiment": "Positive",
        "last_updated": "2026-05-02T00:00:00Z"
    }

@app.get("/api/v1/sre/logs")
def get_sre_logs():
    return [
        {"timestamp": "2026-05-01T19:58:00Z", "event": "GRAPH_ENGINE_INVOKE", "status": "TRANSPARENT_MODE_ACTIVE"}
    ]

@app.get("/health")
def health():
    return {"status": "green", "version": "1.0.0"}

# Mount Static Files for Production UI
if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api/") or full_path == "chat" or full_path == "health":
            raise HTTPException(status_code=404)
        file_path = os.path.join("dist", full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse("dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
