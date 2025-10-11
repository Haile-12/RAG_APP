import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <section className="max-w-4xl text-center mt-16">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">RAG PDF Question Answering</h1>
          <p className="text-gray-700 mb-6">
            Ask questions from any PDF instantly! The app uses <strong>Retrieval-Augmented Generation (RAG)</strong> to extract answers from your documents using AI.
          </p>
          <Link
            to="/app"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition"
          >
            Get Started
          </Link>
        </section>

        <section className="mt-16 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Free & Lightweight</h2>
            <p className="text-gray-600">
              Fully compatible with free APIs, uses local embeddings with FAISS, and requires no paid services or database setup.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">AI-Powered Answers</h2>
            <p className="text-gray-600">
              Uses Google Gemini AI along with sentence-transformers embeddings to provide accurate, context-aware answers from your PDFs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Fast Retrieval</h2>
            <p className="text-gray-600">
              Chunks and indexes your PDF in memory using FAISS for near-instant answer retrieval without complex backend infrastructure.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Modular & Maintainable</h2>
            <p className="text-gray-600">
              Clean separation of frontend, backend, and AI modules. Easy to extend for multiple PDFs or alternative AI models.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
