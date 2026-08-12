import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().min(2, "Slug is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  icon: z.string().min(1, "Icon name is required."),
  image: z.string().optional().default(""),
  features: z.array(z.string()).default([]),
  order: z.number().default(0),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const portfolioSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().min(2, "Slug is required."),
  client: z.string().min(2, "Client name is required."),
  category: z.string().min(2, "Category is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  thumbnail: z.string().min(1, "Thumbnail URL is required."),
  gallery: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  projectUrl: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
  year: z.number().min(2000).max(2100).default(new Date().getFullYear()),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().default(0),
});

export const technologySchema = z.object({
  name: z.string().min(2, "Technology name is required."),
  icon: z.string().min(1, "Icon is required."),
  category: z.string().min(2, "Category is required."),
  website: z.string().optional().default(""),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const processStepSchema = z.object({
  title: z.string().min(2, "Title is required."),
  description: z.string().min(5, "Description is required."),
  stepNumber: z.number().min(1, "Step number is required."),
  icon: z.string().optional().default(""),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required."),
  position: z.string().min(2, "Position is required."),
  company: z.string().min(2, "Company is required."),
  avatar: z.string().optional().default(""),
  message: z.string().min(10, "Message must be at least 10 characters."),
  rating: z.number().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().default(0),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required."),
  position: z.string().min(2, "Position is required."),
  bio: z.string().min(10, "Bio is required."),
  avatar: z.string().optional().default(""),
  skills: z.array(z.string()).default([]),
  socialLinks: z
    .object({
      github: z.string().optional().default(""),
      linkedin: z.string().optional().default(""),
      twitter: z.string().optional().default(""),
    })
    .optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const pricingPlanSchema = z.object({
  name: z.string().min(2, "Plan name is required."),
  description: z.string().min(5, "Description is required."),
  price: z.string().min(1, "Price is required."),
  billing: z.string().default("Project"),
  features: z.array(z.string()).default([]),
  highlighted: z.boolean().default(false),
  cta: z.string().default("Get Started"),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z.string().min(2, "Slug is required."),
  excerpt: z.string().min(10, "Excerpt is required."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  thumbnail: z.string().min(1, "Thumbnail is required."),
  category: z.string().min(2, "Category is required."),
  tags: z.array(z.string()).default([]),
  author: z.string().min(2, "Author name is required."),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  seo: z
    .object({
      metaTitle: z.string().optional().default(""),
      metaDescription: z.string().optional().default(""),
      keywords: z.array(z.string()).default([]),
    })
    .optional(),
});

export const faqSchema = z.object({
  question: z.string().min(5, "Question is required."),
  answer: z.string().min(5, "Answer is required."),
  category: z.string().default("General"),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  company: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  service: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(10),
  heroHeading: z.string().min(2),
  heroSubheading: z.string().min(5),
  vision: z.string().min(10),
  mission: z.string().min(10),
  values: z.array(z.string()).default([]),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  address: z.string(),
  socialLinks: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
  }),
  stats: z.object({
    projectsCompleted: z.number(),
    satisfiedClients: z.number(),
    teamExperts: z.number(),
    yearsExperience: z.number(),
  }),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Valid email required."),
  password: z.string().min(6, "Password must be at least 6 characters.").optional().or(z.literal("")),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR"]).default("ADMIN"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  avatar: z.string().optional().default(""),
});
