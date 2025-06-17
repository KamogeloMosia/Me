"use client"

import { useChat } from "@ai-sdk/react"
import { Paperclip, Mic, Send, Code2, X, ChevronLeft, ChevronRight } from "lucide-react" // Added Info, X, ChevronLeft, ChevronRight
import { useEffect, useRef, useState } from "react"

// Google Fonts (remains the same)
const GoogleFonts = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style jsx global>{`
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: #ffffff; /* Ensure body background is white */
      color: #000000; /* Default text color black */
    }
    .font-poppins {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
  `}</style>
  </>
)

const ChatPage = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "0",
        role: "assistant",
        content:
          "Hello! I'm your AI assistant for coding challenges, career advice, and job search strategies. How can I help you today?",
      },
    ],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getInitials = (role: "user" | "assistant" | "system" | "function" | "data" | "tool") => {
    if (role === "assistant") return "AI"
    return "U"
  }

  return (
    <>
      <GoogleFonts />
      <div className="flex h-screen bg-white text-black">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
          {/* Chat Header */}
          <header className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm h-[60px] flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-black font-poppins">Dev & Career Bot</h1>
            </div>
            <button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-black"
              aria-label={isPreviewOpen ? "Close preview" : "Open preview"}
            >
              {isPreviewOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </header>

          {/* Messages */}
          <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role !== "user" && (
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 self-end">
                    {getInitials(msg.role)}
                  </div>
                )}
                <div className={`max-w-[70%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  <div
                    className={`rounded-xl px-3.5 py-2 shadow-sm ${
                      msg.role === "user"
                        ? "bg-black text-white rounded-br-none"
                        : "bg-white text-black border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {/* Timestamp can be added here if needed */}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-black text-xs font-semibold flex-shrink-0 self-end">
                    {getInitials(msg.role)}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            {isLoading && <div className="text-center text-xs text-gray-500 py-2">Dev & Career Bot is typing...</div>}
          </main>

          {/* Message Input */}
          <footer className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black"
                  aria-label="Attach file"
                >
                  <Paperclip size={18} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    value={input}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                <button
                  type="button"
                  className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black"
                  aria-label="Voice input"
                >
                  <Mic size={18} />
                </button>
                <button
                  type="submit"
                  className="p-2.5 bg-black hover:bg-gray-800 text-white rounded-full disabled:opacity-50"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </footer>
        </div>

        {/* Expandable Preview Section */}
        <aside
          className={`flex flex-col bg-white border-l border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
            isPreviewOpen ? "w-80" : "w-0"
          }`}
        >
          <div className="p-3 border-b border-gray-200 flex items-center justify-between h-[60px] flex-shrink-0">
            <h2 className="text-lg font-semibold text-black font-poppins">Information</h2>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-black"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-sm text-gray-700">This is the preview section.</p>
            <p className="text-xs text-gray-500 mt-2">
              You can add relevant context, documents, user details, or bot capabilities here.
            </p>
            {/* Example Content */}
            <div className="mt-6 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-black mb-1">Bot Capabilities</h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Explains coding concepts</li>
                  <li>Helps debug code</li>
                  <li>Resume & Cover Letter Advice</li>
                  <li>Interview Preparation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black mb-1">Quick Links</h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Examples
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default ChatPage
