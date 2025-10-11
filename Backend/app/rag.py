import os
import faiss
import numpy as np
from typing import List
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from dotenv import load_dotenv
from .utils import chunk_text

# Load environment variables and configure Gemini
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


class RAGSystem:
    def __init__(self) -> None:
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.llm = genai.GenerativeModel('models/gemini-flash-latest')
        self.index: faiss.Index | None = None
        self.chunks: List[str] = []

    def ingest(self, text: str) -> None:
        """Ingest and embed document text into FAISS index."""
        if not text.strip():
            raise ValueError("Input text is empty.")
        
        self.chunks = chunk_text(text)
        if not self.chunks:
            raise ValueError("No valid chunks generated from input text.")

        embeddings = self.embedding_model.encode(
            self.chunks,
            convert_to_numpy=True
        ).astype(np.float32)

        dim = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dim)
        self.index.add(embeddings)

    def retrieve(self, query: str, k: int = 3) -> str:
        """Retrieve top-k relevant text chunks for a given query."""
        if self.index is None or not self.chunks:
            return ""

        query_vec = self.embedding_model.encode(
            [query],
            convert_to_numpy=True
        ).astype(np.float32)

        _, indices = self.index.search(query_vec, k)
        results = [
            self.chunks[i] for i in indices[0]
            if 0 <= i < len(self.chunks)
        ]
        return "\n".join(results)

    def generate_answer(self, query: str) -> str:
        """Generate an answer using retrieved context and Gemini LLM."""
        if not query or not query.strip():
            return "Please provide a valid question."

        try:
            context = self.retrieve(query)
            if not context.strip():
                return "I couldn't find relevant information in the uploaded document."

            prompt = f"""
You are a helpful assistant that answers questions using ONLY the provided context.

Rules:
- If the context contains the answer, respond clearly, concisely, and directly using only that information.
- Make your answers easy to read, natural, and engaging—avoid boring or overly long explanations.
- Do NOT add any information not found in the context.
- If the context does NOT contain the answer, respond exactly:
  "Sorry, I don't know. Haile didn't program me for this scope."

Context:
{context}

Question: {query}
Answer:
"""


            response = self.llm.generate_content(
                prompt,
                generation_config={"temperature": 0.3, "max_output_tokens": 500},
                safety_settings={
                    "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
                    "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
                    "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
                    "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
                }
            )

            if not response.text:
                return "Gemini returned an empty response. Try rephrasing your question."
            
            return response.text.strip()

        except Exception as e:
            error_msg = str(e)
            print(f"RAG Error: {error_msg}")

            if "API_KEY_INVALID" in error_msg:
                return "Error: Invalid Gemini API key. Check your .env file."
            elif "429" in error_msg:
                return "Error: Too many requests. Please wait and try again."
            elif "safety" in error_msg.lower() or "blocked" in error_msg.lower():
                return "Answer blocked by safety filters. Try a different question."
            else:
                return f"Unexpected error: {error_msg[:150]}"