import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    """Verify build integrity with a health check."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "green", "version": "1.0.0"}

@patch('backend.graph.workflow.genai.Client')
def test_chat_payload_validation(mock_client_class):
    """Verify that the chat endpoint correctly validates role input."""
    # Setup mock
    mock_client = MagicMock()
    mock_chat = MagicMock()
    mock_response = MagicMock()
    mock_response.text = "Mocked AI response for election protocols."
    mock_chat.send_message.return_value = mock_response
    mock_client.chats.create.return_value = mock_chat
    mock_client_class.return_value = mock_client

    response = client.post("/chat", json={
        "message": "Hello",
        "role": "voter",
        "language": "en"
    })
    assert response.status_code == 200
    assert "Mocked AI response" in response.text
 
