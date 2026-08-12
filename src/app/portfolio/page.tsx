import React from "react";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import SiteSettings from "@/models/SiteSettings";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Selected Case Studies & Portfolio | NEXUS LABS",
  description: "Explore our showcase of enterprise web applications, AI wealth platforms, cloud dashboards, and mobile applications.",
};

export const dynamic = "force-dynamic";

export default async function PublicPortfolioPage() {
  let portfolios = [], settings;
  try {
    await connectDB();
    const [portfolioDocs, settingsDoc] = await Promise.all([
      Portfolio.find({ published: true }).sort({ year: -1, order: 1 }).lean(),
      SiteSettings.findOne().lean(),
    ]);

    portfolios = JSON.parse(JSON.stringify(portfolioDocs));
    settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : undefined;
  } catch (err) {
    console.warn("Portfolio page DB offline:", err);
  }

  return (
    <>
      <Navbar siteName={settings?.siteName} />
      <main className="pt-24 min-h-screen bg-[#F7F7F5]">
        <PortfolioSection portfolios={portfolios} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
