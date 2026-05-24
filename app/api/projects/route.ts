import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Project from "@/models/Project"

export async function GET() {
  try {
    await connectToDatabase()
    const projects = await Project.find({}).sort({ createdAt: -1 })
    return NextResponse.json(projects, { status: 200 })
  } catch (error) {
    console.error("GET /api/projects error:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
