import mongoose, { Schema, Document, Model } from "mongoose";
import { IActivityLog } from "@/types";

export interface IActivityLogDocument extends Omit<IActivityLog, "_id">, Document {}

const ActivityLogSchema: Schema = new Schema<IActivityLogDocument>(
  {
    userId: { type: String, default: "" },
    userName: { type: String, required: true },
    action: { type: String, required: true, index: true },
    entity: { type: String, required: true },
    entityId: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const ActivityLog: Model<IActivityLogDocument> =
  mongoose.models.ActivityLog || mongoose.model<IActivityLogDocument>("ActivityLog", ActivityLogSchema);

export default ActivityLog;
