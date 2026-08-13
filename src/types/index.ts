export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
  order: number;
  featured: boolean;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPortfolio {
  _id?: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  fullDescription?: string;
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  features?: string[];
  projectUrl?: string;
  githubUrl?: string;
  year: number;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITechnology {
  _id?: string;
  name: string;
  icon: string;
  category: string;
  website?: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProcessStep {
  _id?: string;
  title: string;
  description: string;
  stepNumber: number;
  icon?: string;
  deliverables?: string[];
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITestimonial {
  _id?: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
  message: string;
  rating: number;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeamMember {
  _id?: string;
  name: string;
  position: string;
  bio: string;
  avatar?: string;
  skills: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPricingPlan {
  _id?: string;
  name: string;
  description: string;
  price: string;
  billing: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  author: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: Date;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFAQ {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContactMessage {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISiteSettings {
  _id?: string;
  siteName: string;
  tagline: string;
  description: string;
  heroHeading: string;
  heroSubheading: string;
  vision: string;
  mission: string;
  values: string[];
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    siteUrl?: string;
    googleSiteVerification?: string;
    ogImage?: string;
  };
  stats: {
    projectsCompleted: number;
    satisfiedClients: number;
    teamExperts: number;
    yearsExperience: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMedia {
  _id?: string;
  filename: string;
  url: string;
  publicId?: string;
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  provider: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActivityLog {
  _id?: string;
  userId?: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  timestamp?: Date;
}
