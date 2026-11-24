import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://www.aashishthakuri.com/', headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
    html = r.read().decode('utf-8', errors='ignore')

css_files = re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', html)
print("CSS files:", css_files)

all_contact_css = []
for f in css_files:
    f_url = f if f.startswith('http') else 'https://www.aashishthakuri.com' + f.split('?')[0]
    req2 = urllib.request.Request(f_url, headers=headers)
    with urllib.request.urlopen(req2, context=ctx, timeout=10) as r2:
        css = r2.read().decode('utf-8', errors='ignore')
        # find anything matching contact or telephone
        matches = re.findall(r'([^{}]*(?:contact|telephone|connected-phone|social-key|title-window)[^{]*\{[^}]*\})', css)
        all_contact_css.extend(matches)

with open('scripts/contact_styles.css', 'w', encoding='utf-8') as out:
    out.write('\n\n'.join(all_contact_css))

print(f"Extracted {len(all_contact_css)} CSS rules into contact_styles.css")
