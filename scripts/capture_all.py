import subprocess
import os
import shutil

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
artifact_dir = r'C:\Users\SHAMA\.gemini\antigravity\brain\f3772be9-ac26-4c54-8538-f721f0851eac'

targets = [
    ('hero', 'http://localhost:4321/', 1440, 950),
    ('works', 'http://localhost:4321/#work', 1440, 1100),
    ('contact', 'http://localhost:4321/#contact', 1440, 1050),
]

for name, url, w, h in targets:
    out_file = f'd:\\CZTech-Portfolio\\screenshot_{name}.png'
    cmd = [
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        '--user-data-dir=d:\\CZTech-Portfolio\\.chrome_temp',
        f'--screenshot={out_file}',
        f'--window-size={w},{h}',
        '--virtual-time-budget=2500',
        url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
    print(f"Captured {name}: {res.stderr.strip() or res.stdout.strip()}")
    if os.path.exists(out_file):
        dest = os.path.join(artifact_dir, f'screenshot_{name}.png')
        shutil.copy2(out_file, dest)
        print(f"  Copied to {dest} ({os.path.getsize(dest)} bytes)")
