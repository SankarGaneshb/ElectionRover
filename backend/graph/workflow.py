from typing import Annotated, List, TypedDict
from langgraph.graph import StateGraph, END
from google import genai
import os
import sys

# Enforce UTF-8 for regional script stability
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except:
        pass

# Define the state schema
class AgentState(TypedDict):
    messages: List[dict]
    current_role: str
    language: str
    points: int
    badges: List[str]
    next_node: str

def get_client():
    # Vertex AI Native Authentication (No Key Required)
    project_id = os.getenv("GCP_PROJECT_ID") or os.getenv("GOOGLE_CLOUD_PROJECT")
    
    if not project_id:
        print("WARNING: No GCP_PROJECT_ID found. Falling back to API Key if present...")
        api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("CRITICAL: Both Project ID and API Key are missing.")
        return genai.Client(api_key=api_key)

    # Institutional Grade: Use Vertex AI identity
    print(f"IDENTITY AUTH: Connecting to Vertex AI in project: {project_id}")
    return genai.Client(vertex_ai=True, project=project_id, location="us-central1")

# Node: Educator Agent - Native & Stable
def educator_node(state: AgentState):
    client = get_client()
    messages = state['messages']
    role = state['current_role']
    
    # Expert Context
    system_prompt = f"You are the Educator Agent for Election Rover. " \
                    f"Provide expert guidance on the Indian election process for: {role}. " \
                    f"Keep responses concise and helpful."
    
    # History Purifier
    history_text = ""
    last_role = None
    for m in messages[:-1]:
        curr = "user" if m['role'] == 'user' else "model"
        if curr == last_role: continue
        history_text += f"{curr}: {m.get('content', '')}\n"
        last_role = curr
    
    full_prompt = f"System Context: {system_prompt}\n\nRecent History:\n{history_text}\nUser Question: {messages[-1]['content']}"
    
    try:
        # Using stable Vertex AI model ID
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=full_prompt
        )
        return {
            "messages": messages + [{"role": "assistant", "content": response.text}],
            "next_node": "gamemaster"
        }
    except Exception as e:
        print(f"CRITICAL VERTEX AI ERROR: {str(e)}")
        raise e

# Node: GameMaster Agent
def gamemaster_node(state: AgentState):
    return {
        "points": state.get('points', 0) + 10,
        "next_node": END
    }

# Build the Graph
workflow = StateGraph(AgentState)
workflow.add_node("educator", educator_node)
workflow.add_node("gamemaster", gamemaster_node)

workflow.set_entry_point("educator")
workflow.add_edge("educator", "gamemaster")
workflow.add_edge("gamemaster", END)

app_graph = workflow.compile()

# Legacy bridge
def get_gemini_response(prompt: str, role: str = "Voter", lang: str = "en"):
    client = get_client()
    try:
        resp = client.models.generate_content(model='gemini-1.5-flash', contents=prompt)
        return resp.text
    except Exception as e:
        return f"Vertex Connection Error: {str(e)}"
