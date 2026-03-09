def chunk_transcript(transcript, chunk_size=400):

    chunks = []
    current_text = ""
    start_time = None

    for seg in transcript:

        if start_time is None:
            start_time = seg["start"]

        current_text += " " + seg["text"]

        if len(current_text) > chunk_size:

            chunks.append({
                "text": current_text,
                "timestamp": start_time
            })

            current_text = ""
            start_time = None

    if current_text:
        chunks.append({
            "text": current_text,
            "timestamp": start_time
        })

    return chunks