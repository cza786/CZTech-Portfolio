import cv2
import os

video_path = r"C:\Users\SHAMA\Videos\Captures\restaurant_final.mp4.webm"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

# Let's save frames every 2 seconds from 65s to 85s
for sec in range(65, 86, 2):
    frame_idx = int(sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f"scripts/clean_frames/test_floorplan_{sec}s.jpg", frame)

# Also let's check between 0s and 6s for the top hero banner
for sec in [1, 2, 3, 4, 5]:
    frame_idx = int(sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f"scripts/clean_frames/test_hero_{sec}s.jpg", frame)

cap.release()
print("Done dumping test frames")
