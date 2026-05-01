import asyncio
import os
import sys

# Add current dir to path
sys.path.append(os.getcwd())

from backend.utils.test_validator import validator

async def test():
    try:
        res = await validator.audit_content("Market Overview", "voter", "hi")
        print("Success:", res)
    except Exception as e:
        print("Error:", type(e), e)

if __name__ == "__main__":
    asyncio.run(test())
