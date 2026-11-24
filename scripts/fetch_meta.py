import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'https://www.smartworker.app/',
    'https://www.almatar-oil.com/',
    'https://ntdhservices.com/',
    'https://www.broyals.de/',
    'https://fischlevy.de/'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
            desc = re.search(r'<meta[^>]*name=[\'"]description[\'"][^>]*content=[\'"](.*?)[\'"]', html, re.IGNORECASE)
            h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE)
            print(f'URL: {url}')
            print('  Title:', title.group(1).strip() if title else 'N/A')
            print('  Desc:', desc.group(1).strip() if desc else 'N/A')
            print('  H1:', h1.group(1).strip() if h1 else 'N/A')
    except Exception as e:
        print(f'URL: {url} -> Error: {e}')
