import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const MODULES_DIR = path.join(process.cwd(), "modules")

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const moduleId = params.id
    const modulePath = path.join(MODULES_DIR, moduleId)

    if (!fs.existsSync(modulePath)) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 })
    }

    fs.rmSync(modulePath, { recursive: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete module" }, { status: 500 })
  }
}
