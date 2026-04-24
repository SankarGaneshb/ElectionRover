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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve Static Frontend
if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api") or full_path.startswith("chat") or full_path.startswith("health"):
            return None # Let FastAPI handle these
        
        file_path = os.path.join("dist", full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse("dist/index.html")
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
