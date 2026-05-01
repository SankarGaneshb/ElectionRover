import json
import asyncio
import os
import sys

# Add current dir to path
sys.path.append(os.getcwd())

from backend.graph.workflow import get_gemini_response

async def audit_all_languages():
    langs = ["te", "kn", "bn", "ml", "mr", "gu", "or", "pa"]
    results = {}

    for lang in langs:
        path = f"src/shared/locales/{lang}.json"
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        prompt = f"""
        You are a linguistics expert specializing in Indian languages. 
        Audit the following {lang} localization for 'Election Rover'.
        Convert 'Lazy Transliterations' into 'High-Fidelity Regional Terms'.
        
        KEY GOALS:
        1. 'Election Rover' -> Use a word like 'Ghumakkad' (Wanderer) or 'Aaivoorthi' (Research Vehicle) that fits {lang}.
        2. 'BigQuery ML' -> Use 'Advanced AI' in {lang}.
        3. 'Portal' -> Use 'Hub' or 'Center' in {lang}.
        4. 'Protocol' -> Use 'Rules/Guidelines' in {lang}.
        
        DATA:
        {json.dumps(data, ensure_ascii=False, indent=2)}
        
        RETURN THE FULL UPDATED JSON OBJECT FOR {lang}.
        """
        try:
            response = await get_gemini_response(prompt)
            clean_res = response.replace("```json", "").replace("```", "").strip()
            # Ensure it's valid JSON
            updated_data = json.loads(clean_res)
            
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(updated_data, f, ensure_ascii=False, indent=2)
            print(f"Updated {lang} successfully.")
            await asyncio.sleep(10) # Heavy rate limiting for 9 languages
        except Exception as e:
            print(f"Error updating {lang}: {e}")

if __name__ == "__main__":
    asyncio.run(audit_all_languages())
