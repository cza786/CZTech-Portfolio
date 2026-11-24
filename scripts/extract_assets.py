import os
import collections
from PIL import Image, ImageFilter, ImageOps

OUT_DIR = r'd:\CZTech-Portfolio\public\images\hero'
os.makedirs(OUT_DIR, exist_ok=True)

raw_img = Image.open(r'D:\Designs\Portfolio-media\hero section.jfif').convert('RGBA')
W, H = raw_img.size
print(f'Source image loaded: {W}x{H}')

# ==========================================
# 1. SUNSET CLOUDS SKY
# ==========================================
sky_h = int(H * 0.55)
sky = raw_img.crop((0, 0, W, sky_h)).copy()

# Patch left (remove CZTech text & chatbot) by blending from clean cloud region x: 750..1450
clean_left_clouds = raw_img.crop((750, 0, 1450, sky_h)).transpose(Image.FLIP_LEFT_RIGHT)
# Create a smooth horizontal blend mask for the left 750px
mask_left = Image.new('L', (700, sky_h), 255)
# Soft blend edge between 550 and 700
for x in range(550, 700):
    val = int(255 * (1 - (x - 550) / 150.0))
    for y in range(sky_h):
        mask_left.putpixel((x, y), val)
clean_left_sub = clean_left_clouds.crop((0, 0, 700, sky_h))
sky.paste(clean_left_sub, (0, 0), mask_left)

# Patch right (remove laptop) by blending from clean cloud region x: 1750..2450
clean_right_clouds = raw_img.crop((1750, 0, 2450, sky_h)).transpose(Image.FLIP_LEFT_RIGHT)
mask_right = Image.new('L', (700, sky_h), 0)
for x in range(0, 150):
    val = int(255 * (x / 150.0))
    for y in range(sky_h):
        mask_right.putpixel((x, y), val)
for x in range(150, 700):
    for y in range(sky_h):
        mask_right.putpixel((x, y), 255)
clean_right_sub = clean_right_clouds.crop((0, 0, 700, sky_h))
sky.paste(clean_right_sub, (W - 700, 0), mask_right)

# Smooth bottom area (y > 400) to clear any text remnants into the soft gradient
# Below y=400, sample the cloud tone and blend down
for y in range(410, sky_h):
    alpha = min(1.0, (y - 410) / 100.0)
    for x in range(W):
        # sample pixel from y=390..405
        p_above = sky.getpixel((x, 400))
        p_curr = sky.getpixel((x, y))
        r = int(p_curr[0] * (1 - alpha) + p_above[0] * alpha)
        g = int(p_curr[1] * (1 - alpha) + p_above[1] * alpha)
        b = int(p_curr[2] * (1 - alpha) + p_above[2] * alpha)
        sky.putpixel((x, y), (r, g, b, 255))

# Save as high quality WebP
sky_rgb = sky.convert('RGB')
sky_webp_path = os.path.join(OUT_DIR, 'sunset-clouds-sky.webp')
sky_rgb.save(sky_webp_path, format='WEBP', quality=92, method=6)
print(f'Saved sunset sky to {sky_webp_path}')

# ==========================================
# 2. CENTER DASHBOARD CARD
# ==========================================
# Bounding box of card: x=[1487, 1821], y=[426, 659]
card_crop = raw_img.crop((1487, 426, 1821, 659))
cw, ch = card_crop.size

# Clean card with rounded corners alpha mask
card_rgba = card_crop.convert('RGBA')
mask_card = Image.new('L', (cw, ch), 0)
from PIL import ImageDraw
draw = ImageDraw.Draw(mask_card)
draw.rounded_rectangle([2, 2, cw - 3, ch - 3], radius=16, fill=255)
card_rgba.putalpha(mask_card)

card_path = os.path.join(OUT_DIR, 'center-dashboard-card.png')
card_rgba.save(card_path, format='PNG', optimize=True)
print(f'Saved center card to {card_path} ({cw}x{ch})')

# ==========================================
# 3. 5 FLOATING SERVICE STICKERS
# ==========================================
stickers_info = [
    ('chatbot-sticker.png', (150, 70, 700, 560), 6),
    ('website-laptop-sticker.png', (2470, 40, 3120, 540), -6),
    ('voice-agent-sticker.png', (140, 840, 460, 1340), 3),
    ('software-solutions-sticker.png', (1320, 900, 1920, 1260), 0),
    ('digital-marketing-sticker.png', (2590, 890, 3130, 1320), -3),
]

def is_terracotta(r, g, b):
    return (170 <= r <= 245) and (60 <= g <= 145) and (20 <= b <= 110)

for filename, (x1, y1, x2, y2), unrot_deg in stickers_info:
    crop = raw_img.crop((x1, y1, x2, y2))
    w, h = crop.size
    
    # Outer BFS flood fill from crop boundary
    visited = set()
    queue = collections.deque()
    
    for x in range(w):
        for y in [0, 1, h-2, h-1]:
            r, g, b, _ = crop.getpixel((x, y))
            if not is_terracotta(r, g, b):
                queue.append((x, y))
                visited.add((x, y))
                
    for y in range(h):
        for x in [0, 1, w-2, w-1]:
            if (x, y) not in visited:
                r, g, b, _ = crop.getpixel((x, y))
                if not is_terracotta(r, g, b):
                    queue.append((x, y))
                    visited.add((x, y))
                    
    while queue:
        cx, cy = queue.popleft()
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                r, g, b, _ = crop.getpixel((nx, ny))
                if not is_terracotta(r, g, b):
                    visited.add((nx, ny))
                    queue.append((nx, ny))
                    
    out = crop.copy()
    for (x, y) in visited:
        out.putpixel((x, y), (0, 0, 0, 0))
        
    # Trim transparent borders
    bbox = out.getbbox()
    trimmed = out.crop(bbox)
    
    # If unrot_deg != 0, unrotate so that base image is upright and CSS rotation creates exact mockup orientation
    if unrot_deg != 0:
        trimmed = trimmed.rotate(unrot_deg, expand=True, resample=Image.BICUBIC)
        # trim again after rotation
        bbox2 = trimmed.getbbox()
        if bbox2:
            trimmed = trimmed.crop(bbox2)
            
    out_path = os.path.join(OUT_DIR, filename)
    trimmed.save(out_path, format='PNG', optimize=True)
    print(f'Saved sticker {filename} to {out_path} ({trimmed.size[0]}x{trimmed.size[1]})')

print('All 7 hero assets generated successfully!')
