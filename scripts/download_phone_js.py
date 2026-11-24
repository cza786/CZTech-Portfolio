import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://www.aashishthakuri.com/_next/static/chunks/0ht900cau6_ur.js?dpl=dpl_A1ADEas2zoAw4Rv2RWVnTXcNHNUA'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as resp:
    js = resp.read().decode('utf-8', errors='ignore')

with open('scripts/phone_chunk.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Saved scripts/phone_chunk.js')
