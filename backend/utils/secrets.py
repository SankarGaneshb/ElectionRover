import os
from google.cloud import secretmanager
from dotenv import load_dotenv

load_dotenv()

def get_secret(secret_id, project_id="electionrover"):
    """
    Fetch a secret from Google Cloud Secret Manager.
    """
    try:
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        print(f"Error fetching secret {secret_id}: {e}")
        # Fallback to env variable for local development
        return os.getenv(secret_id)

def get_gemini_api_key():
    return get_secret("GEMINI_API_KEY")
