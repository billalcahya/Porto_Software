import mongoose, { Schema, Document, Model } from "mongoose";
import { IService } from "@/types";

export interface IServiceDocument extends Omit<IService, "_id">, Document {}

const ServiceSchema: Schema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String, default: "" },
    features: [{ type: String }],
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Service: Model<IServiceDocument> =
  mongoose.models.Service || mongoose.model<IServiceDocument>("Service", ServiceSchema);

export default Service;
