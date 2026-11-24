import cv2
import os
from PIL import Image

video_path = r"C:\Users\SHAMA\Videos\Captures\restaurant_final.mp4.webm"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

out_dir = r"d:\CZTech-Portfolio\public\images\projects\taverne-kostas"
os.makedirs(out_dir, exist_ok=True)

# Timestamps in seconds from the srt analysis:
# 1. hero: 6s (Home Speisekarte top banner)
# 2. speisekarte-catalog: 18s (Greek dishes with prices & tags)
# 3. gallery-lightbox: 48s (Full-screen photo lightbox)
# 4. floorplan-reservation: 74s (Architectural floor plan seating map)
# 5. digital-table-pass: 85s (Confirmed digital table pass with QR code)
# 6. waiter-pos-terminal: 125s (Kellner terminal active tables & orders)
# 7. kitchen-display-system: 142s (KDS incoming orders & timers)
# 8. admin-menu-management: 179s (Menüverwaltung pricing & allergen tags)
# 9. events-management: 199s (Veranstaltungen Bouzouki nights & feasts)
# 10. rbac-security-matrix: 207s (Screen permissions across roles)

shots = [
    ("hero", 6.0),
    ("speisekarte-catalog", 18.0),
    ("gallery-lightbox", 48.0),
    ("floorplan-reservation", 74.0),
    ("digital-table-pass", 85.0),
    ("waiter-pos-terminal", 125.0),
    ("kitchen-display-system", 142.0),
    ("admin-menu-management", 179.0),
    ("events-management", 199.0),
    ("rbac-security-matrix", 207.0),
]

for name, sec in shots:
    frame_idx = int(sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        # Convert BGR to RGB
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        im = Image.fromarray(rgb)
        w, h = im.size
        # Crop top browser bar (y: 72) and bottom taskbar (h - 32)
        # Content is between y: 72 and y: h - 32
        cropped = im.crop((0, 72, w, h - 32))
        
        # Save high quality WebP
        webp_path = os.path.join(out_dir, f"{name}.webp")
        # Resize cleanly to crisp 1350 width (same as other projects)
        aspect = cropped.height / cropped.width
        target_w = 1350
        target_h = int(target_w * aspect)
        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        resized.save(webp_path, "WEBP", quality=92)
        print(f"Generated {webp_path}: {resized.size} ({os.path.getsize(webp_path)} bytes)")

cap.release()
