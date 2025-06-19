import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const MODULES_DIR = path.join(process.cwd(), "modules")

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const moduleId = params.id
    const modulePath = path.join(MODULES_DIR, moduleId)
    const manifestPath = path.join(modulePath, "manifest.json")

    if (!fs.existsSync(manifestPath)) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 })
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
    manifest.status = status

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Toggle error:", error)
    return NextResponse.json({ error: "Failed to toggle module" }, { status: 500 })
  }
}
