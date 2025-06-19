import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import AdmZip from "adm-zip"

const MODULES_DIR = path.join(process.cwd(), "modules")

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("module") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!file.name.endsWith(".zip")) {
      return NextResponse.json({ error: "File must be a ZIP archive" }, { status: 400 })
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extract ZIP
    const zip = new AdmZip(buffer)
    const entries = zip.getEntries()

    // Find and validate manifest
    const manifestEntry = entries.find((entry) => entry.entryName === "manifest.json")
    if (!manifestEntry) {
      return NextResponse.json({ error: "manifest.json not found in ZIP" }, { status: 400 })
    }

    const manifest = JSON.parse(manifestEntry.getData().toString("utf8"))

    // Validate manifest
    if (!manifest.name || !manifest.version || !manifest.entry) {
      return NextResponse.json(
        {
          error: "Invalid manifest.json - missing required fields (name, version, entry)",
        },
        { status: 400 },
      )
    }

    // Create module directory
    const moduleId = manifest.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const modulePath = path.join(MODULES_DIR, moduleId)

    if (fs.existsSync(modulePath)) {
      fs.rmSync(modulePath, { recursive: true })
    }

    fs.mkdirSync(modulePath, { recursive: true })

    // Extract all files
    zip.extractAllTo(modulePath, true)

    // Update manifest with metadata
    manifest.id = moduleId
    manifest.status = "active"
    manifest.uploadDate = new Date().toISOString()

    fs.writeFileSync(path.join(modulePath, "manifest.json"), JSON.stringify(manifest, null, 2))

    return NextResponse.json({
      success: true,
      name: manifest.name,
      id: moduleId,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: "Failed to process upload",
      },
      { status: 500 },
    )
  }
}
