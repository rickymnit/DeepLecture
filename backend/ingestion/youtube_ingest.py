import yt_dlp
import os
from config import UPLOAD_DIR


def download_audio(url: str):
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": f"{UPLOAD_DIR}/%(id)s.%(ext)s",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        video_id = info["id"]

    audio_path = f"{UPLOAD_DIR}/{video_id}.mp3"

    return audio_path, video_id