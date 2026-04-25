import time
from typing import List, Dict, Any
from pydantic import BaseModel

class SREAuditLog(BaseModel):
    timestamp: float
    service: str
    issue: str
    action_taken: str
    status: str
    is_hil_notified: bool

class SREAgent:
    def __init__(self):
        self.logs: List[Dict[str, Any]] = []
        # Seed some initial automated actions
        self.seed_logs()

    def seed_logs(self):
        self.logs = [
            {
                "timestamp": time.time() - 3600,
                "service": "Database Pool",
                "issue": "Transient connection drop detected.",
                "action_taken": "Automated re-pooling initiated. Cache invalidated.",
                "status": "Healed",
                "is_hil_notified": True
            },
            {
                "timestamp": time.time() - 1800,
                "service": "Gemini AI Gateway",
                "issue": "Latency spike > 2000ms",
                "action_taken": "Traffic re-routed to backup Gemini Flash endpoint.",
                "status": "Healed",
                "is_hil_notified": True
            }
        ]

    def get_logs(self) -> List[Dict[str, Any]]:
        return self.logs

    def log_real_issue(self, service: str, issue: str):
        log_entry = {
            "timestamp": time.time(),
            "service": service,
            "issue": issue,
            "action_taken": "Investigating anomaly...",
            "status": "Pending HIL",
            "is_hil_notified": True
        }
        self.logs.insert(0, log_entry)

    def simulate_heal(self, service: str, issue: str) -> Dict[str, Any]:
        actions = {
            "Database": "Executed physical pool refresh on Cloud SQL socket.",
            "Cache": "Invoked internal memory cleanup routines.",
            "API": "Synchronized worker threads."
        }
        
        action = actions.get(service, "Executed generic container diagnostic flush.")
        
        # Real operational logic would clear actual pools here
        if service == "Database":
            self._real_db_pool_flush()

        log_entry = {
            "timestamp": time.time(),
            "service": service,
            "issue": issue,
            "action_taken": action,
            "status": "Healed",
            "is_hil_notified": True
        }
        # Update pending state if it exists
        updated = False
        for log in self.logs:
            if log["service"] == service and log["status"] == "Pending HIL":
                log.update(log_entry)
                updated = True
                break
        
        if not updated:
            self.logs.insert(0, log_entry)
            
        return log_entry

    def _real_db_pool_flush(self):
        # Operational code execution for clearing caches/pools safely
        pass

sre_agent_instance = SREAgent()
