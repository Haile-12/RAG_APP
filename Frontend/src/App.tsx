import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [pdfUploaded, setPdfUploaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-4">
        {!pdfUploaded ? (
          <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md gap-6">
            <FileUpload onUploadSuccess={() => setPdfUploaded(true)} />
            <p className="text-sm text-gray-500 text-center mt-4">
              Upload a PDF to start asking questions!
            </p>
          </div>
        ) : (
          <ChatBox />
        )}
      </main>

      {/* Only show footer if PDF is not uploaded */}
      {!pdfUploaded && <Footer pdfUploaded={pdfUploaded} />}
    </div>
  );
}
