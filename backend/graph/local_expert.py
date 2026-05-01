# Local Knowledge Base for Election Rover 2026
# Providing expert guidance even during 'Cloud Blackouts'

LOCAL_KNOWLEDGE = {
    "form 6a": "Form 6A is the application for registration in the electoral roll for an Overseas (NRI) elector. It allows Indian citizens living abroad to exercise their right to vote.",
    "nri": "Non-Resident Indians (NRIs) are Indian citizens who live abroad. They can register as 'Overseas Electors' using Form 6A.",
    "deo": "The District Election Officer (DEO) is responsible for supervising the election work in a district. They ensure the integrity of the registration and voting process.",
    "6a": "Form 6A is the registration form for Overseas Indian citizens. It is the first step for NRIs to participate in the democratic process.",
    "eligible": "To be eligible for Form 6A, you must be an Indian citizen, at least 18 years old, and living abroad for employment, education, or other reasons.",
    "documents": "For Form 6A, you typically need a scanned copy of your passport (valid), your visa, and a recent photograph."
}

def get_local_answer(query: str):
    """Checks the local knowledge base for a high-fidelity answer."""
    query_lower = query.lower()
    for key, answer in LOCAL_KNOWLEDGE.items():
        if key in query_lower:
            return f"Election Rover (Local Expert): {answer}"
    return None
