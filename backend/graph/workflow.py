from typing import Annotated, TypedDict, List
from langgraph.graph import StateGraph, END
from google import genai
from backend.utils.secrets import get_gemini_api_key
import os
import time

# Define the state schema
class AgentState(TypedDict):
    messages: List[dict]
    current_role: str
    language: str
    points: int
    badges: List[str]
    next_node: str

# Initialize the Client with Project Context
def get_client():
    api_key = get_gemini_api_key()
    project_id = os.getenv("GCP_PROJECT_ID", "electionrover")
    # Initializing with both key and project to ensure access to latest models
    return genai.Client(api_key=api_key)

# Node: Educator Agent with Retry & Latest Model
def educator_node(state: AgentState):
    client = get_client()
    messages = state['messages']
    role = state['current_role']
    lang = state['language']
    
    # Standardizing on Gemini 3.1 Flash Preview as requested
    model_id = 'gemini-3.1-flash-live-preview'
    
    system_prompt = f"You are the Educator Agent for Election Rover. " \
                    f"Provide expert guidance on the Indian election process for the role: {role}. " \
                    f"You must adapt dynamically to the language script the user is typing in. " \
                    f"If the user asks a question in a regional script (e.g., Hindi, Tamil, Telugu, Bengali, etc.), " \
                    f"you MUST respond EXCLUSIVELY in that same regional script. " \
                    f"When writing in regional scripts, DO NOT use any English/Latin characters. " \
                    f"If the user converses in English, reply in English. Keep responses concise."
    
    history = []
    for m in messages[:-1]:
        history.append({
            "role": "user" if m['role'] == 'user' else "model",
            "parts": [{"text": m['content']}]
        })
    
    prompt = f"System Context: {system_prompt}\n\nUser Question: {messages[-1]['content']}"
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            chat = client.chats.create(model=model_id, history=history)
            response = chat.send_message(prompt)
            return {
                "messages": messages + [{"role": "assistant", "content": response.text}], 
                "next_node": "gamemaster"
            }
        except Exception as e:
            # If 404/Not Found, try without the models/ prefix or with a standard alias
            if "NOT_FOUND" in str(e):
                try:
                    # Fallback to the stable 2026 latest alias
                    chat = client.chats.create(model='gemini-flash-latest', history=history)
                    response = chat.send_message(prompt)
                    return {
                        "messages": messages + [{"role": "assistant", "content": response.text}], 
                        "next_node": "gamemaster"
                    }
                except:
                    pass
            
            if attempt < max_retries - 1:
                time.sleep(1)
                continue
            raise e

# Node: GameMaster Agent
def gamemaster_node(state: AgentState):
    return {"points": state['points'], "next_node": END}

# Define the graph
def create_graph():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("educator", educator_node)
    workflow.add_node("gamemaster", gamemaster_node)
    
    workflow.set_entry_point("educator")
    
    workflow.add_edge("educator", "gamemaster")
    workflow.add_edge("gamemaster", END)
    
    return workflow.compile()

app_graph = create_graph()
