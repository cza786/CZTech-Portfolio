import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://www.aashishthakuri.com/', headers=headers)
try:
    with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
    
    # Check if contact or telephone is in the html itself
    print("Contains 'pickup':", 'pickup' in html)
    print("Contains 'telephone':", 'telephone' in html)
    print("Contains 'contact':", 'contact' in html)
    
    scripts = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html)
    print(f"Found {len(scripts)} scripts:")
    for s in scripts:
        print("  ", s)
        # Check script content
        s_url = s if s.startswith('http') else 'https://www.aashishthakuri.com' + s.split('?')[0]
        try:
            req_s = urllib.request.Request(s_url, headers=headers)
            with urllib.request.urlopen(req_s, context=ctx, timeout=5) as rs:
                c = rs.read().decode('utf-8', errors='ignore')
                if 'telephone' in c or 'pickup' in c or 'cord' in c:
                    print(f"  >>> FOUND MATCH in {s_url} (len: {len(c)})")
                    with open('scripts/matched_phone.js', 'w', encoding='utf-8') as out:
                        out.write(c)
        except Exception as err:
            pass
except Exception as e:
    print("Error:", e)
