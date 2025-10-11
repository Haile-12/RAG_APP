interface FooterProps {
  pdfUploaded?: boolean;
}

export default function Footer({ }: FooterProps) {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p>&copy; {new Date().getFullYear()} RAG PDF Assistant. All rights reserved.  </p>
        <p className="mt-2">
          Built with those Technologies {" "}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
            React
          </a>,{" "}
          <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
            FastAPI
          </a>,{" "}
          <a href="https://github.com/facebookresearch/faiss" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
            FAISS
          </a>, and{" "}
          <a href="https://ai.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
            Google Gemini(LLM)
          </a>
          <pre>powerd by Haile T.</pre>
        </p>
      </div>
    </footer>
  );
}
