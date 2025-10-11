import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About RAG PDF Q&A Assistant </h1>
        <p className="mb-4">
          RAG PDF Q&A is an educational project demonstrating how Retrieval-Augmented Generation (RAG) can be used to answer questions from documents.
          The frontend is built with React + TypeScript + Tailwind CSS, and the backend uses FastAPI + FAISS + Google Gemini.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Upload PDFs and process them without any paid services.</li>
          <li>Generate embeddings with Sentence Transformers and search with FAISS.</li>
          <li>Answer questions with context-aware responses via Google Gemini LLM.</li>
          <li>Free-tier compatible, modular, and easy-to-extend code.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Learn More</h2>
        <ul className="list-disc ml-6">
          <li>
            RAG (Retrieval-Augmented Generation) overview:{" "}
            <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
              https://arxiv.org/abs/2005.11401
            </a>
          </li>
          <li>
            Open-source FAISS library:{" "}
            <a href="https://github.com/facebookresearch/faiss" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
              https://github.com/facebookresearch/faiss
            </a>
          </li>
          <li>
            Google Gemini (LLM) documentation:{" "}
            <a href="https://ai.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
              https://ai.google.com/
            </a>
          </li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}
