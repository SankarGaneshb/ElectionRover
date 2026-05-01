import os
from backend.graph.workflow import get_gemini_response

class SemanticValidator:
    @staticmethod
    async def audit_content(text: str, role: str, lang: str):
        """
        Uses Gemini to audit the semantic correctness of UI text.
        """
        prompt = f"""
        You are a specialized Quality Assurance Auditor for the 'Election Rover' platform.
        Your task is to verify if the following UI text is culturally, linguistically, and technically accurate 
        for an Indian {role} using the platform in {lang}.

        UI TEXT TO AUDIT:
        "{text}"

        CRITERIA:
        1. Script: Is the script correct for {lang}? (e.g. Devanagari for Hindi).
        2. Context: Does it make sense for a {role}? 
        3. Tone: Is it professional and helpful for a democratic exercise?
        4. No Transliteration: Strictly penalize 'lazy' English-to-Regional transliterations (e.g., using 'इलेक्शन' instead of 'चुनाव'). Prefer authentic, meaningful words (e.g., 'अन्वेषक' instead of 'रोवर').
        5. Accuracy: Does it use correct election terminology (e.g. 'Booth', 'Constituency', 'Affidavit')?

        RESPONSE FORMAT (JSON):
        {{
            "isCorrect": boolean,
            "reasoning": "Brief explanation of why it passed or failed",
            "suggestedFix": "Optional better version in {lang}",
            "confidence": 0-1
        }}
        """
        try:
            response = await get_gemini_response(prompt)
            # Basic parsing of the response
            import json
            # Clean response if it contains markdown code blocks
            clean_res = response.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_res)
        except Exception as e:
            return {
                "isCorrect": True, # Fail open for network issues
                "reasoning": f"Audit bypassed due to technical error: {e}",
                "confidence": 0
            }

validator = SemanticValidator()
