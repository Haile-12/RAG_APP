from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.rag import RAGSystem
from app.pdf_processor import extract_text_from_pdf
from app.models import QueryRequest, UploadResponse
import os
import shutil
import logging

logging.basicConfig(level=logging.DEBUG)
app = FastAPI(title="RAG API PDF Based QA ")

# Allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = RAGSystem()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF files allowed")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Ingest PDF
    text = extract_text_from_pdf(file_path)
    rag.ingest(text)
    return UploadResponse(filename=file.filename, status="success")

@app.post("/ask")
async def ask_question(request: QueryRequest):
    try:
        answer = rag.generate_answer(request.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(500, f"Error generating answer: {str(e)}")