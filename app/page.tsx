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
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [loadedModules, setLoadedModules] = useState<any[]>([])
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

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
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      let themeToApply = "light"

      if (savedTheme) {
        themeToApply = savedTheme
      } else if (prefersDark) {
        themeToApply = "dark"
      }

      setIsDarkMode(themeToApply === "dark")
      document.documentElement.setAttribute("data-theme", themeToApply)
      document.body.className = themeToApply === "dark" ? "dark" : "light"
      localStorage.setItem("theme", themeToApply)

      setIsThemeLoaded(true)
    }

    // Initialize theme immediately
    initializeTheme()

    // Load saved theme settings
    const savedSettings = localStorage.getItem("themeSettings")
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        const root = document.documentElement
        root.style.setProperty("--modal-bg-opacity", settings.modalBgOpacity?.toString() || "0.95")
        root.style.setProperty("--panel-bg-opacity", settings.panelBgOpacity?.toString() || "0.98")
        root.style.setProperty("--border-opacity", settings.borderOpacity?.toString() || "0.3")
        root.style.setProperty("--border-color", settings.borderColor || (isDarkMode ? "60, 60, 60" : "220, 220, 220"))
        root.style.setProperty(
          "--modal-border-color",
          settings.modalBorderColor || (isDarkMode ? "80, 80, 80" : "200, 200, 200"),
        )
        root.style.setProperty(
          "--panel-border-color",
          settings.panelBorderColor || (isDarkMode ? "70, 70, 70" : "210, 210, 210"),
        )
      } catch (error) {
        console.error("Error loading theme settings:", error)
      }
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

      // Check if the response is ok
      if (!response.ok) {
        console.warn(`Modules API returned ${response.status}: ${response.statusText}`)
        setLoadedModules([])
        return
      }

      // Check if the response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.warn("Modules API did not return JSON")
        setLoadedModules([])
        return
      }

      const modules = await response.json()

      // Ensure modules is an array
      if (Array.isArray(modules)) {
        setLoadedModules(modules)
      } else {
        console.warn("Modules API returned invalid data format")
        setLoadedModules([])
      }
    } catch (error) {
      console.error("Failed to load modules:", error)
      setLoadedModules([])
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
    const newIsDarkMode = !isDarkMode

    setIsDarkMode(newIsDarkMode)
    document.documentElement.setAttribute("data-theme", newTheme)
    document.body.className = newTheme
    localStorage.setItem("theme", newTheme)

    // Update CSS custom properties for the new theme
    const root = document.documentElement
    const savedSettings = localStorage.getItem("themeSettings")

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        // Update border colors based on new theme
        const defaultBorderColors = newIsDarkMode
          ? { borderColor: "60, 60, 60", modalBorderColor: "80, 80, 80", panelBorderColor: "70, 70, 70" }
          : { borderColor: "220, 220, 220", modalBorderColor: "200, 200, 200", panelBorderColor: "210, 210, 210" }

        const updatedSettings = { ...settings, ...defaultBorderColors }
        localStorage.setItem("themeSettings", JSON.stringify(updatedSettings))

        root.style.setProperty("--border-color", updatedSettings.borderColor)
        root.style.setProperty("--modal-border-color", updatedSettings.modalBorderColor)
        root.style.setProperty("--panel-border-color", updatedSettings.panelBorderColor)
      } catch (error) {
        console.error("Error updating theme settings:", error)
      }
    } else {
      // Set default colors for new theme
      const defaultColors = newIsDarkMode
        ? { borderColor: "60, 60, 60", modalBorderColor: "80, 80, 80", panelBorderColor: "70, 70, 70" }
        : { borderColor: "220, 220, 220", modalBorderColor: "200, 200, 200", panelBorderColor: "210, 210, 210" }

      root.style.setProperty("--border-color", defaultColors.borderColor)
      root.style.setProperty("--modal-border-color", defaultColors.modalBorderColor)
      root.style.setProperty("--panel-border-color", defaultColors.panelBorderColor)
    }

    // Force a small delay to ensure theme changes are applied
    setTimeout(() => {
      document.documentElement.style.colorScheme = newTheme
    }, 50)
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

  const toggleMessageExpansion = (messageId: string) => {
    const newExpanded = new Set(expandedMessages)
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId)
    } else {
      newExpanded.add(messageId)
    }
    setExpandedMessages(newExpanded)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (isFabOpen) {
        setIsFabOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isFabOpen])

  // Don't render until theme is loaded to prevent flash
  if (!isThemeLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <>
      <GoogleAssets />

      {/* Admin Access Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => {
              setShowAdminModal(false)
              setAdminCode("")
            }}
          />

          {/* Modal Content */}
          <div className="relative bg-base-100 rounded-lg shadow-2xl border-2 p-6 w-full max-w-md mx-4 z-10">
            <h3 className="font-bold text-lg mb-4 text-base-content">Admin Access Required</h3>
            <p className="mb-4 text-base-content/80">Enter the admin access code to continue:</p>
            <input
              type="password"
              placeholder="Enter access code"
              className="input input-bordered w-full rounded-lg mb-4"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdminAccess()
                }
              }}
            />
            <div className="flex gap-3 justify-end">
              <button className="btn btn-primary rounded-lg text-primary-content" onClick={handleAdminAccess}>
                Access Admin
              </button>
              <button
                className="btn btn-outline rounded-lg"
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

      {/* Main Content - No Drawer */}
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        <div className="navbar px-4 min-h-16 shadow-sm">
          <div className="navbar-start">
            <div className="flex items-center">
              <div className="bg-base-100 text-base-content px-6 py-3 rounded-full flex items-center border-2 border-primary shadow-lg">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <img src="/placeholder-logo.png" alt="Dev & Career Bot" className="w-full h-full object-cover" />
                </div>
                <span
                  className="text-sm font-bold tracking-wide text-primary"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Dev & Career Bot
                </span>
              </div>
            </div>
          </div>

          <div className="navbar-center">{/* Optional: Add navigation items here */}</div>

          <div className="navbar-end flex items-center gap-3">
            <button
              className="btn btn-ghost btn-circle"
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="material-icons">{isDarkMode ? "light_mode" : "dark_mode"}</span>
            </button>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                {profileImage ? (
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <span className="material-icons">person</span>
                )}
              </div>
              <ul tabIndex={0} className="dropdown-content menu rounded-lg z-[1] w-64 p-3 shadow-lg">
                <li>
                  <button
                    onClick={() => profileInputRef.current?.click()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                  >
                    <span className="material-icons">upload</span>
                    <span className="font-medium">Upload Profile Picture</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                  >
                    <span className="material-icons">admin_panel_settings</span>
                    <span className="font-medium">Admin Panel</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setProfileImage(null)
                      localStorage.removeItem("profileImage")
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 text-error"
                  >
                    <span className="material-icons">delete</span>
                    <span className="font-medium">Remove Picture</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hidden file input for profile upload */}
        <input ref={profileInputRef} type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-base-300 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, index) => {
              const isExpanded = expandedMessages.has(msg.id)
              const isLongMessage = msg.content.length > 150
              const displayContent = isLongMessage && !isExpanded ? msg.content.substring(0, 150) + "..." : msg.content

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 animate-in fade-in duration-500 ${
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
                      <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center shadow-md overflow-hidden">
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
                      <div className="w-12 h-12 bg-neutral text-neutral-content rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                        <img
                          src="/placeholder.svg?height=48&width=48"
                          alt="AI Assistant"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Message Content with Pointer */}
                  <div className={`relative max-w-2xl ${msg.role === "user" ? "mr-3" : "ml-3"}`}>
                    {/* Pointer Line */}
                    <div
                      className={`absolute top-6 w-4 h-0.5 bg-base-300 ${
                        msg.role === "user" ? "right-full" : "left-full"
                      }`}
                    />

                    {/* Message Bubble */}
                    <div
                      className={`relative p-5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
                        msg.role === "user" ? "message-bubble user" : "message-bubble"
                      }`}
                    >
                      <div
                        className={`text-sm leading-relaxed whitespace-pre-wrap break-words font-medium ${
                          msg.role === "user" ? "text-primary-content" : "text-base-content"
                        }`}
                      >
                        {displayContent}
                      </div>

                      {/* Expand/Collapse Button */}
                      {isLongMessage && (
                        <button
                          onClick={() => toggleMessageExpansion(msg.id)}
                          className={`mt-3 text-xs opacity-70 hover:opacity-100 transition-opacity font-semibold ${
                            msg.role === "user" ? "text-primary-content" : "text-primary"
                          }`}
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}

                      {/* Timestamp */}
                      <div
                        className={`mt-3 text-xs opacity-60 font-light ${msg.role === "user" ? "text-right" : "text-left"}`}
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
              <div className="flex items-start gap-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-neutral text-neutral-content rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="AI Assistant"
                    className="w-full h-full object-cover animate-pulse"
                  />
                </div>
                <div className="relative ml-3">
                  <div className="absolute top-6 left-full w-4 h-0.5 bg-base-300" />
                  <div className="relative message-bubble p-5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="loading loading-dots loading-sm"></span>
                      <span className="text-sm opacity-70 font-medium">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
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
                  className="w-full resize-none min-h-[3rem] max-h-32 text-sm font-medium rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={1}
                />
              </div>
              <div className="relative">
                {/* FAB Options */}
                {isFabOpen && (
                  <div className="absolute bottom-full right-0 mb-3 flex flex-col gap-2 animate-in fade-in duration-200">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary rounded-lg w-10 h-10 min-h-10 p-0 flex items-center justify-center shadow-lg"
                      onClick={() => setIsFabOpen(false)}
                      title="Attach File"
                    >
                      <span className="material-icons text-sm">attach_file</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary rounded-lg w-10 h-10 min-h-10 p-0 flex items-center justify-center shadow-lg"
                      onClick={() => setIsFabOpen(false)}
                      title="Voice Input"
                    >
                      <span className="material-icons text-sm">mic</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary rounded-lg w-10 h-10 min-h-10 p-0 flex items-center justify-center shadow-lg"
                      onClick={() => setIsFabOpen(false)}
                      title="Upload Image"
                    >
                      <span className="material-icons text-sm">image</span>
                    </button>
                    {/* Module Actions */}
                    {loadedModules.map((module, index) => (
                      <button
                        key={index}
                        type="button"
                        className="btn btn-sm btn-accent rounded-lg w-10 h-10 min-h-10 p-0 flex items-center justify-center shadow-lg"
                        onClick={() => {
                          // Execute module functionality
                          if (module.execute) {
                            module.execute()
                          }
                          setIsFabOpen(false)
                        }}
                        title={module.name}
                      >
                        <span className="material-icons text-sm">{module.icon || "extension"}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Send Button */}
                <button
                  type="button"
                  className="btn btn-primary rounded-lg w-12 h-12 min-h-12 p-0 flex items-center justify-center transition-transform duration-200 hover:scale-105 shadow-lg"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    if (isFabOpen) {
                      setIsFabOpen(false)
                    } else if (input.trim()) {
                      handleSubmit(e as any)
                    } else {
                      setIsFabOpen(true)
                    }
                  }}
                >
                  <span className={`material-icons transition-transform duration-200 ${isFabOpen ? "rotate-45" : ""}`}>
                    {isFabOpen ? "close" : input.trim() ? "send" : "add"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
