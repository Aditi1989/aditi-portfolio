"use client"

import TiltCard from "./TiltCard"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

function Sparkles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${12 + Math.sin(i * 1.9) * 32 + 20}%`,
            left: `${8 + Math.cos(i * 2.5) * 38 + 20}%`,
            background: i % 3 === 0 ? "#7c73ff" : i % 3 === 1 ? "#ec4899" : "#10b981",
            boxShadow: `0 0 6px 2px ${i % 3 === 0 ? "rgba(124,115,255,0.4)" : i % 3 === 1 ? "rgba(236,72,153,0.4)" : "rgba(16,185,129,0.4)"}`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${1.6 + (i % 4) * 0.4}s`,
          }}
        />
      ))}
    </div>
  )
}

function ExpCard({
  title,
  company,
  date,
  description,
  link,
  featured,
  delay = 0,
}: {
  title: string
  company: string
  date: string
  description: string
  link?: string
  featured?: boolean
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <TiltCard
        className={`glass-card rounded-2xl p-5 sm:p-7 ${
          featured ? "border-l-4 border-l-emerald-500 shimmer-border ringlight" : "shimmer-border"
        }`}
      >
        {featured && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-gradient-to-r from-emerald-500/15 to-emerald-400/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
            <span>✨</span> Featured
          </span>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-1">
          <h3 className="text-base sm:text-lg font-bold">{title}</h3>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 rounded shrink-0 self-start sm:self-auto">
            {date}
          </span>
        </div>
        <p className="text-sm font-medium animated-gradient-text mb-3">
          {company}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          {description}
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7c73ff] dark:text-[#8b83ff] hover:gap-2.5 hover:drop-shadow-[0_0_10px_var(--primary-glow)] transition-all wiggle-hover min-h-[44px]"
          >
            <i className="fab fa-github" /> View on GitHub
          </a>
        )}
      </TiltCard>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <Sparkles count={6} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7c73ff]/5 dark:bg-[#8b83ff]/8 blur-[120px] float-anim" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/5 dark:bg-pink-500/8 blur-[80px] animate-pulse" style={{ animationDuration: '7s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[3px] animated-gradient-text">
            Career Timeline
          </span>
          <h2 className="animated-gradient-text text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold mt-2">
            Professional Experience
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <ExpCard
            featured
            title="Graduate Engineer Trainee (GET)"
            company="LTM Limited (Formerly LTIMindtree Limited)"
            date="Present"
            description="Selected through campus placement as a Graduate Engineer Trainee. Fulfilling advanced training program requirements across emerging enterprise technologies, full-stack frameworks, and scalable cloud application deployment architectures."
            delay={0}
          />

          <ExpCard
            title="Project Intern"
            company="Tata Consultancy Services (TCS)"
            date="May 2025 – Jun 2025"
            description="Engineered an end-to-end full-stack application using React.js and Python Flask that generates personalized outfit recommendations from user wardrobe data. Architected a rule-based inference engine using Python Regex and CIEDE2000 color matching to parse natural-language prompts."
            link="https://github.com/Aditi1989/get_me_look"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  )
}
