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
            top: `${12 + Math.sin(i * 1.5) * 35 + 20}%`,
            left: `${10 + Math.cos(i * 2.0) * 38 + 20}%`,
            background: i % 2 === 0 ? "#7c73ff" : "#06b6d4",
            boxShadow: `0 0 6px 2px ${i % 2 === 0 ? "rgba(124,115,255,0.4)" : "rgba(6,182,212,0.4)"}`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${1.6 + (i % 3) * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}

function EduCard({ icon, title, subtitle, period, description }: {
  icon: string; title: string; subtitle?: string; period: string; description?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <TiltCard className="glass-card rounded-2xl p-7 sm:p-9 shimmer-border ringlight">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c73ff]/15 to-pink-500/15 dark:from-[#8b83ff]/15 dark:to-pink-300/15 flex items-center justify-center text-lg text-[#7c73ff] dark:text-[#8b83ff] mb-4">
          <i className={icon} />
        </div>
        <h3 className="text-base font-bold mb-1.5">{title}</h3>
        {subtitle && <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{subtitle}</p>}
        <p className="text-xs font-semibold animated-gradient-text mb-2.5">{period}</p>
        {description && <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>}
      </TiltCard>
    </motion.div>
  )
}

export default function Education() {
  return (
    <section id="education" className="py-24 relative mesh-bg border-y border-zinc-200/50 dark:border-white/[0.03]">
      <Sparkles count={6} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-[#7c73ff]/5 dark:bg-[#8b83ff]/8 blur-[100px] float-anim" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[3px] animated-gradient-text">
            Background
          </span>
          <h2 className="animated-gradient-text text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold mt-2">
            Education &amp; Leadership
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <EduCard
            icon="fas fa-graduation-cap"
            title="B.Tech in Computer Science &amp; Engineering"
            subtitle="Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar"
            period="2022 – 2026"
          />
          <EduCard
            icon="fas fa-hands-helping"
            title="Youth Red Cross, KIIT — Social Media Lead"
            period="Aug 2023 – Apr 2026"
            description="Spearheaded digital outreach strategy and drove measurable increases in event participation."
          />
        </div>
      </div>
    </section>
  )
}
