"use client"

import { useEffect, useState } from "react"
import TiltCard from "./TiltCard"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

interface Project {
  _id: string
  title: string
  date: string
  description: string
  githubLink: string
  imageUrl: string
}

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Fleet Pulse Real-Time IoT Fleet Monitoring System",
    date: "Jan 2026 – Apr 2026",
    description:
      "Built a full-stack IoT fleet dashboard using Next.js 15, TypeScript, Socket.IO, and PostgreSQL/PostGIS for live EV tracking and telemetry ingestion.",
    githubLink: "https://github.com/Aditi1989/fleetpulse",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    techs: ["Next.js 15", "TypeScript", "Socket.IO", "PostgreSQL", "PostGIS"],
  },
  {
    _id: "2",
    title: "Parkinson's Disease Detection via Multimodal Analysis",
    date: "Aug 2025 – Oct 2025",
    description:
      "Built a multimodal framework for early detection using a voice-based screening pipeline (MLP 94.87% accuracy) and a CNN-based approach for visual tremor features in handwriting (SVM 93.33% accuracy).",
    githubLink: "https://github.com/Aditi1989/Parkinson_disease_detection_voice-image",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    techs: ["MLP", "CNN", "SVM", "Python", "Scikit-learn"],
  },
  {
    _id: "3",
    title: "Customer Feedback Analysis System",
    date: "Jan 2025 – Apr 2025",
    description:
      "Built a full-stack NLP system for real-time sentiment classification using RoBERTa and VADER, deployed through a Flask REST API connected to a React.js dashboard.",
    githubLink: "https://github.com/Aditi1989/customer_feedback_system",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    techs: ["RoBERTa", "VADER", "Flask", "React.js", "NLP"],
  },
]

function Sparkles({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${10 + Math.sin(i * 1.3) * 38 + 20}%`,
            left: `${5 + Math.cos(i * 2.1) * 42 + 20}%`,
            background: i % 4 === 0 ? "#7c73ff" : i % 4 === 1 ? "#ec4899" : i % 4 === 2 ? "#06b6d4" : "#f59e0b",
            boxShadow: `0 0 6px 2px ${i % 4 === 0 ? "rgba(124,115,255,0.4)" : i % 4 === 1 ? "rgba(236,72,153,0.4)" : i % 4 === 2 ? "rgba(6,182,212,0.4)" : "rgba(245,158,11,0.4)"}`,
            animationDelay: `${i * 0.25}s`,
            animationDuration: `${1.5 + (i % 5) * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project & { techs?: string[] }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <TiltCard className="glass-card rounded-2xl overflow-hidden h-full flex flex-col shimmer-border ringlight">
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <span className="absolute bottom-3 left-3 text-[10px] font-medium px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white border border-white/20">
            {project.date}
          </span>
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="text-sm font-bold leading-snug mb-2.5 line-clamp-2">{project.title}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3.5 line-clamp-3 flex-1">
            {project.description}
          </p>

          {project.techs && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techs.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] text-zinc-500 dark:text-zinc-400 border border-transparent hover:border-[#7c73ff]/30 dark:hover:border-[#8b83ff]/30 hover:shadow-[0_0_15px_var(--primary-glow)] transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold animated-gradient-text hover:gap-2.5 transition-all mt-auto wiggle-hover min-h-[44px]"
          >
            <i className="fab fa-github text-[#7c73ff] dark:text-[#8b83ff]" /> View Code
          </a>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="py-24 relative mesh-bg border-y border-zinc-200/50 dark:border-white/[0.03]">
      <Sparkles count={8} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-500/5 dark:bg-violet-500/8 blur-[100px] float-anim" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-pink-500/5 dark:bg-pink-500/8 blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[3px] animated-gradient-text">
            Featured Work
          </span>
          <h2 className="animated-gradient-text text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold mt-2">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
