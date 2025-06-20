"use client"

import { useChat } from "@ai-sdk/react"
import { Paperclip, Mic, Send, Code2, X, ChevronLeft, ChevronRight, Home, Info, Settings } from "lucide-react"
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
      <div className="flex flex-col h-screen bg-base-100 text-base-content relative">
        {/* Chat Header */}
        <header className="navbar bg-base-100 border-b border-base-200 px-3 py-2 flex-shrink-0 sticky top-0 z-20">
          <div className="flex-1 flex items-center gap-2">
            <span className="btn btn-sm btn-square btn-neutral">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="font-bold text-base font-poppins">Dev & Career Bot</span>
          </div>
          <button
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            className="btn btn-ghost btn-sm"
            aria-label={isPreviewOpen ? "Close preview" : "Open preview"}
          >
            {isPreviewOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-2 py-3 space-y-3 max-w-full"
          style={{ paddingBottom: "5.5rem" /* for bottom nav/input on mobile */ }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
              {msg.role !== "user" && (
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-9 h-9 text-xs flex items-center justify-center">
                    {getInitials(msg.role)}
                  </div>
                </div>
              )}
              <div className={`max-w-[85vw] sm:max-w-[70vw] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`chat-bubble px-4 py-2 text-sm break-words ${
                    msg.role === "user"
                      ? "chat-bubble-primary text-white rounded-br-none"
                      : "chat-bubble bg-base-200 text-base-content rounded-bl-none"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                </div>
              </div>
              {msg.role === "user" && (
                <div className="avatar placeholder">
                  <div className="bg-base-300 text-base-content rounded-full w-9 h-9 text-xs flex items-center justify-center">
                    {getInitials(msg.role)}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          {isLoading && <div className="text-center text-xs text-base-content/50 py-2">Dev & Career Bot is typing...</div>}
        </main>

        {/* Message Input */}
        <footer className="fixed bottom-0 left-0 w-full bg-base-100 border-t border-base-200 px-2 py-2 flex-shrink-0 z-20"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-2xl mx-auto">
            <button
              type="button"
              className="btn btn-ghost btn-circle btn-md"
              aria-label="Attach file"
              tabIndex={0}
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={handleInputChange}
              className="input input-bordered input-md w-full"
              autoComplete="off"
              tabIndex={0}
            />
            <button
              type="button"
              className="btn btn-ghost btn-circle btn-md"
              aria-label="Voice input"
              tabIndex={0}
            >
              <Mic size={20} />
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-circle btn-md"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              tabIndex={0}
            >
              <Send size={20} />
            </button>
          </form>
        </footer>

        {/* Bottom Navbar (Mobile) */}
        <nav className="btm-nav btm-nav-xs md:hidden z-30"
          style={{ bottom: "env(safe-area-inset-bottom,0)" }}>
          <button className="active" tabIndex={0}>
            <Home className="w-5 h-5" />
            <span className="btm-nav-label text-xs">Chat</span>
          </button>
          <button onClick={() => setIsPreviewOpen(true)} tabIndex={0}>
            <Info className="w-5 h-5" />
            <span className="btm-nav-label text-xs">Info</span>
          </button>
          <button tabIndex={0}>
            <Settings className="w-5 h-5" />
            <span className="btm-nav-label text-xs">Settings</span>
          </button>
        </nav>

        {/* Expandable Preview Section */}
        <aside
          className={`fixed top-0 right-0 h-full bg-base-100 border-l border-base-200 transition-all duration-300 ease-in-out z-40
            ${isPreviewOpen ? "w-11/12 sm:w-80 max-w-full" : "w-0"}
            ${isPreviewOpen ? "" : "pointer-events-none"}
          `}
          style={{
            boxShadow: isPreviewOpen ? "rgba(0,0,0,0.15) -4px 0 24px" : "none",
            maxWidth: "100vw",
          }}
        >
          <div className={`flex flex-col h-full ${isPreviewOpen ? "" : "hidden sm:flex"}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-200">
              <span className="font-semibold text-base font-poppins">Information</span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="btn btn-ghost btn-sm"
                aria-label="Close preview"
                tabIndex={isPreviewOpen ? 0 : -1}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 px-4 py-3 overflow-y-auto">
              <p className="text-sm text-base-content">This is the preview section.</p>
              <p className="text-xs text-base-content/60 mt-2">
                You can add relevant context, documents, user details, or bot capabilities here.
              </p>
              <div className="mt-6 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Bot Capabilities</h3>
                  <ul className="list-disc list-inside text-xs text-base-content/70 space-y-1">
                    <li>Explains coding concepts</li>
                    <li>Helps debug code</li>
                    <li>Resume & Cover Letter Advice</li>
                    <li>Interview Preparation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Quick Links</h3>
                  <ul className="list-disc list-inside text-xs text-base-content/70 space-y-1">
                    <li>
                      <a href="#" className="link">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Examples
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default ChatPage
