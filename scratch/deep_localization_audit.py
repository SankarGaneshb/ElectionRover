import json
import asyncio
import os
import sys

# Add current dir to path
sys.path.append(os.getcwd())

from backend.graph.workflow import get_gemini_response

async def audit_localization():
    paths = {
        "en": "src/shared/locales/en.json",
        "hi": "src/shared/locales/hi.json",
        "ta": "src/shared/locales/ta.json"
    }
    
    data = {}
    for lang, path in paths.items():
        with open(path, 'r', encoding='utf-8') as f:
            data[lang] = json.load(f)
            
    keys = list(data["en"].keys())
    batch_size = 20
    audit_results = []

    for i in range(0, len(keys), batch_size):
        batch_keys = keys[i:i+batch_size]
        batch_data = {k: {"en": data["en"][k], "hi": data["hi"][k], "ta": data["ta"][k]} for k in batch_keys}
        
        prompt = f"""
        Audit the following localization keys for 'Election Rover' (a platform for Indian Voters/Candidates).
        Identify 'Lazy Transliterations' (English words written in regional script) and suggest 'High-Fidelity Regional Terms'.
        
        DATA:
        {json.dumps(batch_data, ensure_ascii=False, indent=2)}
        
        RESPONSE FORMAT (JSON Array):
        [
            {{
                "key": "string",
                "hi_status": "Linguistic Debt" | "Validated",
                "ta_status": "Linguistic Debt" | "Validated",
                "hi_fix": "Better Hindi word or null",
                "ta_fix": "Better Tamil word or null",
                "reason": "Why the fix is needed"
            }}
        ]
        """
        try:
            response = await get_gemini_response(prompt)
            clean_res = response.replace("```json", "").replace("```", "").strip()
            audit_results.extend(json.loads(clean_res))
            # Small delay to avoid rate limit
            await asyncio.sleep(5)
        except Exception as e:
            print(f"Error auditing batch {i}: {e}")

    # Save report
    with open("scratch/localization_audit_report.json", "w", encoding='utf-8') as f:
        json.dump(audit_results, f, ensure_ascii=False, indent=2)
    
    print("Audit complete. Report saved to scratch/localization_audit_report.json")

if __name__ == "__main__":
    asyncio.run(audit_localization())
