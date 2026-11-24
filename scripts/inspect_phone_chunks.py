import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

# Download 0qafb8gv-gebj.js
url = 'https://www.aashishthakuri.com/_next/static/chunks/0qafb8gv-gebj.js'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
    chunk1 = r.read().decode('utf-8', errors='ignore')

with open('scripts/phone_chunk_main.js', 'w', encoding='utf-8') as f:
    f.write(chunk1)

print("Downloaded chunk1, len:", len(chunk1))

# Search for telephone cord drawing, canvas, or pickup in chunk1 and matched_phone.js
for name, content in [('chunk1', chunk1), ('matched_phone', open('scripts/matched_phone.js', encoding='utf-8').read())]:
    print(f"\n--- Checking {name} ---")
    for keyword in ['telephone-canvas', 'pickup-base', 'pickup-grip', 'bezier', 'cord', 'spring', 'coiled', 'canvas']:
        matches = [m.start() for m in re.finditer(re.escape(keyword), content, re.IGNORECASE)]
        print(f"Keyword '{keyword}': found {len(matches)} times")
        if matches and len(matches) < 10:
            for idx in matches[:3]:
                start = max(0, idx - 150)
                end = min(len(content), idx + 250)
                print(f"  Snippet around {idx}:\n  {content[start:end]}\n")
