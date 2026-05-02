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
    # If no project ID is found, Vertex AI cannot be used. 
    # Fallback to API Key is handled here.
    if not project_id:
        api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
        if not api_key: return None
        return genai.Client(api_key=api_key)
    
    # We use us-central1 but also allow location overrides if set
    loc = os.getenv("GCP_LOCATION", "us-central1")
    print(f"IDENTITY AUTH: Project={project_id}, Location={loc}")
    return genai.Client(vertexai=True, project=project_id, location=loc)

def educator_node(state: AgentState):
    client = get_client()
    if not client: raise ValueError("NO_AUTH_FOUND")
    
    messages = state['messages']
    role = state['current_role']
    system_prompt = f"You are the Educator Agent. Role: {role}."
    
    history_text = "\n".join([f"{m['role']}: {m.get('content','')}" for m in messages[:-1]])
    full_prompt = f"{system_prompt}\n\nUser: {messages[-1]['content']}"
    
    # THE ULTIMATE LIST: Including older stable models just in case
    models_to_try = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-1.0-pro',
        'gemini-1.5-flash-002',
        'gemini-1.5-pro-002'
    ]
    
    # DISCOVERY LOG: Try to list what we CAN see
    try:
        available = [m.name for m in client.models.list()]
        print(f"DISCOVERY: I see these models: {available}")
        # If the list is not empty, let's try the first one that has 'flash' or 'pro' in it
        if available:
            for adv_model in available:
                if adv_model not in models_to_try:
                    models_to_try.insert(0, adv_model)
    except Exception as list_err:
        print(f"DISCOVERY FAILED: {str(list_err)}")

    last_error = None
    for model_id in models_to_try:
        try:
            print(f"TRYING: {model_id}")
            response = client.models.generate_content(model=model_id, contents=full_prompt)
            print(f"SUCCESS: {model_id}")
            return {
                "messages": messages + [{"role": "assistant", "content": response.text}],
                "next_node": "gamemaster"
            }
        except Exception as e:
            print(f"FAILED: {model_id} - {str(e)}")
            last_error = e
            continue
            
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
    client = get_client()
    if not client: return "Connection Error: NO_AUTH"
    for m in ['gemini-1.5-flash', 'gemini-1.5-pro']:
        try:
            resp = client.models.generate_content(model=m, contents=prompt)
            return resp.text
        except: continue
    return "Frontier Offline."
