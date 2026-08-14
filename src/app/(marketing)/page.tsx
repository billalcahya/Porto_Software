import React from "react";
import connectDB from "@/lib/db";
import { seedDatabase } from "@/lib/seed-data";
import SiteSettings from "@/models/SiteSettings";
import Service from "@/models/Service";
import Portfolio from "@/models/Portfolio";
import Technology from "@/models/Technology";
import ProcessStep from "@/models/ProcessStep";
import Testimonial from "@/models/Testimonial";
import TeamMember from "@/models/TeamMember";
import PricingPlan from "@/models/PricingPlan";
import FAQ from "@/models/FAQ";

import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { CinematicTicker } from "@/components/animations/CinematicTicker";
import { FaqJsonLd } from "@/components/seo/JsonLd";

import { DetailShaderCanvas } from "@/components/webgl/DetailShaderCanvas";
import { AnimatedGeometryBackground } from "@/components/webgl/AnimatedGeometryBackground";

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    if (!settings) return {};

    const title = settings.seo?.metaTitle || settings.siteName || "DIGITAL THREE";
    const description = settings.seo?.metaDescription || settings.description;
    const keywords = settings.seo?.keywords || [];
    const ogImage = settings.seo?.ogImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title,
        description,
        url: settings.seo?.siteUrl || "/",
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: "DIGITAL THREE",
      description: "High-performance software engineering, AI LLM integrations, and custom cloud solutions.",
    };
  }
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let settings, services = [], portfolios = [], technologies = [], processSteps = [], testimonials = [], teamMembers = [], pricingPlans = [], faqs = [];

  try {
    await connectDB();

    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await seedDatabase();
    }

    const [settingsDoc, servicesDocs, portfolioDocs, techDocs, processDocs, testimonialDocs, teamDocs, pricingDocs, faqDocs] =
      await Promise.all([
        SiteSettings.findOne().lean(),
        Service.find({ published: true }).sort({ order: 1 }).lean(),
        Portfolio.find({ published: true, featured: true }).sort({ order: 1 }).lean(),
        Technology.find({ published: true }).sort({ order: 1 }).lean(),
        ProcessStep.find({ published: true }).sort({ stepNumber: 1 }).lean(),
        Testimonial.find({ published: true }).sort({ order: 1 }).lean(),
        TeamMember.find({ published: true }).sort({ order: 1 }).lean(),
        PricingPlan.find({ published: true }).sort({ order: 1 }).lean(),
        FAQ.find({ published: true }).sort({ order: 1 }).lean(),
      ]);

    settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : undefined;
    services = JSON.parse(JSON.stringify(servicesDocs));
    portfolios = JSON.parse(JSON.stringify(portfolioDocs));
    technologies = JSON.parse(JSON.stringify(techDocs));
    processSteps = JSON.parse(JSON.stringify(processDocs));
    testimonials = JSON.parse(JSON.stringify(testimonialDocs));
    teamMembers = JSON.parse(JSON.stringify(teamDocs));
    pricingPlans = JSON.parse(JSON.stringify(pricingDocs));
    faqs = JSON.parse(JSON.stringify(faqDocs));
  } catch (err) {
    console.warn("Database connection offline during rendering, using fallbacks:", err);
  }

  const faqItems = faqs.map((f: { question: string; answer: string }) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <>
      <FaqJsonLd faqs={faqItems} />
      <HeroSection settings={settings} />
      <TrustedBySection />
      <CinematicTicker />
      <AboutSection settings={settings} />
      <ServicesSection services={services} />
      <PortfolioSection portfolios={portfolios} />
      <TechnologySection technologies={technologies} />
      <ProcessSection processSteps={processSteps} />
      <TestimonialsSection testimonials={testimonials} />
      <TeamSection teamMembers={teamMembers} />
      <PricingSection pricingPlans={pricingPlans} />
      
      {/* Unified Continuous WebGL GLSL Liquid Silk Shader Container for FAQ + Contact */}
      <div className="relative overflow-hidden bg-[#F7F7F5] border-t border-black/5">
        {/* Single Continuous WebGL GLSL Shader Canvas */}
        <DetailShaderCanvas />

        {/* Tech Blueprint Dot Grid Pattern */}
        <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none z-0" />

        {/* 3D Blueprint Wireframe SVG Geometry Suite */}
        <AnimatedGeometryBackground />

        {/* Continuous Ambient Glow Orbs */}
        <div className="orb-glow w-176 h-176 bg-sky-400/25 top-10 left-[5%] pointer-events-none" />
        <div className="orb-glow w-152 h-152 bg-lime-400/25 top-1/3 right-[3%] pointer-events-none" />
        <div className="orb-glow w-2xl h-168 bg-cyan-400/20 bottom-10 left-[10%] pointer-events-none" />

        <div className="relative z-10">
          <FAQSection faqs={faqs} isEmbedded />
          <ContactSection settings={settings} isEmbedded />
        </div>
      </div>

      <CinematicTicker />
      <CTASection />
    </>
  );
}
