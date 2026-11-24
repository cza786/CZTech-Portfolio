import cv2

video_path = r"C:\Users\SHAMA\Videos\Captures\restaurant_final.mp4.webm"
cap = cv2.VideoCapture(video_path)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = frame_count / fps if fps else 0

print(f"restaurant_final.mp4.webm: {width}x{height}, {fps:.2f} fps, {frame_count} frames, {duration:.1f}s")

# Grab frame at 10s and save
frame_idx = int(10 * fps)
cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
ret, frame = cap.read()
if ret:
    cv2.imwrite("scripts/raw_frame_10s.jpg", frame)
    print("Saved scripts/raw_frame_10s.jpg")

cap.release()
