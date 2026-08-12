import mongoose, { Schema, Document, Model } from "mongoose";
import { ITechnology } from "@/types";

export interface ITechnologyDocument extends Omit<ITechnology, "_id">, Document {}

const TechnologySchema: Schema = new Schema<ITechnologyDocument>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
    website: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Technology: Model<ITechnologyDocument> =
  mongoose.models.Technology || mongoose.model<ITechnologyDocument>("Technology", TechnologySchema);

export default Technology;
