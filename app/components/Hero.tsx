"use client"

import { motion } from "framer-motion"
import TiltCard from "./TiltCard"

const socials = [
  { icon: "fas fa-envelope", href: "https://mail.google.com/mail/?view=cm&fs=1&to=01aditimukherjee@gmail.com", label: "Email" },
  { icon: "fas fa-phone", href: "tel:+917091622071", label: "Phone" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/aditi-mukherjee", label: "LinkedIn" },
  { icon: "fab fa-github", href: "https://github.com/Aditi1989", label: "GitHub" },
  { icon: "fab fa-instagram", href: "https://www.instagram.com/_aditi._.ie/", label: "Instagram" },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function Sparkles({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${10 + Math.sin(i * 1.7) * 35 + 20}%`,
            left: `${8 + Math.cos(i * 2.3) * 40 + 20}%`,
            background: i % 3 === 0 ? "#7c73ff" : i % 3 === 1 ? "#ec4899" : "#06b6d4",
            boxShadow: `0 0 6px 2px ${i % 3 === 0 ? "rgba(124,115,255,0.4)" : i % 3 === 1 ? "rgba(236,72,153,0.4)" : "rgba(6,182,212,0.4)"}`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${1.5 + (i % 3) * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 mesh-bg">
      <Sparkles count={10} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7c73ff]/8 dark:bg-[#8b83ff]/10 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/5 dark:bg-pink-500/8 blur-[100px] float-anim" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/8 blur-[80px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[2px] px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7c73ff]/15 via-pink-500/15 to-cyan-500/15 dark:from-[#8b83ff]/15 dark:via-pink-400/15 dark:to-cyan-400/15 text-[#7c73ff] dark:text-[#8b83ff] border border-[#7c73ff]/20 dark:border-[#8b83ff]/20 ringlight">
              <span className="text-[13px]">✨</span>
              New Milestone: Joined LTM as Graduate Engineer Trainee
            </span>
          </motion.div>

          <motion.h1 variants={item} className="animated-gradient-text text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight mb-4 break-words">
            Aditi Mukherjee
          </motion.h1>
          <motion.p variants={item} className="text-base sm:text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium mb-8 sm:mb-10 max-w-3xl mx-auto">
            Software Engineer | Full-Stack, Real-Time Systems &amp; Machine Learning
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-full lg:w-1/2"
          >
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
              Incoming Graduate Engineer Trainee at LTIMindtree and CSE graduate from KIIT. I am a highly adaptable Software Engineer bridging the gap between scalable web architectures, real-time data stream processing, and intelligent AI models. Combining hands-on enterprise experience with a diverse technical foundation, I thrive on learning emerging technologies and engineering end-to-end, data-driven solutions.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#7c73ff] to-pink-500 dark:from-[#8b83ff] dark:to-pink-400 shadow-[0_4px_20px_var(--primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_var(--primary-glow)] transition-all wiggle-hover shimmer-border min-h-[44px] flex items-center"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-lg font-semibold text-sm border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:border-[#7c73ff] dark:hover:border-[#8b83ff] hover:shadow-[0_0_20px_var(--primary-glow)] transition-all wiggle-hover min-h-[44px] flex items-center"
              >
                Contact Me
              </a>
            </div>

            <div className="flex gap-4 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel={s.label === "Email" ? "noopener noreferrer" : "noopener"}
                  aria-label={s.label}
                  className="relative w-11 h-11 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400 hover:border-[#7c73ff] dark:hover:border-[#8b83ff] hover:text-[#7c73ff] dark:hover:text-[#8b83ff] hover:-translate-y-1 hover:shadow-[0_0_20px_var(--primary-glow)] transition-all wiggle-hover"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <TiltCard className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#7c73ff]/15 via-pink-500/10 to-cyan-500/5 dark:from-[#8b83ff]/20 dark:via-pink-400/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-white/30 dark:border-white/[0.08] shadow-[0_0_60px_var(--primary-glow)] bg-white/10 dark:bg-transparent backdrop-blur-sm p-1.5 shimmer-border ringlight">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src="/aditi_birch.jpg"
                    alt="Aditi Mukherjee"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
