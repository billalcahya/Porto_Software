import mongoose, { Schema, Document, Model } from "mongoose";
import { IPricingPlan } from "@/types";

export interface IPricingPlanDocument extends Omit<IPricingPlan, "_id">, Document {}

const PricingPlanSchema: Schema = new Schema<IPricingPlanDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    billing: { type: String, default: "Project" },
    features: [{ type: String }],
    highlighted: { type: Boolean, default: false },
    cta: { type: String, default: "Get Started" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const PricingPlan: Model<IPricingPlanDocument> =
  mongoose.models.PricingPlan || mongoose.model<IPricingPlanDocument>("PricingPlan", PricingPlanSchema);

export default PricingPlan;
