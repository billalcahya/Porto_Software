import mongoose, { Schema, Document, Model } from "mongoose";
import { IMedia } from "@/types";

export interface IMediaDocument extends Omit<IMedia, "_id">, Document {}

const MediaSchema: Schema = new Schema<IMediaDocument>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    dimensions: {
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    provider: { type: String, default: "local" },
  },
  { timestamps: true }
);

export const Media: Model<IMediaDocument> =
  mongoose.models.Media || mongoose.model<IMediaDocument>("Media", MediaSchema);

export default Media;
