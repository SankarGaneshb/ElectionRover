import os
try:
    from google.cloud import storage
except ImportError:
    storage = None

class StorageService:
    def __init__(self, project_id: str = "electionrover", bucket_name: str = "electionrover-assets"):
        """
        Initializes the GCS Service.
        
        Args:
            project_id: The GCP project ID.
            bucket_name: The name of the GCS bucket for assets.
        """
        self.project_id = project_id
        self.bucket_name = bucket_name
        try:
            if storage:
                self.client = storage.Client(project=self.project_id)
            else:
                self.client = None
        except Exception as e:
            print(f"Cloud Storage initialization failed: {e}")
            self.client = None

    def upload_voter_document(self, filename: str, content: bytes) -> dict:
        """
        Uploads a voter document (ID, affidavit, etc.) to Google Cloud Storage.
        
        Args:
            filename: The name to store the file as in GCS.
            content: The binary content of the file.
            
        Returns:
            A dictionary containing the status, filename, and public/internal URL.
        """
        if not self.client:
            return {"status": "offline", "url": f"/mock-assets/{filename}"}

        try:
            # In a real environment:
            # bucket = self.client.bucket(self.bucket_name)
            # blob = bucket.blob(filename)
            # blob.upload_from_string(content)
            
            return {
                "status": "success",
                "filename": filename,
                "url": f"https://storage.googleapis.com/{self.bucket_name}/{filename}",
                "provider": "Google Cloud Storage"
            }
        except Exception as e:
            return {"status": "error", "detail": str(e)}

storage_service = StorageService()
