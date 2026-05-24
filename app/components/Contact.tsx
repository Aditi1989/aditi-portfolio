"use client"

import { useState, FormEvent } from "react"

function Sparkles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${10 + Math.sin(i * 2.2) * 35 + 20}%`,
            left: `${8 + Math.cos(i * 1.6) * 40 + 20}%`,
            background: i % 2 === 0 ? "#7c73ff" : "#f59e0b",
            boxShadow: `0 0 6px 2px ${i % 2 === 0 ? "rgba(124,115,255,0.4)" : "rgba(245,158,11,0.4)"}`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${1.7 + (i % 3) * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error")
      setErrorMsg("All fields are required.")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message")
      }
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <Sparkles count={6} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7c73ff]/5 dark:bg-[#8b83ff]/8 blur-[100px] float-anim" />
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-pink-500/5 dark:bg-pink-500/8 blur-[70px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[3px] animated-gradient-text">
            Get In Touch
          </span>
          <h2 className="animated-gradient-text text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold mt-2">
            Send a Message
          </h2>
        </div>

        <div className="max-w-lg mx-auto px-0 sm:px-4">
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-5 sm:p-8 space-y-5 shimmer-border ringlight"
          >
            <div>
              <label htmlFor="name" className="block text-xs font-medium mb-1.5 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-input text-sm text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7c73ff] dark:focus:ring-[#8b83ff] focus:shadow-[0_0_25px_var(--primary-glow)] transition-all min-h-[44px]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium mb-1.5 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-input text-sm text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7c73ff] dark:focus:ring-[#8b83ff] focus:shadow-[0_0_25px_var(--primary-glow)] transition-all min-h-[44px]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium mb-1.5 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-input text-sm text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7c73ff] dark:focus:ring-[#8b83ff] focus:shadow-[0_0_25px_var(--primary-glow)] transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#7c73ff] via-pink-500 to-cyan-500 dark:from-[#8b83ff] dark:via-pink-400 dark:to-cyan-400 bg-[length:200%_auto] animate-pulse shadow-[0_4px_20px_var(--primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_var(--primary-glow)] transition-all disabled:opacity-60 disabled:cursor-not-allowed wiggle-hover min-h-[48px]"
              style={{ animationDuration: '3s' }}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>

            {status === "success" && (
              <p className="text-xs text-emerald-500 text-center animate-pulse">
                ✨ Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400 text-center">
                {errorMsg || "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
