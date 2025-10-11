import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Copy, Check } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/ask", { question });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get answer. Please try again.",
        },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 p-6">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
            Welcome to <span className="text-blue-600">RAG PDF Assistant </span>! <br />
            What can I help you with?
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative max-w-[70%]">
                <div
                  className={`px-5 py-3 rounded-2xl break-words whitespace-pre-wrap shadow-sm transition-all duration-150 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(msg.content, idx)}
                  aria-label="Copy message"
                  className={`absolute -bottom-1 ${
                    msg.role === "user" ? "-left-7" : "-right-7"
                  } p-1 rounded-full transition-colors hover:bg-gray-200 flex items-center justify-center`}
                >
                  {copiedIndex === idx ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-gray-600 hover:text-gray-900"
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Input bar */}
      <footer className="sticky bottom-0 bg-gray-50 p-4">
        <form
          className="flex gap-2 items-end w-full max-w-2xl mx-auto"
          onSubmit={handleSubmit}
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-40 overflow-y-auto hide-scrollbar"
            rows={1}
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={loading}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}
