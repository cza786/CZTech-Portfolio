from PIL import Image

img = Image.open('Taverne-kostas/frame_004.jpg')
w, h = img.size
print(f"Frame size: {w}x{h}")

# In a standard 1280x720 or 1920x1080 screen capture:
# Browser chrome is top ~115px, taskbar is bottom ~50px
# Let's crop and inspect
cropped = img.crop((0, 85, w, h - 45))
cropped.save('scripts/test_crop.jpg')
print(f"Cropped size: {cropped.size}")
