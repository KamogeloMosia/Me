"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState } from "react"

// Google Fonts and Icons
const GoogleAssets = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <style jsx global>{`
      body {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      }
    `}</style>
  </>
)

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [loadedModules, setLoadedModules] = useState<any[]>([])
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminCode, setAdminCode] = useState("")

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
  const profileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      // Use system preference as default
      const defaultTheme = prefersDark ? "dark" : "light"
      setIsDarkMode(prefersDark)
      document.documentElement.setAttribute("data-theme", defaultTheme)
      localStorage.setItem("theme", defaultTheme)
    }
  }, [])

  useEffect(() => {
    // Load profile image from localStorage
    const savedProfile = localStorage.getItem("profileImage")
    if (savedProfile) {
      setProfileImage(savedProfile)
    }

    // Load installed modules
    loadInstalledModules()
  }, [])

  const loadInstalledModules = async () => {
    try {
      const response = await fetch("/api/modules")
      const modules = await response.json()
      setLoadedModules(modules)
    } catch (error) {
      console.error("Failed to load modules:", error)
    }
  }

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
        localStorage.setItem("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const handleAdminAccess = () => {
    if (adminCode === "admin123") {
      setShowAdminModal(false)
      setAdminCode("")
      window.location.href = "/admin"
    } else {
      alert("Invalid access code")
      setAdminCode("")
    }
  }

  const getInitials = (role: "user" | "assistant" | "system" | "function" | "data" | "tool") => {
    return role === "assistant" ? "AI" : "U"
  }

  // Close sidebar on mobile when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  const toggleMessageExpansion = (messageId: string) => {
    const newExpanded = new Set(expandedMessages)
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId)
    } else {
      newExpanded.add(messageId)
    }
    setExpandedMessages(newExpanded)
  }

  return (
    <>
      <GoogleAssets />
      <div className="drawer lg:drawer-open">
        <input
          id="drawer-toggle"
          type="checkbox"
          className="drawer-toggle"
          checked={isSidebarOpen}
          onChange={(e) => setIsSidebarOpen(e.target.checked)}
        />

        {/* Admin Access Modal */}
        {showAdminModal && (
          <div className="modal modal-open flex items-center justify-center">
            <div className="modal-box rounded-lg max-w-md mx-auto">
              <h3 className="font-bold text-lg mb-4">Admin Access Required</h3>
              <p className="mb-4">Enter the admin access code to continue:</p>
              <input
                type="password"
                placeholder="Enter access code"
                className="input input-bordered w-full rounded-lg"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdminAccess()
                  }
                }}
              />
              <div className="modal-action">
                <button className="btn btn-primary rounded-lg" onClick={handleAdminAccess}>
                  Access Admin
                </button>
                <button
                  className="btn rounded-lg"
                  onClick={() => {
                    setShowAdminModal(false)
                    setAdminCode("")
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Top Navigation */}
          <div className="navbar bg-base-100 border-b border-base-200 px-2 lg:px-4 min-h-12">
            <div className="navbar-start">
              <div className="flex items-center ml-1 lg:ml-0">
                <div className="bg-black text-white px-4 py-3 rounded-lg h-full flex items-center">
                  <span className="text-xs font-bold tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Dev & Career Bot
                  </span>
                </div>
              </div>
            </div>
            <div className="navbar-end flex items-center gap-2">
              <button className="btn btn-ghost btn-circle btn-sm" onClick={toggleTheme}>
                <span className="material-icons text-sm">{isDarkMode ? "light_mode" : "dark_mode"}</span>
              </button>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-6 h-6 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="material-icons text-sm">person</span>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow border border-base-300"
                >
                  <li>
                    <button onClick={() => profileInputRef.current?.click()}>
                      <span className="material-icons text-sm">upload</span>
                      Upload Profile Picture
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setShowAdminModal(true)}>
                      <span className="material-icons text-sm">admin_panel_settings</span>
                      Admin Panel
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setProfileImage(null)
                        localStorage.removeItem("profileImage")
                      }}
                    >
                      <span className="material-icons text-sm">delete</span>
                      Remove Picture
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hidden file input for profile upload */}
          <input ref={profileInputRef} type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto bg-base-300 p-4 lg:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg, index) => {
                const isExpanded = expandedMessages.has(msg.id)
                const isLongMessage = msg.content.length > 150
                const displayContent =
                  isLongMessage && !isExpanded ? msg.content.substring(0, 150) + "..." : msg.content

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 animate-in fade-in duration-500 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {/* Avatar Circle */}
                    <div className="flex-shrink-0">
                      {msg.role === "user" ? (
                        <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                          {profileImage ? (
                            <img
                              src={profileImage || "/placeholder.svg"}
                              alt="User"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold">U</span>
                          )}
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-neutral text-neutral-content rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="AI Assistant"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Message Content with Pointer */}
                    <div className={`relative max-w-lg ${msg.role === "user" ? "mr-2" : "ml-2"}`}>
                      {/* Pointer Line */}
                      <div
                        className={`absolute top-4 w-4 h-0.5 bg-base-300 ${
                          msg.role === "user" ? "right-full" : "left-full"
                        }`}
                      />

                      {/* Message Bubble */}
                      <div
                        className={`relative p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
                          msg.role === "user"
                            ? "bg-primary text-primary-content border-primary/20"
                            : "bg-base-100 text-base-content border-base-300"
                        }`}
                      >
                        <div className="text-xs leading-relaxed whitespace-pre-wrap break-words font-medium">
                          {displayContent}
                        </div>

                        {/* Expand/Collapse Button */}
                        {isLongMessage && (
                          <button
                            onClick={() => toggleMessageExpansion(msg.id)}
                            className={`mt-2 text-[0.6rem] opacity-70 hover:opacity-100 transition-opacity font-semibold ${
                              msg.role === "user" ? "text-primary-content" : "text-primary"
                            }`}
                          >
                            {isExpanded ? "Show less" : "Show more"}
                          </button>
                        )}

                        {/* Timestamp */}
                        <div
                          className={`mt-2 text-[0.6rem] opacity-60 font-light ${msg.role === "user" ? "text-right" : "text-left"}`}
                        >
                          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div ref={messagesEndRef} />

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-start gap-3 animate-in fade-in duration-300">
                  <div className="w-10 h-10 bg-neutral text-neutral-content rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="AI Assistant"
                      className="w-full h-full object-cover animate-pulse"
                    />
                  </div>
                  <div className="relative ml-2">
                    <div className="absolute top-4 left-full w-4 h-0.5 bg-base-300" />
                    <div className="relative p-4 rounded-lg bg-base-100 border border-base-300 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="loading loading-dots loading-sm"></span>
                        <span className="text-xs opacity-70 font-medium">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-base-300 p-2 lg:p-3">
            <div className="max-w-2xl mx-auto px-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="flex-1">
                  <textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                    className="w-full resize-none min-h-[2rem] max-h-20 text-xs font-medium rounded-lg bg-base-200 p-2 border-0 outline-none focus:ring-0"
                    rows={1}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-sm bg-black text-white border-0 hover:bg-gray-800 rounded-lg w-8 h-8 min-h-8 p-0 flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  disabled={isLoading || !input.trim()}
                >
                  <span className="material-icons text-sm">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
