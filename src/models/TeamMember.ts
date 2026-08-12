import mongoose, { Schema, Document, Model } from "mongoose";
import { ITeamMember } from "@/types";

export interface ITeamMemberDocument extends Omit<ITeamMember, "_id">, Document {}

const TeamMemberSchema: Schema = new Schema<ITeamMemberDocument>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: { type: String, default: "" },
    skills: [{ type: String }],
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const TeamMember: Model<ITeamMemberDocument> =
  mongoose.models.TeamMember || mongoose.model<ITeamMemberDocument>("TeamMember", TeamMemberSchema);

export default TeamMember;
