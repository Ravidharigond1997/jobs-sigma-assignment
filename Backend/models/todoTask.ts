import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

const TodoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
