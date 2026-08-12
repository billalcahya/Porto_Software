import mongoose, { Schema, Document, Model } from "mongoose";
import { IContactMessage } from "@/types";

export interface IContactMessageDocument extends Omit<IContactMessage, "_id">, Document {}

const ContactMessageSchema: Schema = new Schema<IContactMessageDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    company: { type: String, default: "" },
    phone: { type: String, default: "" },
    service: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["NEW", "READ", "REPLIED", "ARCHIVED"],
      default: "NEW",
      index: true,
    },
  },
  { timestamps: true }
);

export const ContactMessage: Model<IContactMessageDocument> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessageDocument>("ContactMessage", ContactMessageSchema);

export default ContactMessage;
