# RAG PDF Q&A Backend

A lightweight, production-ready backend for Retrieval-Augmented Generation (RAG) over PDF documents. Built with **FastAPI**, **Sentence Transformers**, **FAISS**, and **Google Gemini**, this service enables semantic search and AI-powered question answering from uploaded PDFs — all using free and open-source tools.

---

## 🌟 Features

- ✅ **PDF Upload & Text Extraction** via `pypdf`
- ✅ **Semantic Chunking & Embedding** using `all-MiniLM-L6-v2`
- ✅ **Vector Storage** with in-memory **FAISS**
- ✅ **AI Answer Generation** via **Gemini Flash (free tier)**
- ✅ **CORS-enabled** for seamless frontend integration
- ✅ **Robust error handling** (API key, safety filters, empty context)

---

## 🛠️ Tech Stack

| Component        | Technology                     |
|------------------|--------------------------------|
| Framework        | FastAPI                        |
| PDF Processing   | `pypdf`                        |
| Embeddings       | `sentence-transformers`        |
| Vector Database  | `faiss-cpu`                    |
| LLM              | Google Gemini (`gemini-flash-latest`) |
| Environment      | `python-dotenv`                |

---

## 📦 Installation

### Prerequisites
- Python 3.8–3.12 (⚠️ **Not 3.14** — not yet released)
- pip



### Steps

1. **Clone or navigate to the project**
   ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate    # Linux/macOS
    venv\Scripts\activate       # Windows2. **Install dependencies**
   ```bash
   pip install -r requirements.txt

   ```

2. **Setup the Gemini API key**
Go to Google AI Studio
Click "Get API key"
Create .env file:
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



3. **Run the project**
uvicorn main:app --reload --port 8000