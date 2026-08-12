import mongoose, { Schema, Document, Model } from "mongoose";
import { IProcessStep } from "@/types";

export interface IProcessStepDocument extends Omit<IProcessStep, "_id">, Document {}

const ProcessStepSchema: Schema = new Schema<IProcessStepDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stepNumber: { type: Number, required: true },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const ProcessStep: Model<IProcessStepDocument> =
  mongoose.models.ProcessStep || mongoose.model<IProcessStepDocument>("ProcessStep", ProcessStepSchema);

export default ProcessStep;
