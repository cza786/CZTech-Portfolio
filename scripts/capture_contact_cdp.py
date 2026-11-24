import subprocess
import time
import urllib.request
import json
import base64
import os
import shutil

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
user_data_dir = r'd:\CZTech-Portfolio\.chrome_temp_cdp'
port = 9333

# Start Chrome with remote debugging
proc = subprocess.Popen([
    chrome_path,
    '--headless=new',
    '--disable-gpu',
    f'--remote-debugging-port={port}',
    f'--user-data-dir={user_data_dir}',
    '--window-size=1440,1050',
    'http://localhost:4321/'
])

time.sleep(2.5)

try:
    with urllib.request.urlopen(f'http://localhost:{port}/json') as r:
        tabs = json.loads(r.read().decode())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    print("Chrome target tab found:", tabs[0]['title'])

    # Connect via simple websocket in python standard library or websocket
    import socket

    # Let's use urllib to send CDP commands via HTTP if available, or websocket
    # Since python standard library doesn't include websocket, let's check if websocket is available
    try:
        import websocket
        ws = websocket.create_connection(ws_url, timeout=5)
        
        def send_cdp(method, params=None):
            msg = json.dumps({'id': 1, 'method': method, 'params': params or {}})
            ws.send(msg)
            while True:
                res = json.loads(ws.recv())
                if res.get('id') == 1:
                    return res.get('result', {})

        # Scroll to #contact
        send_cdp('Runtime.evaluate', {
            'expression': '''
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView();
            '''
        })
        time.sleep(1.5)

        # Capture screenshot
        shot = send_cdp('Page.captureScreenshot', {'format': 'png'})
        img_data = base64.b64decode(shot['data'])
        out_path = 'd:\\CZTech-Portfolio\\screenshot_contact_cdp.png'
        with open(out_path, 'wb') as f:
            f.write(img_data)
        print(f"Captured CDP screenshot ({len(img_data)} bytes)")
        
        artifact_dest = r'C:\Users\SHAMA\.gemini\antigravity\brain\f3772be9-ac26-4c54-8538-f721f0851eac\screenshot_contact_cdp.png'
        shutil.copy2(out_path, artifact_dest)
        print("Copied to artifact dir")
        ws.close()
    except ImportError:
        print("websocket module not installed, trying alternate capture")
except Exception as e:
    print("Error:", e)
finally:
    proc.terminate()
