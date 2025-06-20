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

// Enhanced theme structure with all customization options
const themes = {
  default: {
    name: "Default",
    icon: "palette",
    colors: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#374151",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
      background: "#ffffff",
      backgroundSecondary: "#f8fafc",
      backgroundTertiary: "#e2e8f0",
      buttonPrimary: "#1f2937",
      buttonSecondary: "#6b7280",
      buttonAccent: "#374151",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  ocean: {
    name: "Ocean Blue",
    icon: "waves",
    colors: {
      primary: "#0ea5e9",
      secondary: "#0284c7",
      accent: "#0369a1",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#06b6d4",
      background: "#f0f9ff",
      backgroundSecondary: "#e0f2fe",
      backgroundTertiary: "#bae6fd",
      buttonPrimary: "#0ea5e9",
      buttonSecondary: "#0284c7",
      buttonAccent: "#0369a1",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  forest: {
    name: "Forest Green",
    icon: "park",
    colors: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#065f46",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
      background: "#f0fdf4",
      backgroundSecondary: "#dcfce7",
      backgroundTertiary: "#bbf7d0",
      buttonPrimary: "#059669",
      buttonSecondary: "#047857",
      buttonAccent: "#065f46",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  sunset: {
    name: "Sunset Orange",
    icon: "wb_sunny",
    colors: {
      primary: "#ea580c",
      secondary: "#dc2626",
      accent: "#b91c1c",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
      background: "#fff7ed",
      backgroundSecondary: "#fed7aa",
      backgroundTertiary: "#fdba74",
      buttonPrimary: "#ea580c",
      buttonSecondary: "#dc2626",
      buttonAccent: "#b91c1c",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  purple: {
    name: "Royal Purple",
    icon: "auto_awesome",
    colors: {
      primary: "#7c3aed",
      secondary: "#6d28d9",
      accent: "#5b21b6",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
      background: "#faf5ff",
      backgroundSecondary: "#e9d5ff",
      backgroundTertiary: "#d8b4fe",
      buttonPrimary: "#7c3aed",
      buttonSecondary: "#6d28d9",
      buttonAccent: "#5b21b6",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  rose: {
    name: "Rose Pink",
    icon: "favorite",
    colors: {
      primary: "#e11d48",
      secondary: "#be185d",
      accent: "#9f1239",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#0ea5e9",
      background: "#fff1f2",
      backgroundSecondary: "#fecdd3",
      backgroundTertiary: "#fda4af",
      buttonPrimary: "#e11d48",
      buttonSecondary: "#be185d",
      buttonAccent: "#9f1239",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  cyber: {
    name: "Cyber Neon",
    icon: "electric_bolt",
    colors: {
      primary: "#00ff88",
      secondary: "#00d4ff",
      accent: "#ff0080",
      success: "#00ff88",
      warning: "#ffaa00",
      error: "#ff0040",
      info: "#00d4ff",
      background: "#0a0a0a",
      backgroundSecondary: "#1a1a1a",
      backgroundTertiary: "#2a2a2a",
      buttonPrimary: "#00ff88",
      buttonSecondary: "#00d4ff",
      buttonAccent: "#ff0080",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
  minimal: {
    name: "Minimal Gray",
    icon: "minimize",
    colors: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#9ca3af",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#6b7280",
      background: "#fafafa",
      backgroundSecondary: "#f5f5f5",
      backgroundTertiary: "#e5e5e5",
      buttonPrimary: "#374151",
      buttonSecondary: "#6b7280",
      buttonAccent: "#9ca3af",
    },
    typography: {
      fontSize: 16,
      scale: 1.0,
      fontWeight: "normal",
    },
  },
}

const ChatPage = () => {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [loadedModules, setLoadedModules] = useState<any[]>([])
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("default")
  const [customTheme, setCustomTheme] = useState(themes.default)

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
      const savedColorTheme = localStorage.getItem("colorTheme")
      const savedCustomTheme = localStorage.getItem("customTheme")
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

      // Load custom theme if exists
      if (savedCustomTheme) {
        try {
          const customThemeData = JSON.parse(savedCustomTheme)
          setCustomTheme(customThemeData)
          applyFullTheme(customThemeData)
        } catch (error) {
          console.error("Error loading custom theme:", error)
        }
      } else if (savedColorTheme && themes[savedColorTheme as keyof typeof themes]) {
        setCurrentTheme(savedColorTheme)
        const themeData = themes[savedColorTheme as keyof typeof themes]
        setCustomTheme(themeData)
        applyFullTheme(themeData)
      }

      setIsThemeLoaded(true)
    }

    initializeTheme()
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

      if (!response.ok) {
        console.warn(`Modules API returned ${response.status}: ${response.statusText}`)
        setLoadedModules([])
        return
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.warn("Modules API did not return JSON")
        setLoadedModules([])
        return
      }

      const modules = await response.json()

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

  const applyFullTheme = (theme: any) => {
    const root = document.documentElement

    // Apply colors directly as CSS custom properties
    root.style.setProperty("--theme-primary", theme.colors.primary)
    root.style.setProperty("--theme-secondary", theme.colors.secondary)
    root.style.setProperty("--theme-accent", theme.colors.accent)
    root.style.setProperty("--theme-background", theme.colors.background)
    root.style.setProperty("--theme-background-secondary", theme.colors.backgroundSecondary)
    root.style.setProperty("--theme-success", theme.colors.success)
    root.style.setProperty("--theme-warning", theme.colors.warning)
    root.style.setProperty("--theme-error", theme.colors.error)
    root.style.setProperty("--theme-info", theme.colors.info)

    // Apply typography
    root.style.setProperty("--theme-font-size", `${theme.typography.fontSize}px`)
    root.style.setProperty("--theme-scale", theme.typography.scale.toString())
    root.style.setProperty("--theme-font-weight", theme.typography.fontWeight)

    // Convert hex to HSL for DaisyUI
    const hexToHsl = (hex: string) => {
      const r = Number.parseInt(hex.slice(1, 3), 16) / 255
      const g = Number.parseInt(hex.slice(3, 5), 16) / 255
      const b = Number.parseInt(hex.slice(5, 7), 16) / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0,
        s = 0,
        l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
    }

    // Apply DaisyUI theme colors
    root.style.setProperty("--p", hexToHsl(theme.colors.primary))
    root.style.setProperty("--s", hexToHsl(theme.colors.secondary))
    root.style.setProperty("--a", hexToHsl(theme.colors.accent))
    root.style.setProperty("--b1", hexToHsl(theme.colors.background))
    root.style.setProperty("--b2", hexToHsl(theme.colors.backgroundSecondary))
    root.style.setProperty("--su", hexToHsl(theme.colors.success))
    root.style.setProperty("--wa", hexToHsl(theme.colors.warning))
    root.style.setProperty("--er", hexToHsl(theme.colors.error))
    root.style.setProperty("--in", hexToHsl(theme.colors.info))
  }

  const handleThemeChange = (themeKey: string) => {
    setCurrentTheme(themeKey)
    const themeData = themes[themeKey as keyof typeof themes]
    setCustomTheme(themeData)
    applyFullTheme(themeData)
    localStorage.setItem("colorTheme", themeKey)
    localStorage.setItem("customTheme", JSON.stringify(themeData))
  }

  const handleCustomThemeChange = (category: string, key: string, value: any) => {
    const newTheme = {
      ...customTheme,
      [category]: {
        ...customTheme[category as keyof typeof customTheme],
        [key]: value,
      },
    }
    setCustomTheme(newTheme)
    applyFullTheme(newTheme)
    localStorage.setItem("customTheme", JSON.stringify(newTheme))
  }

  const resetToDefaultTheme = () => {
    const defaultTheme = themes.default
    setCustomTheme(defaultTheme)
    setCurrentTheme("default")
    applyFullTheme(defaultTheme)
    localStorage.setItem("colorTheme", "default")
    localStorage.setItem("customTheme", JSON.stringify(defaultTheme))
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

    // Reapply current theme
    applyFullTheme(customTheme)

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

      {/* Simplified Theme Customization Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setShowCustomizeModal(false)}
          />
          <div className="relative bg-base-100 rounded-lg shadow-2xl border-2 p-6 w-full max-w-4xl mx-4 z-10 max-h-[85vh] overflow-y-auto">
            <h3 className="font-bold text-xl mb-6 text-base-content flex items-center gap-3">
              <span className="material-icons">tune</span>
              Customize Theme
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Controls */}
              <div className="space-y-6">
                {/* Colors */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-base-content border-b pb-2">Colors</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Primary</label>
                      <input
                        type="color"
                        value={customTheme.colors.primary}
                        onChange={(e) => handleCustomThemeChange("colors", "primary", e.target.value)}
                        className="w-full h-10 rounded border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Secondary</label>
                      <input
                        type="color"
                        value={customTheme.colors.secondary}
                        onChange={(e) => handleCustomThemeChange("colors", "secondary", e.target.value)}
                        className="w-full h-10 rounded border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Background</label>
                      <input
                        type="color"
                        value={customTheme.colors.background}
                        onChange={(e) => handleCustomThemeChange("colors", "background", e.target.value)}
                        className="w-full h-10 rounded border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Accent</label>
                      <input
                        type="color"
                        value={customTheme.colors.accent}
                        onChange={(e) => handleCustomThemeChange("colors", "accent", e.target.value)}
                        className="w-full h-10 rounded border"
                      />
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-base-content border-b pb-2">Typography</h4>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Font Size: {customTheme.typography.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={customTheme.typography.fontSize}
                      onChange={(e) => handleCustomThemeChange("typography", "fontSize", Number(e.target.value))}
                      className="range range-primary w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      UI Scale: {customTheme.typography.scale.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0.8"
                      max="1.3"
                      step="0.1"
                      value={customTheme.typography.scale}
                      onChange={(e) => handleCustomThemeChange("typography", "scale", Number(e.target.value))}
                      className="range range-primary w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Font Weight</label>
                    <select
                      value={customTheme.typography.fontWeight}
                      onChange={(e) => handleCustomThemeChange("typography", "fontWeight", e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="300">Light</option>
                      <option value="400">Normal</option>
                      <option value="500">Medium</option>
                      <option value="600">Semibold</option>
                      <option value="700">Bold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Panel - Live Preview */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base-content border-b pb-2">Live Preview</h4>

                <div className="preview-container p-6 rounded-lg border-2 space-y-4">
                  <div className="preview-header">
                    <h5 className="preview-title text-xl font-bold mb-2">Sample Interface</h5>
                    <p className="preview-text">This preview updates in real-time as you customize.</p>
                  </div>

                  <div className="preview-buttons flex gap-3 flex-wrap">
                    <button className="preview-btn-primary px-4 py-2 rounded font-medium text-white">
                      Primary Button
                    </button>
                    <button className="preview-btn-secondary px-4 py-2 rounded font-medium text-white">
                      Secondary
                    </button>
                    <button className="preview-btn-accent px-3 py-2 rounded font-medium text-white">Accent</button>
                  </div>

                  <div className="preview-card p-4 rounded-lg border">
                    <h6 className="font-semibold mb-2">Sample Card</h6>
                    <p className="text-sm opacity-80">This card shows how your theme affects different UI elements.</p>
                  </div>

                  <div className="preview-status-grid grid grid-cols-2 gap-2 text-xs">
                    <div className="preview-success p-2 rounded text-center text-white font-medium">Success</div>
                    <div className="preview-warning p-2 rounded text-center text-white font-medium">Warning</div>
                    <div className="preview-error p-2 rounded text-center text-white font-medium">Error</div>
                    <div className="preview-info p-2 rounded text-center text-white font-medium">Info</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
              <button className="btn btn-outline" onClick={resetToDefaultTheme}>
                Reset
              </button>
              <button className="btn btn-outline" onClick={() => setShowCustomizeModal(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => setShowCustomizeModal(false)}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Selection Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setShowThemeModal(false)}
          />
          <div className="relative bg-base-100 rounded-lg shadow-2xl border-2 p-6 w-full max-w-4xl mx-4 z-10 max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-xl mb-6 text-base-content flex items-center gap-3">
              <span className="material-icons">palette</span>
              Choose Your Theme
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(themes).map(([key, theme]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                    currentTheme === key ? "border-primary bg-primary/10" : "border-base-300 hover:border-primary/50"
                  }`}
                  onClick={() => handleThemeChange(key)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-icons text-2xl" style={{ color: theme.colors.primary }}>
                      {theme.icon}
                    </span>
                    <h4 className="font-semibold text-base-content">{theme.name}</h4>
                    {currentTheme === key && <span className="material-icons text-primary ml-auto">check_circle</span>}
                  </div>

                  <div className="flex gap-2 mb-3">
                    {Object.entries(theme.colors)
                      .slice(0, 4)
                      .map(([colorKey, color]) => (
                        <div
                          key={colorKey}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={colorKey}
                        />
                      ))}
                  </div>

                  <div className="text-xs text-base-content/70">Primary: {theme.colors.primary}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-between mt-6 pt-4 border-t border-base-300">
              <button
                className="btn btn-secondary rounded-lg"
                onClick={() => {
                  setShowThemeModal(false)
                  setShowCustomizeModal(true)
                }}
              >
                <span className="material-icons mr-2">tune</span>
                Advanced Customize
              </button>
              <div className="flex gap-3">
                <button className="btn btn-outline rounded-lg" onClick={() => setShowThemeModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary rounded-lg" onClick={() => setShowThemeModal(false)}>
                  Apply Theme
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Access Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => {
              setShowAdminModal(false)
              setAdminCode("")
            }}
          />
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

      {/* Main Content */}
      <div
        className="flex flex-col min-h-screen"
        style={{
          fontSize: `var(--font-size-base, ${customTheme.typography.fontSize}px)`,
          fontWeight: customTheme.typography.fontWeight,
        }}
      >
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

          <div className="navbar-center"></div>

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
                    onClick={() => setShowThemeModal(true)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                  >
                    <span className="material-icons">palette</span>
                    <span className="font-medium">Choose Theme</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowCustomizeModal(true)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
                  >
                    <span className="material-icons">tune</span>
                    <span className="font-medium">Advanced Customize</span>
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
                    transform: `scale(${customTheme.typography.scale})`,
                    transformOrigin: msg.role === "user" ? "top right" : "top left",
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
                      <div className="w-12 h-12 bg-neutral text-neutral-content rounded-full flex items-center justify-center shadow-md overflow-hidden">
                        <img src="/ai-avatar.png" alt="AI Assistant" className="w-full h-full object-cover" />
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
              <div
                className="flex items-start gap-4 animate-in fade-in duration-300"
                style={{
                  transform: `scale(${customTheme.typography.scale})`,
                  transformOrigin: "top left",
                }}
              >
                <div className="w-12 h-12 bg-neutral text-neutral-content rounded-full flex items-center justify-center shadow-md overflow-hidden">
                  <img src="/ai-avatar.png" alt="AI Assistant" className="w-full h-full object-cover animate-pulse" />
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
                  style={{
                    fontSize: `${customTheme.typography.fontSize}px`,
                    fontWeight: customTheme.typography.fontWeight,
                  }}
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
                      style={{ backgroundColor: customTheme.colors.buttonSecondary }}
                    >
                      <span className="material-icons text-sm">attach_file</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary rounded-lg w-10 h-10 min-h-10 p-0 flex items-center justify-center shadow-lg"
                      onClick={() => setIsFabOpen(false)}
                      title="Voice Input"
                      style={{ backgroundColor: customTheme.colors.buttonSecondary }}
                    >
                      <span className="material-icons text-sm">mic</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary rounded-lg w-10 h-10 min-h-10 p-0 flex items-center justify-center shadow-lg"
                      onClick={() => setIsFabOpen(false)}
                      title="Upload Image"
                      style={{ backgroundColor: customTheme.colors.buttonSecondary }}
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
                          if (module.execute) {
                            module.execute()
                          }
                          setIsFabOpen(false)
                        }}
                        title={module.name}
                        style={{ backgroundColor: customTheme.colors.buttonAccent }}
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
                  style={{ backgroundColor: customTheme.colors.buttonPrimary }}
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
