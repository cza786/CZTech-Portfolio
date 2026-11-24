import cv2
import os
from PIL import Image

video_path = r"C:\Users\SHAMA\Videos\Captures\restaurant_final.mp4.webm"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

out_dir = r"d:\CZTech-Portfolio\public\images\projects\taverne-kostas"
os.makedirs(out_dir, exist_ok=True)

# Exact verified timestamps in restaurant_final.mp4.webm:
shots = [
    ("hero", 3.0),
    ("speisekarte-catalog", 15.0),
    ("gallery-lightbox", 49.0),
    ("floorplan-reservation", 77.0),
    ("digital-table-pass", 88.0),
    ("waiter-pos-terminal", 125.0),
    ("kitchen-display-system", 143.0),
    ("admin-menu-management", 181.0),
    ("events-management", 199.0),
    ("rbac-security-matrix", 207.0),
]

for name, sec in shots:
    frame_idx = int(sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        im = Image.fromarray(rgb)
        w, h = im.size
        # Crop browser bar (top 72px) and taskbar (bottom 32px)
        cropped = im.crop((0, 72, w, h - 32))
        
        # Resize to 1350 wide (consistent with other projects)
        aspect = cropped.height / cropped.width
        target_w = 1350
        target_h = int(target_w * aspect)
        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        webp_path = os.path.join(out_dir, f"{name}.webp")
        resized.save(webp_path, "WEBP", quality=92)
        print(f"Generated {name}.webp: {resized.size} ({os.path.getsize(webp_path)} bytes)")

cap.release()
