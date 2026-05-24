import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Message from "@/models/Message"
import { sendContactNotification } from "@/lib/mail"

export async function POST(request: NextRequest) {
  try {
    let body: { name?: string; email?: string; message?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const { name, email, message } = body

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const trimmed = { name: name.trim(), email: email.trim(), message: message.trim() }

    // Try saving to MongoDB (non-blocking — don't fail if DB is down)
    let dbSaved = false
    try {
      await connectToDatabase()
      await Message.create(trimmed)
      dbSaved = true
    } catch (dbErr) {
      console.warn("MongoDB save skipped:", dbErr instanceof Error ? dbErr.message : dbErr)
    }

    // Always try sending email notification
    let emailSent = false
    try {
      await sendContactNotification(trimmed)
      emailSent = true
    } catch (mailErr) {
      console.error("Email send failed:", mailErr instanceof Error ? mailErr.message : mailErr)
    }

    if (!dbSaved && !emailSent) {
      return NextResponse.json(
        { error: "Message received but delivery failed. Please try again later." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, dbSaved, emailSent },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/contact error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
