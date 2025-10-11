
#  RAG PDF Assistant Frontend

A modern, responsive React frontend for interacting with the RAG PDF Q&A backend. Built with **Vite**, **TypeScript**, and **Tailwind CSS**, it offers a clean UI for uploading documents and asking natural language questions — with real-time AI answers powered by your local backend.

---

##  Features

-  **Drag-and-drop PDF upload** (with validation)
-  **Chat-style Q&A interface**
-  **Real-time responses** from backend
-  **Responsive & accessible UI** (mobile-friendly)
-  **Error feedback** for failed requests
-  **Fast HMR** via Vite

---

##  Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Framework    | React 18 + TypeScript |
| Build Tool   | Vite               |
| Styling      | Tailwind CSS       |
| HTTP Client  | Axios              |
| Dev Server   | `localhost:5173`   |

---

##  Installation

### Prerequisites
- Node.js ≥ 18.x
- npm or pnpm

### Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   npm install

Ensure backend is running
Backend must be active at http://localhost:8000
See ../backend/README.md for setup

2. **Run development server**
      npm run dev

Open your browser to:
 http://localhost:5173

3. **Workflow**
Upload a PDF (must be text-based, not scanned)
Wait for confirmation: "PDF ready!"
Ask any question about the document
View AI-generated answer below
         All communication happens via REST API to the backend. 

4. **Environment Assumptions**

Backend runs on http://localhost:8000
CORS is enabled for http://localhost:5173 (configured in backend)
No authentication required (for demo purposes)
     For production: add auth, rate limiting, and HTTPS. 