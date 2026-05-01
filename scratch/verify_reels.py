import os, re
langs = ['en', 'hi', 'ta', 'te', 'kn', 'bn', 'ml', 'mr', 'gu', 'or', 'pa']
print(f"{'LANG':<5} | {'TITLE':<30} | {'TAGLINE'}")
print("-" * 80)
for lang in langs:
    suffix = f'-{lang}' if lang != 'en' else ''
    path = f'reel/index{suffix}.html'
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f: content = f.read()
        title = re.search(r'<title>(.*?)</title>', content)
        tagline = re.search(r'id=\"s5tag\">(.*?)</div>', content, re.DOTALL)
        t_str = title.group(1).strip() if title else 'Missing'
        tg_str = ' '.join(re.sub('<[^>]+>', '', tagline.group(1)).split()) if tagline else 'Missing'
        print(f"{lang.upper():<5} | {t_str:<30} | {tg_str}")
    else:
        print(f"{lang.upper():<5} | FILE MISSING at {path}")
