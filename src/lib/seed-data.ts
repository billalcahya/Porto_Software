import connectDB from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import User from "@/models/User";
import Service from "@/models/Service";
import Portfolio from "@/models/Portfolio";
import Technology from "@/models/Technology";
import ProcessStep from "@/models/ProcessStep";
import Testimonial from "@/models/Testimonial";
import TeamMember from "@/models/TeamMember";
import PricingPlan from "@/models/PricingPlan";
import BlogPost from "@/models/BlogPost";
import FAQ from "@/models/FAQ";
import SiteSettings from "@/models/SiteSettings";

export async function seedDatabase() {
  await connectDB();

  // 1. Admin User
  const adminExists = await User.findOne({ email: "admin@softwarehouse.com" });
  if (!adminExists) {
    const hashedPassword = await hashPassword("admin123");
    await User.create({
      name: "Alex Vance",
      email: "admin@softwarehouse.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      status: "ACTIVE",
    });
  }

  // 2. Site Settings
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      siteName: "NEXUS LABS",
      tagline: "Architects of Next-Gen Software & AI Systems",
      description:
        "We engineer high-performance web applications, cloud infrastructure, AI models, and mobile platforms with cinematic UI design and zero compromise on security.",
      heroHeading: "WE ENGINE DIGITAL SUPERIORITY.",
      heroSubheading:
        "Custom enterprise web architecture, AI systems integration, and bespoke mobile engineering tailored for high-growth enterprises.",
      vision:
        "To pioneer transformative digital experiences through modern software engineering, artificial intelligence, and world-class UI motion design.",
      mission:
        "Empower businesses globally with scalable, secure, and visually stunning digital products built with state-of-the-art tech.",
      values: [
        "Uncompromising Engineering Precision",
        "Cinematic User Experience",
        "Predictable & Scalable Architecture",
        "Continuous AI Integration",
      ],
      contactEmail: "hello@nexuslabs.dev",
      contactPhone: "+1 (800) 458-9210",
      address: "One Market Tower, Suite 2400, San Francisco, CA 94105",
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
      stats: {
        projectsCompleted: 148,
        satisfiedClients: 92,
        teamExperts: 28,
        yearsExperience: 9,
      },
    });
  }

  // 3. Services (5 services)
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      {
        title: "Full-Stack Web Platforms",
        slug: "full-stack-web-platforms",
        description:
          "High-throughput, reactive Next.js and React applications built with microservices architecture, serverless infrastructure, and edge caching.",
        icon: "Code2",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        features: [
          "Next.js App Router Architecture",
          "Real-time Data Synchronization",
          "Sub-second Page Load & Performance",
          "Automated CI/CD Pipelines",
        ],
        order: 1,
        featured: true,
        published: true,
      },
      {
        title: "Mobile App Ecosystems",
        slug: "mobile-app-ecosystems",
        description:
          "Cross-platform iOS and Android applications developed with React Native & Flutter, delivering native performance and fluid 60fps animations.",
        icon: "Smartphone",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        features: [
          "Native iOS & Android Deployment",
          "Offline-First Data Storage",
          "Biometric Security & Push Notifications",
          "App Store & Play Store Publishing",
        ],
        order: 2,
        featured: true,
        published: true,
      },
      {
        title: "Enterprise AI & LLM Solutions",
        slug: "enterprise-ai-llm-solutions",
        description:
          "Custom RAG pipelines, fine-tuned AI agents, natural language vector search, and predictive machine learning models seamlessly integrated into your workflows.",
        icon: "Cpu",
        image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        features: [
          "Custom RAG & Vector Embeddings",
          "LLM Fine-tuning & Optimization",
          "Automated Workflow Agents",
          "Data Privacy & On-Premise Hosting",
        ],
        order: 3,
        featured: true,
        published: true,
      },
      {
        title: "Cloud Architecture & DevOps",
        slug: "cloud-architecture-devops",
        description:
          "Resilient multi-cloud infrastructure on AWS/GCP with Kubernetes, Terraform IaC, serverless databases, zero-downtime deployments, and SOC2 compliance.",
        icon: "Cloud",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        features: [
          "Infrastructure as Code (Terraform)",
          "Kubernetes & Container Orchestration",
          "24/7 Monitoring & Incident Response",
          "Cost Optimization & Auto-scaling",
        ],
        order: 4,
        featured: false,
        published: true,
      },
      {
        title: "UI/UX & Motion Design Studio",
        slug: "ui-ux-motion-design-studio",
        description:
          "Immersive dark-futuristic UI design systems, interactive 3D web graphics, liquid glass effects, and motion prototypes that captivate users.",
        icon: "Layers",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        features: [
          "Bespoke Design Systems",
          "Framer Motion & GSAP Animations",
          "User Journey & Heuristic Testing",
          "Figma Component Libraries",
        ],
        order: 5,
        featured: true,
        published: true,
      },
    ]);
  }

  // 4. Technologies (6 technologies)
  const techCount = await Technology.countDocuments();
  if (techCount === 0) {
    await Technology.insertMany([
      { name: "Next.js 16", icon: "Boxes", category: "Frontend Framework", website: "https://nextjs.org", order: 1, published: true },
      { name: "TypeScript", icon: "FileCode", category: "Language", website: "https://typescriptlang.org", order: 2, published: true },
      { name: "MongoDB", icon: "Database", category: "Database", website: "https://mongodb.com", order: 3, published: true },
      { name: "Tailwind CSS", icon: "Palette", category: "Styling", website: "https://tailwindcss.com", order: 4, published: true },
      { name: "Framer Motion", icon: "Sparkles", category: "Animation", website: "https://framer.com/motion", order: 5, published: true },
      { name: "Docker & AWS", icon: "Server", category: "Infrastructure", website: "https://aws.amazon.com", order: 6, published: true },
    ]);
  }

  // 5. Portfolios (4 projects)
  const portfolioCount = await Portfolio.countDocuments();
  if (portfolioCount === 0) {
    await Portfolio.insertMany([
      {
        title: "Aura Capital — AI Wealth Management Platform",
        slug: "aura-capital-ai-wealth-management",
        client: "Aura Global Financials",
        category: "Fintech & AI",
        description:
          "An enterprise algorithmic trading and portfolio management suite powered by real-time neural network predictions, managing $1.2B in assets under management.",
        thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        ],
        technologies: ["Next.js", "Python", "MongoDB", "Tailwind CSS", "WebSockets"],
        projectUrl: "https://example.com/auracapital",
        githubUrl: "https://github.com",
        year: 2025,
        featured: true,
        published: true,
        order: 1,
      },
      {
        title: "Vortex Cloud — Decentralized Infrastructure Dashboard",
        slug: "vortex-cloud-decentralized-dashboard",
        client: "Vortex Networks",
        category: "Cloud Architecture",
        description:
          "A sleek dark-mode control panel providing sub-millisecond telemetry monitoring, automated node deployment, and bandwidth analytics across 40 worldwide data centers.",
        thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        ],
        technologies: ["React", "TypeScript", "Go", "Docker", "GraphQL"],
        projectUrl: "https://example.com/vortex",
        githubUrl: "",
        year: 2025,
        featured: true,
        published: true,
        order: 2,
      },
      {
        title: "OmniHealth — Connected Telemedicine App",
        slug: "omnihealth-connected-telemedicine-app",
        client: "HealthCorp Global",
        category: "Healthcare & Mobile",
        description:
          "HIPAA-compliant mobile telemedicine portal with encrypted video consultations, vital monitoring wearable integration, and AI-assisted triage.",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        ],
        technologies: ["React Native", "Node.js", "WebRTC", "PostgreSQL"],
        projectUrl: "https://example.com/omnihealth",
        githubUrl: "",
        year: 2024,
        featured: true,
        published: true,
        order: 3,
      },
      {
        title: "CyberPulse — Real-Time Threat Intelligence",
        slug: "cyberpulse-threat-intelligence",
        client: "Pulse Security Systems",
        category: "Cybersecurity",
        description:
          "Military-grade threat mapping software displaying automated intrusion prevention alerts, live packet analysis, and zero-day anomaly detection.",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        ],
        technologies: ["Next.js", "Three.js", "Tailwind CSS", "MongoDB"],
        projectUrl: "https://example.com/cyberpulse",
        githubUrl: "",
        year: 2024,
        featured: true,
        published: true,
        order: 4,
      },
    ]);
  }

  // 6. Process Steps Workflow
  const processCount = await ProcessStep.countDocuments();
  if (processCount === 0) {
    await ProcessStep.insertMany([
      { title: "Discovery", description: "Deep dive into project scope, business KPIs, security compliance, and user personas.", stepNumber: 1, icon: "Search", order: 1, published: true },
      { title: "Strategy", description: "Architectural blueprinting, database schema design, stack selection, and milestone roadmap.", stepNumber: 2, icon: "Compass", order: 2, published: true },
      { title: "Design", description: "High-fidelity liquid glass UI mockups, interactive prototypes, micro-animations, and design system.", stepNumber: 3, icon: "Figma", order: 3, published: true },
      { title: "Development", description: "Sprint-based modular coding using Next.js Server Components, TypeScript strict mode, and CI/CD.", stepNumber: 4, icon: "Code", order: 4, published: true },
      { title: "Testing", description: "Rigorous end-to-end testing, security penetration audits, accessibility check, and load testing.", stepNumber: 5, icon: "CheckCircle2", order: 5, published: true },
      { title: "Deployment", description: "Zero-downtime multi-region cloud deployment with SSL, CDN caching, and automated backups.", stepNumber: 6, icon: "Rocket", order: 6, published: true },
      { title: "Maintenance", description: "24/7 uptime monitoring, security updates, feature iterations, and performance tuning.", stepNumber: 7, icon: "ShieldCheck", order: 7, published: true },
    ]);
  }

  // 7. Testimonials (3 testimonials)
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        name: "Marcus Sterling",
        position: "Chief Technology Officer",
        company: "Aura Global Financials",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        message:
          "NEXUS delivered our AI wealth platform 3 weeks ahead of schedule. The liquid glass UI design and real-time execution speeds wowed our board of directors.",
        rating: 5,
        featured: true,
        published: true,
        order: 1,
      },
      {
        name: "Elena Rostova",
        position: "VP of Product",
        company: "Vortex Networks",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        message:
          "Working with NEXUS felt like extending our internal core team with world-class engineers. Their Next.js and Cloud architecture expertise is second to none.",
        rating: 5,
        featured: true,
        published: true,
        order: 2,
      },
      {
        name: "David Chen",
        position: "Founder & CEO",
        company: "OmniHealth Systems",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        message:
          "The level of detail in their code, responsive layout execution, and security protocols exceeded our highest expectations. Absolutely phenomenal work.",
        rating: 5,
        featured: true,
        published: true,
        order: 3,
      },
    ]);
  }

  // 8. Team Members (4 team members)
  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany([
      {
        name: "Alex Vance",
        position: "Founder & Principal Architect",
        bio: "Former Principal Architect at Google Cloud with 12+ years building enterprise microservices and reactive Next.js systems.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        skills: ["System Architecture", "Next.js", "Distributed Systems", "AI Agents"],
        socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
        order: 1,
        published: true,
      },
      {
        name: "Sophia Martinez",
        position: "Lead UI/UX & Motion Engineer",
        bio: "Award-winning motion designer specializing in dark futuristic interfaces, WebGL shader effects, and Framer Motion micro-interactions.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        skills: ["Figma Design System", "Framer Motion", "Tailwind CSS", "GSAP"],
        socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
        order: 2,
        published: true,
      },
      {
        name: "Viktor Ivanov",
        position: "Head of AI & Cloud Engineering",
        bio: "Specialist in enterprise RAG pipelines, fine-tuning LLMs, vector database optimization, and Kubernetes cluster orchestration.",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
        skills: ["Python & PyTorch", "LangChain & LlamaIndex", "AWS & GCP", "MongoDB"],
        socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
        order: 3,
        published: true,
      },
      {
        name: "Sarah Jenkins",
        position: "Senior Fullstack Engineer",
        bio: "Fullstack JavaScript wizard passionate about clean code architecture, Server Actions optimization, and bulletproof security.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        skills: ["React 19", "TypeScript", "Node.js", "GraphQL"],
        socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
        order: 4,
        published: true,
      },
    ]);
  }

  // 9. Pricing Plans (3 plans)
  const pricingCount = await PricingPlan.countDocuments();
  if (pricingCount === 0) {
    await PricingPlan.insertMany([
      {
        name: "MVP Launchpad",
        description: "Perfect for early-stage startups needing a production-ready application shipped in weeks.",
        price: "$8,500",
        billing: "per project",
        features: [
          "Custom Next.js & Tailwind CSS App",
          "MongoDB Database & Content CMS",
          "Responsive Dark & Light Mode",
          "Core Motion & Scroll Animations",
          "4 Weeks Delivery Window",
        ],
        highlighted: false,
        cta: "Start MVP Project",
        order: 1,
        published: true,
      },
      {
        name: "Enterprise Scale",
        description: "Comprehensive software engineering solution for high-growth enterprises and scaled platforms.",
        price: "$18,500",
        billing: "per project",
        features: [
          "Full Custom Web & Mobile Ecosystem",
          "AI Agent or LLM RAG Integration",
          "Advanced Admin CMS & Role Access",
          "Cinematic Liquid UI & GSAP Motion",
          "Dedicated DevOps & Cloud Setup",
          "Priority 24/7 SLA Maintenance",
        ],
        highlighted: true,
        cta: "Build Enterprise System",
        order: 2,
        published: true,
      },
      {
        name: "Dedicated Squad",
        description: "Full senior engineering team embedded in your organization with flexible monthly allocation.",
        price: "$14,000",
        billing: "per month",
        features: [
          "Dedicated Senior Fullstack Team",
          "Direct Slack & Daily Standups",
          "Un-capped Feature Development",
          "Security Audits & CI/CD Pipeline",
          "Cancel or pause anytime",
        ],
        highlighted: false,
        cta: "Hire Dedicated Team",
        order: 3,
        published: true,
      },
    ]);
  }

  // 10. FAQ (6 FAQs)
  const faqCount = await FAQ.countDocuments();
  if (faqCount === 0) {
    await FAQ.insertMany([
      {
        question: "How long does a typical software project take from start to finish?",
        answer: "A standard MVP development cycle takes between 4 to 6 weeks. Enterprise systems with custom AI pipelines, extensive cloud infrastructure, or multi-platform native mobile apps range between 8 to 14 weeks depending on scope complexity.",
        category: "Timeline & Process",
        order: 1,
        published: true,
      },
      {
        question: "Will I have full ownership of the source code and intellectual property?",
        answer: "Yes, 100%. Upon completion and project sign-off, full intellectual property, source repositories, database credentials, and design assets are transferred entirely to your organization.",
        category: "Ownership",
        order: 2,
        published: true,
      },
      {
        question: "What technology stack do you specialize in?",
        answer: "We focus on Next.js 16 App Router, TypeScript, React 19, Tailwind CSS, Framer Motion, Node.js, MongoDB, PostgreSQL, Python (AI/LLM pipelines), React Native, and AWS/GCP cloud environments.",
        category: "Technology",
        order: 3,
        published: true,
      },
      {
        question: "Can we update landing page content and portfolio items ourselves later?",
        answer: "Absoloutely. Every solution we deliver comes with a custom, secure Admin CMS built specifically for your team to manage content, team profiles, service offerings, case studies, blog posts, and site settings without touching code.",
        category: "CMS & Admin",
        order: 4,
        published: true,
      },
      {
        question: "How do you handle application security and data privacy?",
        answer: "Security is baked into every phase. We enforce strict TypeScript typing, password hashing with bcrypt, secure HTTP-only cookie sessions, Zod input validation, sanitization against XSS/SQL injection, and OWASP compliance standards.",
        category: "Security",
        order: 5,
        published: true,
      },
      {
        question: "Do you offer post-launch maintenance and technical support?",
        answer: "Yes. We offer continuous SLA maintenance plans covering zero-downtime server monitoring, security patching, dependency upgrades, monthly analytics reviews, and feature expansions.",
        category: "Support",
        order: 6,
        published: true,
      },
    ]);
  }

  // 11. Blog Posts (4 posts)
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany([
      {
        title: "Architecting Next.js 16 Applications for Extreme Scale",
        slug: "architecting-nextjs-16-applications-extreme-scale",
        excerpt: "Discover modern patterns for building sub-second serverless Next.js applications using Server Components, incremental revalidation, and intelligent database pooling.",
        content: `
# Architecting Next.js 16 Applications for Extreme Scale

Building web applications in 2026 demands a shift towards reactive server-driven architecture. With Next.js 16 App Router maturing, engineers have powerful tools to render UI at edge speed.

## 1. Prioritize React Server Components (RSC)
By shifting data fetch operations directly into Server Components, client-side JavaScript bundles are minimized by up to 70%.

\`\`\`tsx
// Example Server Component Pattern
export default async function DashboardData() {
  const data = await getAnalytics();
  return <AnalyticsViewer data={data} />;
}
\`\`\`

## 2. Database Connection Pooling in Serverless Environments
In serverless environments like Vercel or AWS Lambda, reusing Mongoose or PostgreSQL connection instances prevents socket exhaustion under heavy concurrent load.

## 3. Micro-Animations with Reduced Overhead
Utilize CSS hardware-accelerated transforms and Framer Motion \`layoutId\` to achieve liquid UI transitions without causing layout re-paints.
        `,
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        category: "Engineering",
        tags: ["Next.js", "React", "Architecture", "Performance"],
        author: "Alex Vance",
        status: "PUBLISHED",
        publishedAt: new Date("2026-02-10"),
        seo: {
          metaTitle: "Architecting Next.js 16 Applications for Scale",
          metaDescription: "Learn how to build high-scale Next.js applications with Server Components and efficient database pooling.",
          keywords: ["Next.js", "App Router", "Performance", "Web Architecture"],
        },
      },
      {
        title: "Integrating Enterprise RAG Systems with Custom Vector Databases",
        slug: "integrating-enterprise-rag-systems-vector-databases",
        excerpt: "A technical guide to enhancing AI agent accuracy by indexing domain-specific documentation into high-dimensional vector embeddings.",
        content: `
# Integrating Enterprise RAG Systems with Custom Vector Databases

Retrieval-Augmented Generation (RAG) bridges the gap between static Large Language Models and real-time private enterprise knowledge bases.

## The Key Building Blocks
1. **Document Chunking & Normalization**: Parsing Markdown, PDFs, and API specs into semantic segments.
2. **Embedding Generation**: Vectorizing content with high-accuracy embedding models.
3. **Hybrid Search**: Combining vector similarity with BM25 keyword matching for optimal recall.

> "A well-architected RAG pipeline turns raw corporate data into actionable AI insights while keeping data strictly within your private perimeter."
        `,
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        category: "Artificial Intelligence",
        tags: ["AI", "LLM", "Vector DB", "Python"],
        author: "Viktor Ivanov",
        status: "PUBLISHED",
        publishedAt: new Date("2026-02-04"),
        seo: {
          metaTitle: "Enterprise RAG Systems & Vector DB Guide",
          metaDescription: "Step-by-step technical guide to integrating RAG pipelines in enterprise environments.",
          keywords: ["RAG", "AI", "Vector DB", "LLM"],
        },
      },
      {
        title: "The Art of Cinematic Liquid Glass UI in Modern Web Design",
        slug: "art-of-cinematic-liquid-glass-ui-modern-web-design",
        excerpt: "Explore how subtle grain textures, glowing CSS backdrop-blurs, and responsive motion turn standard UI into a luxury brand experience.",
        content: `
# The Art of Cinematic Liquid Glass UI

Modern web design has evolved beyond flat minimal layouts. Tech leaders are embracing dark futuristic visuals, liquid glass cards, and immersive motion.

## Key Design System Elements
- **Backdrop Blur & Noise Layers**: Subtly blurring background content with \`backdrop-filter: blur(20px)\` combined with a 2% SVG noise texture overlay.
- **Aurora Gradients**: Multi-layered radial gradients animating gracefully in the background.
- **Sophisticated Spacing**: Generous padding and crisp typography hierarchy.
        `,
        thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        category: "UI/UX & Motion",
        tags: ["Design System", "Tailwind CSS", "Framer Motion", "UX"],
        author: "Sophia Martinez",
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-25"),
        seo: {
          metaTitle: "Cinematic Liquid Glass UI Design Guide",
          metaDescription: "Master the principles of liquid glass UI design and dark futuristic aesthetics.",
          keywords: ["UI/UX", "Glassmorphism", "Tailwind CSS", "Web Design"],
        },
      },
      {
        title: "Zero-Trust Security & Input Validation in Fullstack Next.js",
        slug: "zero-trust-security-input-validation-nextjs",
        excerpt: "Protecting Server Actions and API endpoints against XSS, injection attacks, and unauthorized state mutation using Zod and secure sessions.",
        content: `
# Zero-Trust Security in Fullstack Next.js

As Server Actions make fullstack development seamless, securing server endpoints is more critical than ever.

## Security Checklist
1. **Never Trust Client Inputs**: Always run strict Zod schema validation inside Server Actions.
2. **Authorize User Roles**: Validate session token payload and check role permissions before executing any database mutation.
3. **Sanitize Rendered Content**: Strip HTML script tags to prevent Cross-Site Scripting (XSS).
        `,
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        category: "Security",
        tags: ["Security", "Zod", "Next.js", "Auth"],
        author: "Sarah Jenkins",
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-18"),
        seo: {
          metaTitle: "Zero-Trust Security in Next.js Server Actions",
          metaDescription: "How to secure fullstack Next.js applications against common vulnerabilities.",
          keywords: ["Security", "Zod", "Next.js", "Authentication"],
        },
      },
    ]);
  }

  return { success: true, message: "Database seeded successfully with professional data." };
}
