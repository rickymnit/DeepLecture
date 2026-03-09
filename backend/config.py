import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

VECTOR_DB_PATH = os.path.join(BASE_DIR, "data/vector_store/faiss_index")

TRANSCRIPTS_DIR = os.path.join(BASE_DIR, "data/transcripts")

UPLOAD_DIR = os.path.join(BASE_DIR, "data/uploads")

EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"

OLLAMA_MODEL = "tinyllama"