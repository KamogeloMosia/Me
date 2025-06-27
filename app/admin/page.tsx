"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface Module {
  id: string
  name: string
  description: string
  version: string
  icon: string
  status: "active" | "inactive"
  size: string
  uploadDate: string
}

export default function AdminPage() {
  const [modules, setModules] = useState<Module[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute("data-theme", "light")
    }

    // Load modules
    loadModules()
  }, [])

  const loadModules = async () => {
    try {
      const response = await fetch("/api/modules")
      const data = await response.json()
      setModules(data)
    } catch (error) {
      console.error("Failed to load modules:", error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".zip")) {
      alert("Please upload a ZIP file")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("module", file)

    try {
      const response = await fetch("/api/modules/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Module "${result.name}" uploaded successfully!`)
        loadModules() // Reload modules list
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.message}`)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const toggleModule = async (moduleId: string, currentStatus: string) => {
    try {
      const response = await fetch(`/api/modules/${moduleId}/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: currentStatus === "active" ? "inactive" : "active" }),
      })

      if (response.ok) {
        loadModules()
      }
    } catch (error) {
      console.error("Failed to toggle module:", error)
    }
  }

  const deleteModule = async (moduleId: string) => {
    if (!confirm("Are you sure you want to delete this module?")) return

    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        loadModules()
      }
    } catch (error) {
      console.error("Failed to delete module:", error)
    }
  }

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      {/* Header */}
      <div className="navbar bg-base-100 border-b border-base-300">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost rounded-lg">
            <span className="material-icons">arrow_back</span>
            Back to Chat
          </Link>
        </div>
        <div className="navbar-center">
          <h1 className="text-xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Admin Panel
          </h1>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
            <span className="material-icons">{isDarkMode ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-6xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-primary">
              <span className="material-icons text-3xl">extension</span>
            </div>
            <div className="stat-title">Total Modules</div>
            <div className="stat-value text-primary">{modules.length}</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-success">
              <span className="material-icons text-3xl">check_circle</span>
            </div>
            <div className="stat-title">Active Modules</div>
            <div className="stat-value text-success">{modules.filter((m) => m.status === "active").length}</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-warning">
              <span className="material-icons text-3xl">storage</span>
            </div>
            <div className="stat-title">Total Size</div>
            <div className="stat-value text-warning">
              {modules.reduce((acc, m) => acc + Number.parseFloat(m.size || "0"), 0).toFixed(1)}MB
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="card bg-base-100 shadow-lg mb-8 rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <span className="material-icons">cloud_upload</span>
              Upload New Module
            </h2>
            <p className="text-base-content/70 mb-4">
              Upload a ZIP file containing your module. The ZIP should include a manifest.json file with module
              metadata.
            </p>

            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                onChange={handleFileUpload}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-lg"
                disabled={isUploading}
              />

              {isUploading && (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="text-sm">Uploading...</span>
                </div>
              )}
            </div>

            {uploadProgress > 0 && (
              <progress className="progress progress-primary w-full mt-4" value={uploadProgress} max="100"></progress>
            )}
          </div>
        </div>

        {/* Modules List */}
        <div className="card bg-base-100 shadow-lg rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <span className="material-icons">view_module</span>
              Installed Modules
            </h2>

            {modules.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-icons text-6xl text-base-content/30">extension_off</span>
                <p className="text-base-content/70 mt-4">No modules installed yet</p>
                <p className="text-sm text-base-content/50">Upload your first module to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Version</th>
                      <th>Size</th>
                      <th>Status</th>
                      <th>Upload Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <span className="material-icons text-2xl">{module.icon}</span>
                            <div>
                              <div className="font-bold">{module.name}</div>
                              <div className="text-sm opacity-50">{module.description}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-outline rounded-lg">{module.version}</span>
                        </td>
                        <td>{module.size}</td>
                        <td>
                          <span
                            className={`badge rounded-lg ${module.status === "active" ? "badge-success" : "badge-error"}`}
                          >
                            {module.status}
                          </span>
                        </td>
                        <td>{module.uploadDate}</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className={`btn btn-sm rounded-lg ${module.status === "active" ? "btn-warning" : "btn-success"}`}
                              onClick={() => toggleModule(module.id, module.status)}
                            >
                              <span className="material-icons text-sm">
                                {module.status === "active" ? "pause" : "play_arrow"}
                              </span>
                            </button>
                            <button className="btn btn-sm btn-error rounded-lg" onClick={() => deleteModule(module.id)}>
                              <span className="material-icons text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Module Development Guide */}
        <div className="card bg-base-100 shadow-lg mt-8 rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <span className="material-icons">code</span>
              Module Development Guide
            </h2>

            <div className="prose max-w-none">
              <h3>Creating a Module</h3>
              <p>To create a module, create a ZIP file with the following structure:</p>

              <div className="mockup-code rounded-lg">
                <pre>
                  <code>{`module-name.zip
├── manifest.json
├── index.js
└── assets/ (optional)
    ├── icon.png
    └── styles.css`}</code>
                </pre>
              </div>

              <h4>manifest.json</h4>
              <div className="mockup-code rounded-lg">
                <pre>
                  <code>{`{
  "name": "Module Name",
  "description": "Module description",
  "version": "1.0.0",
  "icon": "extension",
  "entry": "index.js",
  "permissions": ["chat", "ui"]
}`}</code>
                </pre>
              </div>

              <h4>index.js</h4>
              <div className="mockup-code rounded-lg">
                <pre>
                  <code>{`// Module entry point
export default {
  name: "Module Name",
  icon: "extension",
  execute: () => {
    // Module functionality
    console.log("Module executed!");
  },
  onMessage: (message) => {
    // Handle chat messages
    return message;
  }
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
