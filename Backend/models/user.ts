import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  phoneNumber: string;
  password: string;
  role: "User" | "Admin";
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
});

export default mongoose.model<IUser>("User", UserSchema);
