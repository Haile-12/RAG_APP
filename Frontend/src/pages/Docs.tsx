import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
        <p className="mb-4">
          This RAG (Retrieval-Augmented Generation) application enables users to upload PDFs and ask questions about their content.
          It uses AI to provide accurate answers by combining embeddings, vector search (FAISS), and the Google Gemini LLM.
          The system is fully modular, free-tier compatible, and lightweight.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Project Architecture & Components</h2>
          <p className="mb-4">
            The application has a clear separation of concerns between frontend, backend, and AI components:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Frontend:</strong> React (Vite + TypeScript + Tailwind) provides the user interface for uploading PDFs, asking questions, and displaying answers.
            </li>
            <li>
              <strong>Backend:</strong> FastAPI handles file uploads, processes PDFs, generates embeddings, manages the FAISS index, and interacts with the Google Gemini API.
            </li>
            <li>
              <strong>PDF Processor:</strong> Extracts text using <a href="https://pypdf.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">PyPDF2 / pypdf</a>.
            </li>
            <li>
              <strong>Embedding & Vector DB:</strong> Sentence Transformers convert text chunks into embeddings, which are stored in-memory using <a href="https://faiss.ai/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">FAISS</a>.
            </li>
            <li>
              <strong>LLM:</strong> Google Gemini API generates context-aware answers using retrieved chunks.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6 mb-4">How It Works</h2>
          <p className="mb-4">
            The following steps outline the detailed interaction between the frontend and backend:
          </p>
          <ol className="list-decimal ml-6 space-y-3">
            <li>
              <strong>PDF Upload:</strong> User selects a PDF in the frontend. The frontend creates a <code>FormData</code> object and sends a POST request to <code>/upload</code> in FastAPI.
            </li>
            <li>
              <strong>Text Extraction:</strong> Backend receives the PDF, saves it in <code>uploads/</code>, and extracts text from all pages using PyPDF.
            </li>
            <li>
              <strong>Text Chunking:</strong> Extracted text is split into smaller chunks for efficient retrieval, using configurable chunk size and overlap to retain context.
            </li>
            <li>
              <strong>Embedding Generation:</strong> Each chunk is converted into a numeric embedding using <a href="https://www.sbert.net/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Sentence Transformers</a>.
            </li>
            <li>
              <strong>FAISS Indexing:</strong> Embeddings are stored in an in-memory FAISS index. This enables fast vector similarity searches when answering questions.
            </li>
            <li>
              <strong>Question Handling:</strong> When a user submits a question, the backend embeds the question and searches the FAISS index for top-k relevant chunks.
            </li>
            <li>
              <strong>Answer Generation:</strong> Retrieved chunks form the context, which is sent to the Google Gemini LLM. The model generates a precise answer and returns it as JSON to the frontend.
            </li>
            <li>
              <strong>Frontend Display:</strong> The answer is displayed in the chat interface. The frontend remains stateless, relying entirely on backend processing.
            </li>
          </ol>
          <p className="mt-4 text-gray-700">
            ⚠️ Note: The FAISS index is in-memory. Restarting the backend will require re-uploading PDFs. Currently supports single PDF at a time. No authentication or persistent storage is implemented for simplicity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Resources</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>
              React Official Docs:{" "}
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://react.dev/
              </a>
            </li>
            <li>
              FastAPI Official Docs:{" "}
              <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://fastapi.tiangolo.com/
              </a>
            </li>
            <li>
              PyPDF / PyPDF2 Docs:{" "}
              <a href="https://pypdf.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://pypdf.readthedocs.io/en/latest/
              </a>
            </li>
            <li>
              FAISS Official Site:{" "}
              <a href="https://faiss.ai/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://faiss.ai/
              </a>
            </li>
            <li>
              FAISS GitHub:{" "}
              <a href="https://github.com/facebookresearch/faiss" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://github.com/facebookresearch/faiss
              </a>
            </li>
            <li>
              Sentence Transformers:{" "}
              <a href="https://www.sbert.net/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://www.sbert.net/
              </a>
            </li>
            <li>
              Google Gemini API:{" "}
              <a href="https://developers.google.com/experimental/generative-ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://developers.google.com/experimental/generative-ai
              </a>
            </li>
            <li>
              RAG Research Paper (arXiv):{" "}
              <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://arxiv.org/abs/2005.11401
              </a>
            </li>
            <li>
              AI YouTube Tutorials:{" "}
              <a href="https://www.youtube.com/@AIExplained" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                AI Explained
              </a>
            </li>
            <li>
              OpenAI GitHub (LLM examples):{" "}
              <a href="https://github.com/openai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                https://github.com/openai
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
