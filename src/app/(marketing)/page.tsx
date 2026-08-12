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

  return (
    <>
      <HeroSection settings={settings} />
      <TrustedBySection />
      <AboutSection settings={settings} />
      <ServicesSection services={services} />
      <PortfolioSection portfolios={portfolios} />
      <TechnologySection technologies={technologies} />
      <ProcessSection processSteps={processSteps} />
      <TestimonialsSection testimonials={testimonials} />
      <TeamSection teamMembers={teamMembers} />
      <PricingSection pricingPlans={pricingPlans} />
      <FAQSection faqs={faqs} />
      <ContactSection settings={settings} />
      <CTASection />
    </>
  );
}
