from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sys
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
    # Primary entry point with multi-tier fail-safes
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
        
        # Level 1 Fail-Safe: Inside the Graph Engine
        try:
            result = app_graph.invoke(initial_state)
            last_msg = result['messages'][-1]
            return {
                "response": last_msg['content'],
                "points": result.get('points', 0),
                "badges": result.get('badges', [])
            }
        except Exception as graph_err:
            print(f"LEVEL 1 FAIL: GRAPH ENGINE CRASHED: {str(graph_err)}")
            # Level 2 Fail-Safe: Emergency AI Bypass
            from backend.graph.workflow import get_gemini_response
            fallback_text = get_gemini_response(request.message, request.role, request.language)
            return {
                "response": fallback_text,
                "points": request.points,
                "badges": request.badges,
                "status": "emergency_bypass"
            }
            
    except Exception as e:
        # Level 3 Fail-Safe: Critical Runtime Catch-All
        print(f"LEVEL 3 FAIL: CRITICAL RUNTIME ERROR: {str(e)}")
        return {
            "response": "The Election Rover is experiencing heavy volume. Please check your Form 6A status directly at voterportal.eci.gov.in.",
            "points": request.points,
            "badges": request.badges,
            "status": "critical_error"
        }

@app.get("/health")
def health():
    return {"status": "green", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
