import cv2

video_path = r"C:\Users\SHAMA\Videos\Captures\temp_analysis\clean_test.mp4"
cap = cv2.VideoCapture(video_path)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = frame_count / fps if fps else 0

print(f"clean_test.mp4: {width}x{height}, {fps:.2f} fps, {frame_count} frames, {duration:.1f}s")
cap.release()
