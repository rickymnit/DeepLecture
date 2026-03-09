from fastapi import APIRouter
from pydantic import BaseModel

from ingestion.youtube_ingest import download_audio
from transcription.whisper_transcriber import transcribe_audio
from rag.chunking import chunk_transcript
from rag.embeddings import embed_texts
from rag.vector_store import vector_store
from rag.retriever import retrieve
from llm.ollama_client import generate_answer

router = APIRouter()


class YoutubeRequest(BaseModel):
    url: str


class ChatRequest(BaseModel):
    question: str


@router.post("/add_youtube")
async def add_youtube(data: YoutubeRequest):

    audio_path, video_id = download_audio(data.url)

    transcript = transcribe_audio(audio_path, video_id)

    chunks = chunk_transcript(transcript)

    texts = [c["text"] for c in chunks]

    embeddings = embed_texts(texts)

    vector_store.add(embeddings, chunks)

    vector_store.save()

    return {"status": "video processed", "chunks": len(chunks)}


@router.post("/chat")
async def chat(data: ChatRequest):

    context, sources = retrieve(data.question)

    answer = generate_answer(data.question, context)

    return {
        "answer": answer,
        "sources": sources
    }