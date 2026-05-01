import re

file_path = "c:/Users/bsank/ElectionRover/src/shared/lib/i18n.js"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.read().splitlines()

fixed_lines = []
for line in lines:
    if 'sre_inject_error: "இயக்க நேரம்' in line:
        line = '      sre_inject_error: "இயக்க நேரம் பிழையை உட்சెலுத்துங்கள்",'
    fixed_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.write("\n".join(fixed_lines) + "\n")

print("Fixed line 238!")
