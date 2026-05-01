import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_sentiment_analysis_endpoint():
    """Verify the BigQuery analysis endpoint."""
    response = client.get("/api/v1/analysis/sentiment?region=delhi")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["active", "offline", "error"]
    if data["status"] == "active":
        assert "confidence_score" in data
        assert data["region"] == "delhi"

def test_sre_logs_endpoint():
    """Verify SRE logs can be retrieved."""
    response = client.get("/api/v1/sre/logs")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_health_version():
    """Check versioning protocol."""
    response = client.get("/health")
    assert response.json()["version"] == "1.0.0"
