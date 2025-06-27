import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const MODULES_DIR = path.join(process.cwd(), "modules")

// Ensure modules directory exists
if (!fs.existsSync(MODULES_DIR)) {
  fs.mkdirSync(MODULES_DIR, { recursive: true })
}

export async function GET() {
  try {
    const modules = []
    const moduleFiles = fs.readdirSync(MODULES_DIR)

    for (const moduleDir of moduleFiles) {
      const modulePath = path.join(MODULES_DIR, moduleDir)
      const manifestPath = path.join(modulePath, "manifest.json")

      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
        const stats = fs.statSync(modulePath)

        modules.push({
          id: moduleDir,
          name: manifest.name,
          description: manifest.description,
          version: manifest.version,
          icon: manifest.icon || "extension",
          status: manifest.status || "active",
          size: `${(getDirectorySize(modulePath) / 1024 / 1024).toFixed(2)}MB`,
          uploadDate: stats.mtime.toLocaleDateString(),
        })
      }
    }

    return NextResponse.json(modules)
  } catch (error) {
    console.error("Error loading modules:", error)
    return NextResponse.json({ error: "Failed to load modules" }, { status: 500 })
  }
}

function getDirectorySize(dirPath: string): number {
  let size = 0
  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      size += getDirectorySize(filePath)
    } else {
      size += stats.size
    }
  }

  return size
}
