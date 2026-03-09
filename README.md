# DeepLecture

DeepLecture is a NotebookLM-style AI system that allows users to ask questions about YouTube lectures.

## Features

- YouTube audio ingestion
- Whisper transcription
- FAISS vector search
- RAG question answering
- Ollama local LLM
- React interface

## Tech Stack

Backend:
- FastAPI
- Faster Whisper
- Sentence Transformers
- FAISS
- Ollama

Frontend:
- React
- Vite
- TailwindCSS

## Run Backend

cd backend
source venv/bin/activate
uvicorn main:app --reload

## Run Frontend

cd frontend
npm run dev