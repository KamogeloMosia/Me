"use client"

import { useState, useEffect } from "react"

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showColorModal, setShowColorModal] = useState(false)
  const [uiColors, setUiColors] = useState({
    primaryColor: "#1f2937",
    accentColor: "#374151",
    successColor: "#22c55e",
    warningColor: "#f59e0b",
    errorColor: "#ef4444",
  })

  useEffect(() => {
    // Check if the user is an admin (replace with your actual logic)
    setIsAdmin(true)
  }, [])

  useEffect(() => {
    const savedColors = localStorage.getItem("uiColors")
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors)
        setUiColors(colors)
        applyColors(colors)
      } catch (error) {
        console.error("Error loading UI colors:", error)
      }
    }
  }, [])

  const handleColorChange = (colorKey: keyof typeof uiColors, value: string) => {
    const newColors = { ...uiColors, [colorKey]: value }
    setUiColors(newColors)
    applyColors(newColors)
    localStorage.setItem("uiColors", JSON.stringify(newColors))
  }

  const applyColors = (colors: typeof uiColors) => {
    const root = document.documentElement
    root.style.setProperty("--primary-color", colors.primaryColor)
    root.style.setProperty("--accent-color", colors.accentColor)
    root.style.setProperty("--success-color", colors.successColor)
    root.style.setProperty("--warning-color", colors.warningColor)
    root.style.setProperty("--error-color", colors.errorColor)
  }

  const resetColors = () => {
    const defaultColors = {
      primaryColor: "#1f2937",
      accentColor: "#374151",
      successColor: "#22c55e",
      warningColor: "#f59e0b",
      errorColor: "#ef4444",
    }
    setUiColors(defaultColors)
    applyColors(defaultColors)
    localStorage.setItem("uiColors", JSON.stringify(defaultColors))
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm border-b border-base-300">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a>About</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl" href="/">
              My App
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={() => setIsOpen(!isOpen)}>
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741702-a0cfae58b707.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className={`mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                {isAdmin && (
                  <li>
                    <a>Admin Panel</a>
                  </li>
                )}
                <li>
                  <button onClick={() => setShowColorModal(true)} className="flex items-center gap-2">
                    <span className="material-icons text-sm">palette</span>
                    UI Colors
                  </button>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h1>Chat Page</h1>
        <p>Welcome to the chat page!</p>
      </div>

      {/* UI Color Customization Modal */}
      {showColorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setShowColorModal(false)}
          />
          <div className="relative bg-base-100 rounded-lg shadow-2xl border-2 border-base-300 p-6 w-full max-w-md mx-4 z-10">
            <h3 className="font-bold text-lg mb-6 text-base-content">Customize UI Colors</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-base-content mb-2">Primary Color</label>
                <input
                  type="color"
                  value={uiColors.primaryColor}
                  onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                  className="w-full h-10 rounded-lg border border-base-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">Accent Color</label>
                <input
                  type="color"
                  value={uiColors.accentColor}
                  onChange={(e) => handleColorChange("accentColor", e.target.value)}
                  className="w-full h-10 rounded-lg border border-base-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">Success Color</label>
                <input
                  type="color"
                  value={uiColors.successColor}
                  onChange={(e) => handleColorChange("successColor", e.target.value)}
                  className="w-full h-10 rounded-lg border border-base-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">Warning Color</label>
                <input
                  type="color"
                  value={uiColors.warningColor}
                  onChange={(e) => handleColorChange("warningColor", e.target.value)}
                  className="w-full h-10 rounded-lg border border-base-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">Error Color</label>
                <input
                  type="color"
                  value={uiColors.errorColor}
                  onChange={(e) => handleColorChange("errorColor", e.target.value)}
                  className="w-full h-10 rounded-lg border border-base-300"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button className="btn btn-outline rounded-lg" onClick={resetColors}>
                Reset
              </button>
              <button className="btn btn-primary rounded-lg" onClick={() => setShowColorModal(false)}>
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
