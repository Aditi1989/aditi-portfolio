"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import TiltCard from "./TiltCard"

const skillGroups = [
  { title: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"] },
  { title: "Databases & Architecture", items: ["MongoDB", "PostgreSQL", "RESTful APIs", "PostGIS"] },
  { title: "Frameworks & Technologies", items: ["Next.js 15", "React.js", "Node.js", "Flask", "HTML5", "CSS3"] },
  { title: "Tools & Cloud Infrastructure", items: ["GitHub", "AWS", "Vercel", "Postman", "Figma"] },
  { title: "AI / Machine Learning", items: ["Data Analytics", "Text Processing (NLP)", "PyTorch", "Scikit-Learn", "Hugging Face Transformers"] },
  { title: "Engineering Core", items: ["Analytical Thinking", "Technical Communication", "Problem Solving", "Adaptability", "Leadership"] },
]

function Sparkles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${15 + Math.sin(i * 2.1) * 30 + 20}%`,
            left: `${10 + Math.cos(i * 1.8) * 35 + 20}%`,
            background: i % 2 === 0 ? "#7c73ff" : "#06b6d4",
            boxShadow: `0 0 6px 2px ${i % 2 === 0 ? "rgba(124,115,255,0.4)" : "rgba(6,182,212,0.4)"}`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${1.8 + (i % 3) * 0.4}s`,
          }}
        />
      ))}
    </div>
  )
}

function BentoCard({ title, items, index }: { title: string; items: string[]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <TiltCard className="glass-card rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between shimmer-border ringlight">
        <h3 className="text-[10px] font-semibold uppercase tracking-[2px] animated-gradient-text mb-4">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="group relative px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-white/[0.04] dark:to-white/[0.02] text-zinc-600 dark:text-zinc-300 border border-transparent hover:border-[#7c73ff]/30 dark:hover:border-[#8b83ff]/30 hover:shadow-[0_0_25px_var(--primary-glow)] transition-all cursor-default wiggle-hover"
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#7c73ff]/10 via-transparent to-pink-500/10 dark:from-[#8b83ff]/10 dark:to-pink-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">{item}</span>
            </span>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative mesh-bg border-y border-zinc-200/50 dark:border-white/[0.03]">
      <Sparkles count={6} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-pink-500/5 dark:bg-pink-500/8 blur-[100px] float-anim" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[3px] animated-gradient-text">
            Technical Arsenal
          </span>
          <h2 className="animated-gradient-text text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold mt-2">
            Skills &amp; Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className={i % 2 === 0 ? "md:col-span-2" : "md:col-span-1"}
            >
              <BentoCard title={group.title} items={group.items} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
