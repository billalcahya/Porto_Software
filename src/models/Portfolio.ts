import mongoose, { Schema, Document, Model } from "mongoose";
import { IPortfolio } from "@/types";

export interface IPortfolioDocument extends Omit<IPortfolio, "_id">, Document {}

const PortfolioSchema: Schema = new Schema<IPortfolioDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    client: { type: String, required: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    thumbnail: { type: String, required: true },
    gallery: [{ type: String }],
    technologies: [{ type: String }],
    features: [{ type: String }],
    projectUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    year: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

// Delete cached model in dev mode to ensure schema updates take effect immediately
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.Portfolio;
}

export const Portfolio: Model<IPortfolioDocument> =
  mongoose.models.Portfolio || mongoose.model<IPortfolioDocument>("Portfolio", PortfolioSchema);

export default Portfolio;
