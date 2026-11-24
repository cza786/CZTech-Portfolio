import os
from PIL import Image

HERO_DIR = r'd:\CZTech-Portfolio\public\images\hero'

png_files = [
    'center-dashboard-card.png',
    'chatbot-sticker.png',
    'website-laptop-sticker.png',
    'voice-agent-sticker.png',
    'software-solutions-sticker.png',
    'digital-marketing-sticker.png',
]

print('Converting images to WebP...')

total_orig_size = 0
total_webp_size = 0

for pf in png_files:
    in_path = os.path.join(HERO_DIR, pf)
    base_name = os.path.splitext(pf)[0]
    out_path = os.path.join(HERO_DIR, f'{base_name}.webp')
    
    orig_size = os.path.getsize(in_path)
    total_orig_size += orig_size
    
    img = Image.open(in_path)
    
    # Save as high-performance WebP with alpha preservation
    # Quality 90 provides indistinguishable visual quality with 70%+ reduction
    img.save(out_path, format='WEBP', quality=90, method=6)
    
    webp_size = os.path.getsize(out_path)
    total_webp_size += webp_size
    
    saved_pct = (1 - (webp_size / orig_size)) * 100
    print(f'{pf} ({orig_size // 1024} KB) -> {base_name}.webp ({webp_size // 1024} KB) [Saved {saved_pct:.1f}%]')

# Also optimize sunset-clouds-sky.webp if needed
sky_path = os.path.join(HERO_DIR, 'sunset-clouds-sky.webp')
if os.path.exists(sky_path):
    orig_sky = os.path.getsize(sky_path)
    sky_img = Image.open(sky_path)
    # Ensure it is optimized
    sky_img.save(sky_path, format='WEBP', quality=88, method=6)
    new_sky = os.path.getsize(sky_path)
    print(f'sunset-clouds-sky.webp: {orig_sky // 1024} KB -> {new_sky // 1024} KB')

total_saved = (1 - (total_webp_size / total_orig_size)) * 100
print(f'Total PNG size: {total_orig_size // 1024} KB -> Total WebP size: {total_webp_size // 1024} KB (Overall savings: {total_saved:.1f}%)')
