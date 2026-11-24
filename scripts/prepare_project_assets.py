import os
from PIL import Image

output_base = "public/images/projects"
os.makedirs(output_base, exist_ok=True)

manifest = {
    "smartworker": {
        "hero": "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.37 PM.jpeg",
        "gallery": [
            ("attendance-report.webp", "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.31 PM.jpeg"),
            ("task-management.webp", "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.32 PM.jpeg"),
            ("technician-assignment.webp", "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.33 PM.jpeg"),
            ("helpdesk-ticketing.webp", "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.35 PM (1).jpeg"),
            ("shift-swap.webp", "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.28 PM.jpeg"),
            ("leave-requests.webp", "Smart-Worker/WhatsApp Image 2026-11-21 at 9.38.24 PM.jpeg"),
        ]
    },
    "almatar": {
        "hero": "ALMATAR/WhatsApp Image 2026-11-23 at 1.40.24 AM.jpeg",
        "gallery": [
            ("board-management.webp", "ALMATAR/WhatsApp Image 2026-11-23 at 1.40.24 AM (1).jpeg"),
            ("policies-qhse.webp", "ALMATAR/WhatsApp Image 2026-11-23 at 1.42.35 AM (1).jpeg"),
            ("services-overview.webp", "ALMATAR/WhatsApp Image 2026-11-23 at 1.40.24 AM (2).jpeg"),
            ("drilling-infrastructure.webp", "ALMATAR/WhatsApp Image 2026-11-23 at 1.42.35 AM (2).jpeg"),
            ("contact-portal.webp", "ALMATAR/WhatsApp Image 2026-11-23 at 1.42.35 AM.jpeg"),
        ]
    },
    "ntdh": {
        "hero": "NTDH/WhatsApp Image 2026-11-23 at 1.47.28 AM.jpeg",
        "gallery": [
            ("services-catalog.webp", "NTDH/WhatsApp Image 2026-11-23 at 1.47.28 AM (1).jpeg"),
            ("heavy-machinery.webp", "NTDH/WhatsApp Image 2026-11-23 at 1.47.28 AM (2).jpeg"),
            ("project-locations.webp", "NTDH/WhatsApp Image 2026-11-23 at 1.47.28 AM (3).jpeg"),
            ("quote-portal.webp", "NTDH/WhatsApp Image 2026-11-23 at 1.47.28 AM (4).jpeg"),
        ]
    },
    "barbershop": {
        "hero": "Barbershop/WhatsApp Image 2026-11-23 at 2.01.51 AM.jpeg",
        "gallery": [
            ("founder-story.webp", "Barbershop/WhatsApp Image 2026-11-23 at 2.01.51 AM (1).jpeg"),
            ("services-menu.webp", "Barbershop/WhatsApp Image 2026-11-23 at 2.01.51 AM (3).jpeg"),
            ("salon-locations.webp", "Barbershop/WhatsApp Image 2026-11-23 at 2.01.51 AM (4).jpeg"),
            ("grooming-products.webp", "Barbershop/WhatsApp Image 2026-11-23 at 2.01.51 AM (5).jpeg"),
            ("salon-ambiance.webp", "Barbershop/WhatsApp Image 2026-11-23 at 2.01.51 AM (7).jpeg"),
        ]
    },
    "fischlevy": {
        "hero": "Fischlevy/WhatsApp Image 2026-11-23 at 2.17.54 AM (2).jpeg",
        "gallery": [
            ("food-truck-heritage.webp", "Fischlevy/WhatsApp Image 2026-11-23 at 2.17.54 AM (3).jpeg"),
            ("speisekarte-showcase.webp", "Fischlevy/WhatsApp Image 2026-11-23 at 2.17.54 AM.jpeg"),
            ("menu-specialties.webp", "Fischlevy/WhatsApp Image 2026-11-23 at 2.17.54 AM (1).jpeg"),
            ("fresh-counter.webp", "Fischlevy/WhatsApp Image 2026-11-23 at 2.17.54 AM (4).jpeg"),
            ("frankfurt-location.webp", "Fischlevy/WhatsApp Image 2026-11-23 at 2.17.54 AM (5).jpeg"),
        ]
    },
    "sevpark": {
        "hero": "SevPark/WhatsApp Image 2026-11-23 at 2.22.13 AM.jpeg",
        "gallery": [
            ("contact-portal.webp", "SevPark/WhatsApp Image 2026-11-23 at 2.22.13 AM (3).jpeg"),
            ("anpr-technology.webp", "SevPark/WhatsApp Image 2026-11-23 at 2.22.13 AM (1).jpeg"),
            ("enforcement-dashboard.webp", "SevPark/WhatsApp Image 2026-11-23 at 2.22.13 AM (4).jpeg"),
            ("retail-solutions.webp", "SevPark/WhatsApp Image 2026-11-23 at 2.22.13 AM (5).jpeg"),
            ("security-compliance.webp", "SevPark/WhatsApp Image 2026-11-23 at 2.22.13 AM (6).jpeg"),
        ]
    }
}

def convert_and_save(src_path, dest_path, max_dim=1600):
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return
    with Image.open(src_path) as im:
        if im.mode in ('RGBA', 'LA'):
            bg = Image.new('RGB', im.size, (255, 255, 255))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        elif im.mode != 'RGB':
            im = im.convert('RGB')
        
        w, h = im.size
        if max(w, h) > max_dim:
            scale = max_dim / max(w, h)
            new_w, new_h = int(w * scale), int(h * scale)
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        im.save(dest_path, "WEBP", quality=85, method=6)
        file_size_kb = os.path.getsize(dest_path) / 1024
        print(f"Saved: {dest_path} ({im.size[0]}x{im.size[1]}, {file_size_kb:.1f} KB)")

for slug, data in manifest.items():
    proj_dir = os.path.join(output_base, slug)
    os.makedirs(proj_dir, exist_ok=True)
    
    # Hero
    hero_dest = os.path.join(proj_dir, "hero.webp")
    convert_and_save(data["hero"], hero_dest)
    
    # Gallery
    for filename, src in data["gallery"]:
        dest = os.path.join(proj_dir, filename)
        convert_and_save(src, dest)

print("\nAll assets successfully generated!")
