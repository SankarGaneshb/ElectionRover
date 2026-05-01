import re
import sys

# Force UTF-8 on Windows
sys.stdout.reconfigure(encoding='utf-8')

with open("c:/Users/bsank/ElectionRover/src/shared/lib/i18n.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract language blocks using basic regex or string parsing
# The file structure:
# export const resources = {
#   en: {
#     translation: { ... }
#   },
#   hi: { ... }
# }

# Let's just find lines that have English letters, and identify which block they belong to.
lines = content.splitlines()
current_lang = None
for i, line in enumerate(lines):
    if re.match(r'^\s*([a-z]{2}):\s*\{', line):
        current_lang = re.match(r'^\s*([a-z]{2}):\s*\{', line).group(1)
    elif "translation:" in line:
        pass
    elif current_lang and current_lang != "en":
        # Look for English letters inside quotes
        matches = re.findall(r':\s*"([^"]+)"', line)
        if matches:
            val = matches[0]
            if re.search(r'[A-Za-z]', val):
                print(f"Leak in {current_lang} on line {i+1}: {val}")
