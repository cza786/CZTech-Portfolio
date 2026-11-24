import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://www.aashishthakuri.com/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Print the hero title HTML
print("=== HERO TITLE IN HTML ===")
m = html.find('heroWordRise')
if m != -1:
    print(html[m-200:m+500])
else:
    # Look for h1
    h1 = re.findall(r'<h1[^>]*>.*?</h1>', html, re.DOTALL)
    for h in h1:
        print(h)

# Look for 'WORKS'
works = re.findall(r'<[^>]*>[^<]*WORKS[^<]*<[^>]*>', html, re.IGNORECASE)
print("=== WORKS OCCURRENCES ===")
print(works[:5])
