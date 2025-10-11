import { useState } from 'react';
import axios from 'axios';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadSuccess(); // notify parent
    } catch (error) {
      alert('Upload failed!');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
<div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6 max-w-lg w-full animate-fadeIn my-6">
  <h2 className="text-lg font-semibold text-gray-800 text-center">
        Upload your PDF
      </h2>

      <label
        htmlFor="pdf-upload"
        className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition-all duration-300"
      >
        <span className="text-gray-500 mb-2 text-sm">
          Click or drag PDF file here
        </span>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files?.[0] || null)
          }
          className="hidden"
        />
        {file && (
          <span className="text-blue-600 font-medium mt-2 truncate w-full text-center">
            {file.name}
          </span>
        )}
      </label>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
      >
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
    </div>
  );
}
