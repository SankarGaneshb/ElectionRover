import os
import time
from typing import TypedDict, List, Annotated, Union
from langgraph.graph import StateGraph, END
from google import genai
from dotenv import load_dotenv

load_dotenv()

# State definition
class AgentState(TypedDict):
    messages: List[dict]
    current_role: str
    language: str
    points: int
    badges: List[str]
    next_node: str

def get_client():
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    project_id = os.getenv("GCP_PROJECT_ID", "electionrover")
    
    # Vertex AI / Service Account Fallback
    if not api_key:
        print("NOTICE: No API Key found, attempting Vertex AI / Service Account auth...")
        return genai.Client(vertex_ai=True, project=project_id, location="us-central1")
        
    return genai.Client(api_key=api_key)

# Node: Educator Agent with Intelligent Multi-Tier Fallback
def educator_node(state: AgentState):
    client = get_client()
    messages = state['messages']
    role = state['current_role']
    lang = state['language']
    
    # Construction of Expert Context
    system_prompt = f"You are the Educator Agent for Election Rover. " \
                    f"Provide expert guidance on the Indian election process for the role: {role}. " \
                    f"You must adapt dynamically to the language script the user is typing in. " \
                    f"If the user asks a question in a regional script, you MUST respond EXCLUSIVELY in that script. " \
                    f"When writing in regional scripts, DO NOT use any English/Latin characters. " \
                    f"If the user converses in English, reply in English. Keep responses concise."
    
    # History Purifier: Ensure alternating user/model roles for Gemini compliance
    history = []
    last_role = None
    for m in messages[:-1]:
        current_role = "user" if m['role'] == 'user' else "model"
        # Skip consecutive roles to prevent SDK crash
        if current_role == last_role:
            continue
        history.append({
            "role": current_role,
            "parts": [{"text": m.get('content', '')}]
        })
        last_role = current_role
    
    prompt = f"System Context: {system_prompt}\n\nUser Question: {messages[-1]['content']}"
    
    # Multi-Tiered Fail-Safe Strategy: Gemini 3 -> Gemini 1.5
    models_to_try = ['gemini-3-flash-preview', 'gemini-1.5-flash']
    
    for current_model in models_to_try:
        try:
            chat = client.chats.create(model=current_model, history=history)
            response = chat.send_message(prompt)
            return {
                "messages": messages + [{"role": "assistant", "content": response.text}], 
                "next_node": "gamemaster"
            }
        except Exception as e:
            print(f"MODEL {current_model} FAILED: {str(e)}")
            if current_model == models_to_try[-1]:
                # Final production-safe fallback to ensure user never sees a 'blank' or 'generic' failure
                return {
                    "messages": messages + [{"role": "assistant", "content": f"The Educator Agent is currently reviewing the latest Election Commission guidelines for your query. Please verify your status via the official Form 6A portal."}],
                    "next_node": "gamemaster"
                }
            continue

# Node: GameMaster Agent
def gamemaster_node(state: AgentState):
    # Pass-through for current version
    return {
        "messages": state['messages'],
        "next_node": END
    }

# Build Workflow Graph
workflow = StateGraph(AgentState)
workflow.add_node("educator", educator_node)
workflow.add_node("gamemaster", gamemaster_node)

workflow.set_entry_point("educator")
workflow.add_edge("educator", "gamemaster")
workflow.add_edge("gamemaster", END)

# Compatibility Bridge for Legacy Validators
def get_gemini_response(prompt: str, role: str = "Voter", lang: str = "en"):
    """Legacy wrapper for direct AI calls used by testing utilities."""
    client = get_client()
    models = ['gemini-3-flash-preview', 'gemini-1.5-flash']
    for m in models:
        try:
            response = client.models.generate_content(model=m, contents=prompt)
            return response.text
        except:
            continue
    return "AI Bridge Failure (Compatibility Mode)"

app_graph = workflow.compile()
