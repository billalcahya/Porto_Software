import mongoose, { Schema, Document, Model } from "mongoose";
import { IFAQ } from "@/types";

export interface IFAQDocument extends Omit<IFAQ, "_id">, Document {}

const FAQSchema: Schema = new Schema<IFAQDocument>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const FAQ: Model<IFAQDocument> =
  mongoose.models.FAQ || mongoose.model<IFAQDocument>("FAQ", FAQSchema);

export default FAQ;
