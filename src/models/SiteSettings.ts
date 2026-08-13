import mongoose, { Schema, Document, Model } from "mongoose";
import { ISiteSettings } from "@/types";

export interface ISiteSettingsDocument extends Omit<ISiteSettings, "_id">, Document {}

const SiteSettingsSchema: Schema = new Schema<ISiteSettingsDocument>(
  {
    siteName: { type: String, default: "DIGITAL THREE" },
    tagline: { type: String, default: "Architects of Digital Superiority" },
    description: {
      type: String,
      default:
        "We build high-performance web applications, mobile platforms, and enterprise AI solutions with precision engineering.",
    },
    heroHeading: { type: String, default: "WE BUILD DIGITAL EXPERIENCES." },
    heroSubheading: {
      type: String,
      default:
        "Engineered for high performance, custom software design, scalable backend systems, and futuristic web applications.",
    },
    vision: {
      type: String,
      default:
        "To pioneer transformative digital experiences through modern engineering, artificial intelligence, and cinematic user interface design.",
    },
    mission: {
      type: String,
      default:
        "Empower businesses globally with scalable, secure, and visually stunning digital products built with state-of-the-art technology.",
    },
    values: [{ type: String }],
    contactEmail: { type: String, default: "hello@digitalthree.dev" },
    contactPhone: { type: String, default: "+1 (555) 234-5678" },
    address: { type: String, default: "Silicon Valley, San Francisco, CA" },
    socialLinks: {
      github: { type: String, default: "https://github.com" },
      linkedin: { type: String, default: "https://linkedin.com" },
      twitter: { type: String, default: "https://twitter.com" },
      instagram: { type: String, default: "https://instagram.com" },
    },
    seo: {
      metaTitle: {
        type: String,
        default: "DIGITAL THREE | Premium Software Engineering & UI/UX Studio",
      },
      metaDescription: {
        type: String,
        default: "Custom web development, mobile apps, enterprise cloud architecture, and modern AI software development.",
      },
      keywords: [{ type: String }],
      siteUrl: { type: String, default: "https://digitalthree.dev" },
      googleSiteVerification: { type: String, default: "" },
      ogImage: { type: String, default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" },
    },
    stats: {
      projectsCompleted: { type: Number, default: 120 },
      satisfiedClients: { type: Number, default: 85 },
      teamExperts: { type: Number, default: 24 },
      yearsExperience: { type: Number, default: 8 },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettingsDocument> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettingsDocument>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
