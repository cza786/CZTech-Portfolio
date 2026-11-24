import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://www.aashishthakuri.com/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        css_links = re.findall(r'<link[^>]*rel=[\'"]stylesheet[\'"][^>]*href=[\'"](.*?)[\'"]', html)
        print('CSS links:', css_links)
        for link in css_links:
            if link.startswith('/'):
                link = 'https://www.aashishthakuri.com' + link
            req2 = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2, context=ctx, timeout=10) as resp2:
                css = resp2.read().decode('utf-8', errors='ignore')
                print('CSS length:', len(css))
                # Search for character animation, transform, curve, or reveal
                for pattern in [r'\.service-character[^{]*\{[^}]*\}', r'\.service-choice[^{]*\{[^}]*\}', r'@keyframes[^{]*\{[^}]*\}']:
                    for match in re.finditer(pattern, css):
                        print(match.group(0)[:300])
except Exception as e:
    print('Error:', e)
