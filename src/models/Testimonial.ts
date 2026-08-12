import mongoose, { Schema, Document, Model } from "mongoose";
import { ITestimonial } from "@/types";

export interface ITestimonialDocument extends Omit<ITestimonial, "_id">, Document {}

const TestimonialSchema: Schema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, default: "" },
    message: { type: String, required: true },
    rating: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonialDocument> =
  mongoose.models.Testimonial || mongoose.model<ITestimonialDocument>("Testimonial", TestimonialSchema);

export default Testimonial;
