from faster_whisper import WhisperModel
from config import TRANSCRIPTS_DIR
import json
import os

model = WhisperModel("base", compute_type="int8")


def transcribe_audio(audio_path, video_id):

    os.makedirs(TRANSCRIPTS_DIR, exist_ok=True)

    segments, _ = model.transcribe(audio_path)

    transcript = []

    for segment in segments:
        transcript.append({
            "start": segment.start,
            "end": segment.end,
            "text": segment.text
        })

    transcript_file = f"{TRANSCRIPTS_DIR}/{video_id}.json"

    with open(transcript_file, "w") as f:
        json.dump(transcript, f)

    return transcript