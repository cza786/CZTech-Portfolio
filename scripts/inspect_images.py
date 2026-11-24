import os
import glob
from PIL import Image

projects = {
    'smartworker': 'Smart-Worker',
    'almatar': 'ALMATAR',
    'ntdh': 'NTDH',
    'barbershop': 'Barbershop',
    'fischlevy': 'Fischlevy',
    'sevpark': 'SevPark'
}

for slug, folder in projects.items():
    print(f"\n==================== {slug.upper()} ({folder}) ====================")
    if not os.path.exists(folder):
        print("Folder not found:", folder)
        continue
    files = sorted(glob.glob(os.path.join(folder, "*.*")))
    for idx, f in enumerate(files):
        try:
            with Image.open(f) as im:
                # Get mean color or top crop to understand layout
                w, h = im.size
                print(f"[{idx}] {os.path.basename(f)}: {w}x{h}, mode={im.mode}")
        except Exception as e:
            print(f"[{idx}] Error reading {f}: {e}")
