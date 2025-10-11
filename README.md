# PDF-Based Question Answering System using RAG (Retrieval-Augmented Generation)

A full-stack Retrieval-Augmented Generation (RAG) system that allows users to upload a PDF document and ask natural language questions based on its content.

This project combines:

- 🧠 FastAPI backend for PDF processing, chunking, embeddings, and LLM integration
- ⚛️ React (Vite) frontend for an interactive and modern user interface
- 💬 Gemini LLM for natural language answer generation

## 🚀 Features

- 📄 Upload any PDF document
- 🔍 Semantic chunking using embeddings (SentenceTransformer)
- 📚 Vector similarity search with FAISS
- 🧠 Gemini LLM generates accurate, context-based answers
- ⚡ FastAPI backend for efficient processing
- 💅 React + TailwindCSS frontend
- 🔒 CORS-enabled API connection between frontend and backend

## 🧱 System Architecture

```
      ┌────────────┐
      │  Frontend  │ (React + Vite)
      └──────┬─────┘
             │  API calls
      ┌──────┴─────┐
      │  FastAPI   │  (Python Backend)
      ├────────────┤
      │  PDF Upload│
      │  Text Extraction│
      │  Chunking       │
      │  Embedding      │
      │  FAISS Index│
      │  Gemini LLM│
      └──────┬─────┘
             │
        ┌────┴────┐
        │  Client │
        └─────────┘
```

# 📂 RAG-QA Project

## 📖 Table of Contents
- [Project Structure](#project-structure)
- [⚙️ Backend Setup (FastAPI)](#%EF%B8%8F-backend-setup-fastapi)
  - [1️⃣ Move into Backend Directory](#1️⃣-move-into-backend-directory)
  - [2️⃣ Create Virtual Environment](#2️⃣-create-virtual-environment)
  - [Activate Virtual Environment](#activate-virtual-environment)
  - [3️⃣ Install Dependencies](#3️⃣-install-dependencies)
  - [4️⃣ Create `.env` File](#4️⃣-create-env-file)
  - [5️⃣ Run Backend Server](#5️⃣-run-backend-server)
- [⚛️ Frontend Setup (React + Vite)](#%EF%B8%8F-frontend-setup-react--vite)
  - [1️⃣ Move into Frontend Directory](#1️⃣-move-into-frontend-directory)
  - [2️⃣ Install Dependencies](#2️⃣-install-dependencies)
  - [3️⃣ Start Development Server](#3️⃣-start-development-server)
- [🔗 Connecting Frontend and Backend](#%EF%B8%8F-connecting-frontend-and-backend)
- [🧩 API Endpoints](#%EF%B8%8F-api-endpoints)
  - [Example: Upload PDF](#example-upload-pdf)
  - [Example: Ask Question](#example-ask-question)
- [🧠 How It Works](#%EF%B8%8F-how-it-works)
  - [Step 1: Upload PDF](#step-1-upload-pdf)
  - [Step 2: Ask a Question](#step-2-ask-a-question)
- [🧩 Chunking Technique](#%EF%B8%8F-chunking-technique)
- [🧰 Dependencies](#%EF%B8%8F-dependencies)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [⚠️ Common Errors](#%EF%B8%8F-common-errors)
- [🧩 Future Improvements](#%EF%B8%8F-future-improvements)
- [📜 License](#%EF%B8%8F-license)
- [👨‍💻 Author](#%EF%B8%8F-author)

## Project Structure

```
RAG-QA/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI entry point
│   │   ├── rag.py              # Core RAG system (retrieval + LLM)
│   │   ├── pdf_processor.py    # Extracts text from PDFs
│   │   ├── models.py           # Pydantic models
│   │   └── utils.py            # Chunking + helpers
│   │
│   ├── uploads/                # Uploaded PDFs
│   ├── requirements.txt
│   └── .env                    # GEMINI_API_KEY here
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileUpload.jsx
    │   │   ├── ChatBox.jsx
    │   │   └── Header.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Move into Backend Directory
```bash
cd backend
```

### 2️⃣ Create Virtual Environment
```bash
python -m venv venv
```

#### Activate Virtual Environment
```bash
venv\Scripts\activate      # On Windows
source venv/bin/activate   # On Mac/Linux
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Create `.env` File
```env
GEMINI_API_KEY=your_api_key_here
```

### 5️⃣ Run Backend Server
```bash
uvicorn app.main:app --reload
```
✅ Runs at → http://127.0.0.1:8000  
Swagger Docs → http://127.0.0.1:8000/docs

---

## ⚛️ Frontend Setup (React + Vite)

### 1️⃣ Move into Frontend Directory
```bash
cd frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```
✅ Runs at → http://localhost:5173

---

## 🔗 Connecting Frontend and Backend

Make sure the backend is running on port `8000` and the frontend on `5173`.  

CORS in `main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /upload | Uploads a PDF and indexes its content |
| POST   | /ask    | Sends a user query and retrieves answer |

### Example: Upload PDF
```bash
curl -X POST "http://127.0.0.1:8000/upload" \
     -F "file=@sample.pdf"
```

### Example: Ask Question
```bash
curl -X POST "http://127.0.0.1:8000/ask" \
     -H "Content-Type: application/json" \
     -d '{"question": "What is the main topic of this document?"}'
```

---

## 🧠 How It Works

### Step 1: Upload PDF
- Extracts text with PyPDF
- Chunks it using semantic similarity (SentenceTransformers)
- Embeds with MiniLM model
- Stores in FAISS index

### Step 2: Ask a Question
- Converts the question to a vector
- Retrieves top-K similar chunks
- Combines them into a prompt
- Sends to Gemini LLM
- Returns natural, context-based answer

---

## 🧩 Chunking Technique

This project uses **Contextual Semantic Chunking** — sentences are grouped together based on cosine similarity between their embeddings.  

**Benefits:**  
- Maintain context  
- Avoid splitting mid-topic  
- Improve retrieval accuracy  

---

## 🧰 Dependencies

### Backend
- fastapi
- uvicorn
- pypdf
- langchain
- faiss-cpu
- requests
- python-multipart
- python-dotenv
- sentence-transformers
- google-generativeai

### Frontend
- react
- vite
- axios
- tailwindcss

---

## ⚠️ Common Errors

| Error                  | Cause                            | Solution                             |
|------------------------|---------------------------------|-------------------------------------|
| Invalid Gemini API key  | Wrong key or missing .env       | Verify key in .env                   |
| Empty chunks            | PDF has no extractable text     | Ensure it’s not scanned             |
| CORS error              | Backend not allowing frontend   | Add correct allow_origins           |
| 429 Too Many Requests   | Rate limit exceeded             | Wait and retry                       |

---

## 🧩 Future Improvements
- Support multiple document uploads
- Add persistent vector storage (ChromaDB / Qdrant)
- Integrate Streamlit dashboard
- Summarization & highlight features
- User authentication

---

## 📜 License
This project is released under the **MIT License** — free to use and modify.

---

## 👨‍💻 Author
**Haile Tassew**  
🎓 Information Technology Student  
💡 Passionate about AI, Data Engineering & Intelligent Systems  
📧 hailetassew4545@gmail.com  
