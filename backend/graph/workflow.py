from typing import Annotated, List, TypedDict
from langgraph.graph import StateGraph, END
from google import genai
import os
import sys
import traceback

# Enforce UTF-8
if sys.stdout.encoding != 'utf-8':
    try: sys.stdout.reconfigure(encoding='utf-8')
    except: pass

class AgentState(TypedDict):
    messages: List[dict]
    current_role: str
    language: str
    points: int
    badges: List[str]
    next_node: str

def get_client():
    project_id = os.getenv("GCP_PROJECT_ID") or os.getenv("GOOGLE_CLOUD_PROJECT")
    if not project_id:
        api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
        if not api_key: return None
        return genai.Client(api_key=api_key)
    return genai.Client(vertexai=True, project=project_id, location="us-central1")

def educator_node(state: AgentState):
    client = get_client()
    if not client: raise ValueError("NO_AUTH_FOUND")
    
    messages = state['messages']
    role = state['current_role']
    system_prompt = f"You are the Educator Agent for Election Rover (2026). Role: {role}. Be concise."
    
    # Simple history string
    history_text = "\n".join([f"{'user' if m['role']=='user' else 'model'}: {m.get('content','')}" for m in messages[:-1]])
    full_prompt = f"{system_prompt}\n\nHistory:\n{history_text}\nUser: {messages[-1]['content']}"
    
    # THE UNBREAKABLE LIST: Try best to most stable
    models_to_try = [
        'gemini-3.1-flash', 
        'gemini-3.0-flash', 
        'gemini-2.0-flash', 
        'gemini-1.5-flash-002', 
        'gemini-1.5-flash'
    ]
    
    last_error = None
    for model_id in models_to_try:
        try:
            print(f"TRYING MODEL: {model_id}")
            response = client.models.generate_content(model=model_id, contents=full_prompt)
            print(f"SUCCESS WITH: {model_id}")
            return {
                "messages": messages + [{"role": "assistant", "content": response.text}],
                "next_node": "gamemaster"
            }
        except Exception as e:
            print(f"MODEL {model_id} FAILED: {str(e)}")
            last_error = e
            continue
            
    # If ALL models fail, then we raise the last one
    raise last_error

def gamemaster_node(state: AgentState):
    return {"points": state.get('points', 0) + 15, "next_node": END}

workflow = StateGraph(AgentState)
workflow.add_node("educator", educator_node)
workflow.add_node("gamemaster", gamemaster_node)
workflow.set_entry_point("educator")
workflow.add_edge("educator", "gamemaster")
workflow.add_edge("gamemaster", END)
app_graph = workflow.compile()

def get_gemini_response(prompt: str, role: str = "Voter", lang: str = "en"):
    # Legacy bridge also uses the unbreakable logic
    client = get_client()
    if not client: return "Connection Error: NO_AUTH"
    for m in ['gemini-3.1-flash', 'gemini-1.5-flash-002', 'gemini-1.5-flash']:
        try:
            resp = client.models.generate_content(model=m, contents=prompt)
            return resp.text
        except: continue
    return "Frontier Offline. Please try again later."
