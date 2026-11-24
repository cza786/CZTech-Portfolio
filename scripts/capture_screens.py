import subprocess
import time
import urllib.request
import json
import base64
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
port = 9222
user_data_dir = r"d:\CZTech-Portfolio\.chrome_temp"

# Launch Chrome with remote debugging
proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1440,900",
    "--disable-gpu",
    "--no-sandbox",
    "http://localhost:4321/"
])

time.sleep(2)

try:
    # Get WebSocket debugger URL
    with urllib.request.urlopen(f"http://localhost:{port}/json") as r:
        tabs = json.loads(r.read().decode())
    ws_url = tabs[0]["webSocketDebuggerUrl"]
    print("Connected to Chrome, tab:", tabs[0]["title"])

    import websocket  # check if websocket-client is installed
except Exception as e:
    print("Websocket client check:", e)
finally:
    proc.terminate()
