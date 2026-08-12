import mongoose, { Schema, Document, Model } from "mongoose";
import { IBlogPost } from "@/types";

export interface IBlogPostDocument extends Omit<IBlogPost, "_id">, Document {}

const BlogPostSchema: Schema = new Schema<IBlogPostDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    author: { type: String, required: true },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
      index: true,
    },
    publishedAt: { type: Date, default: Date.now },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPostDocument> =
  mongoose.models.BlogPost || mongoose.model<IBlogPostDocument>("BlogPost", BlogPostSchema);

export default BlogPost;
