import mongoose, { Schema, Document } from "mongoose"

export interface IMessage extends Document {
  name: string
  email: string
  message: string
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema)
