import mongoose, { Schema, Document } from "mongoose"

export interface IProject extends Document {
  title: string
  date: string
  description: string
  githubLink: string
  imageUrl: string
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    githubLink: { type: String, required: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
)

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)
