import cv2
import os

video_path = r"C:\Users\SHAMA\Videos\Captures\temp_analysis\clean_test.mp4"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

sample_seconds = [5, 15, 35, 60, 85, 115, 140, 175, 205, 235]
os.makedirs("scripts/clean_frames", exist_ok=True)

for sec in sample_seconds:
    frame_idx = int(sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        out_name = f"scripts/clean_frames/frame_{sec:03d}s.jpg"
        cv2.imwrite(out_name, frame)
        print(f"Saved {out_name} (frame {frame_idx})")

cap.release()
