# DeepLecture 🎓

DeepLecture is a modern, full-stack AI application designed to help you interact with and understand educational content better. Simply provide a YouTube lecture URL, and DeepLecture will transcribe the audio, embed the content using a Vector Database, and provide a seamless chat interface for you to ask questions directly against the knowledge base.

Inspired by the clean, functional "AI-workspace" aesthetic of Google NotebookLM, the application sports a premium emerald-slate theme built for maximum legibility and frictionless studying.

---

## 🚀 Key Features

*   **YouTube Ingestion:** Seamlessly download audio, transcribe it using Whisper, and semantically chunk the data.
*   **Vector Retrieval (RAG):** Embeds chunks and stores them locally for highly accurate, context-aware AI retrieval.
*   **Interactive Chat AI:** Chat with the lecture content and receive responses grounded directly in the transcript.
*   **Source Citations:** AI answers transparently cite which chunks of the lecture they referenced.
*   **Premium Workspace UI:** Features a sleek dark/light mode Sidebar, Glassmorphic Modal Dialogs, and a responsive Chat Interface.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React 18 / Vite
*   **Styling:** Tailwind CSS v3 / Vanilla CSS
*   **Components:** shadcn/ui (Radix UI)
*   **Icons:** Lucide-React
*   **Networking:** Axios

### Backend
*   **Framework:** FastAPI (Python)
*   **AI/LLM:** Local LLM integration (Ollama / Whisper API integrations)
*   **Data Processing:** Custom RAG pipelines for ingestion, chunking, and embedding.

---

## 💻 Running Locally

To run the application locally, you will need to start both the Python backend and the React frontend development servers.

### 1. Start the FastAPI Backend

Open a terminal and set up your Python environment:

```bash
cd backend

# Create and activate a virtual environment (if not already done)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```
*The backend API will be available at `http://127.0.0.1:8000`.*

### 2. Start the React Frontend

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend interface will dynamically compile and be available at `http://localhost:5173`.*

---

## 📂 Project Structure

```bash
DeepLecture/
├── backend/                  # Python FastAPI application
│   ├── api/                  # Routes and API Endpoints
│   ├── ingestion/            # YouTube downloading logic
│   ├── llm/                  # Chat generation endpoints
│   ├── rag/                  # Chunking, Embeddings, and Vector Store
│   └── transcription/        # Whisper transcription services
│
├── frontend/                 # React UI Workspace
│   ├── src/
│   │   ├── components/       # ChatInterface, Sidebar, AddSourceModal
│   │   ├── components/ui/    # shadcn primitive components
│   │   ├── services/         # Axios wrapper (api.js)
│   │   └── App.jsx           # Main workspace layout
│   ├── tailwind.config.js    # Styling and themes
│   └── vite.config.js        # Build tool configuration
│
└── .gitignore                # Global ignore paths for Py and Node
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check [issues page](#) if you want to contribute.

## 📝 License
This project is licensed under the MIT License.
