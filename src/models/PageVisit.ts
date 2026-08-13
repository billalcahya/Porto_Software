import mongoose, { Schema, Document } from "mongoose";

export interface IPageVisit extends Document {
  path: string;
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  userAgent?: string;
  dateString: string; // YYYY-MM-DD
  timestamp: Date;
}

const PageVisitSchema: Schema = new Schema(
  {
    path: { type: String, required: true, index: true },
    ip: { type: String, default: "127.0.0.1", index: true },
    city: { type: String, default: "Jakarta", index: true },
    country: { type: String, default: "Indonesia", index: true },
    countryCode: { type: String, default: "ID" },
    userAgent: { type: String },
    dateString: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// Indexes for high-performance aggregations
PageVisitSchema.index({ dateString: 1, ip: 1 });
PageVisitSchema.index({ city: 1, country: 1 });
PageVisitSchema.index({ timestamp: -1 });

export default mongoose.models.PageVisit || mongoose.model<IPageVisit>("PageVisit", PageVisitSchema);
