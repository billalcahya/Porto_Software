import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "@/types";

export interface IUserDocument extends Omit<IUser, "_id">, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "EDITOR"],
      default: "ADMIN",
    },
    avatar: { type: String, default: "" },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default User;
