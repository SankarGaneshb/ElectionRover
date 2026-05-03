import os

file_path = r'c:\Users\bsank\ElectionRover\src\widgets\MisinfoSimulator\MisinfoSimulator.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target Odia string
target = '"ବିଗ୍ କ୍ୱେରୀ ଡାଟାସେଟରେ ରିପୋର୍ଟ ଦାଖଲ କରାଯାଉଛି...",'
# Replacement
replacement = '"ଉନ୍ନତ କୃତ୍ରିମ ବୁଦ୍ଧିମତା ଡାଟାସେଟରେ ରିପୋର୍ଟ ଦାଖଲ କରାଯାଉଛି...",'

new_content = content.replace(target, replacement)

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced.")
else:
    print("Target not found. Trying partial match...")
    # Try just the BigQuery part in Odia
    target_part = 'ବିଗ୍ କ୍ୱେରୀ'
    replacement_part = 'ଉନ୍ନତ କୃତ୍ରିମ ବୁଦ୍ଧିମତା'
    new_content = content.replace(target_part, replacement_part)
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully replaced partial.")
    else:
        print("Still not found.")
