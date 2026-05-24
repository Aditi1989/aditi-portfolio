"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./ThemeProvider"

const links = ["Home", "Skills", "Experience", "Projects", "Education", "Contact"]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset
      if (current > 80) {
        setVisible(current < lastScroll)
      } else {
        setVisible(true)
      }
      setLastScroll(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScroll])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 glass h-16 px-4 sm:px-8 lg:px-16 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <span className="text-lg font-extrabold tracking-widest animated-gradient-text">
            AM
          </span>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#7c73ff] dark:hover:text-[#8b83ff] transition-all relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#7c73ff] after:via-pink-400 after:to-cyan-400 after:transition-all hover:after:w-full wiggle-hover"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg border border-white/20 dark:border-white/[0.06] flex items-center justify-center text-sm hover:bg-white/20 dark:hover:bg-white/5 hover:shadow-[0_0_20px_var(--primary-glow)] transition-all wiggle-hover"
              aria-label="Toggle theme"
            >
              <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"} text-zinc-500 dark:text-zinc-400`} />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-1 md:hidden bg-none border-none cursor-pointer p-1"
              aria-label="Menu"
            >
              <span className={`block w-5 h-[2px] bg-zinc-600 dark:bg-zinc-300 rounded transition-transform duration-300 ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-5 h-[2px] bg-zinc-600 dark:bg-zinc-300 rounded transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[2px] bg-zinc-600 dark:bg-zinc-300 rounded transition-transform duration-300 ${open ? "-rotate-45 translate-y-[-5px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 glass border-l border-white/20 dark:border-white/[0.06] transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-24 px-8 gap-1">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#7c73ff] dark:hover:text-[#8b83ff] py-3 border-b border-white/10 dark:border-white/[0.04] transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
