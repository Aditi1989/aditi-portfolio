import mongoose from "mongoose"
import Project from "../models/Project"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const projects = [
  {
    title: "Fleet Pulse Real-Time IoT Fleet Monitoring System",
    date: "Jan 2026 – Apr 2026",
    description:
      "Built a full-stack IoT fleet dashboard using Next.js 15, TypeScript, Socket.IO, and PostgreSQL/PostGIS for live EV tracking and telemetry ingestion.",
    githubLink: "https://github.com/Aditi1989/fleetpulse",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    title: "Parkinson's Disease Detection via Multimodal Analysis",
    date: "Aug 2025 – Oct 2025",
    description:
      "Built a multimodal framework for early detection using a voice-based screening pipeline (MLP 94.87% accuracy) and a CNN-based approach for visual tremor features in handwriting (SVM 93.33% accuracy).",
    githubLink: "https://github.com/Aditi1989/Parkinson_disease_detection_voice-image",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
  },
  {
    title: "Customer Feedback Analysis System",
    date: "Jan 2025 – Apr 2025",
    description:
      "Built a full-stack NLP system for real-time sentiment classification using RoBERTa and VADER, deployed through a Flask REST API connected to a React.js dashboard.",
    githubLink: "https://github.com/Aditi1989/customer_feedback_system",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
]

async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("MONGODB_URI not set in .env.local")
    process.exit(1)
  }

  await mongoose.connect(uri)
  console.log("Connected to MongoDB")

  await Project.deleteMany({})
  await Project.insertMany(projects)
  console.log("Seeded projects successfully")

  await mongoose.disconnect()
  console.log("Done")
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
