import React from "react";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import SiteSettings from "@/models/SiteSettings";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalthree.dev";

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    const siteName = settings?.siteName || "DIGITAL THREE";

    return {
      title: "Selected Case Studies & Portfolio | " + siteName,
      description:
        "Explore our flagship software portfolio featuring enterprise web platforms, custom AI integrations, mobile ecosystems, and cloud architecture.",
      alternates: {
        canonical: "/portfolio",
      },
      openGraph: {
        title: "Selected Case Studies & Portfolio | " + siteName,
        description: "Showcase of enterprise software engineering and high-performance applications.",
        url: `${appUrl}/portfolio`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Selected Case Studies & Portfolio | " + siteName,
        description: "Showcase of enterprise software engineering and high-performance applications.",
      },
    };
  } catch {
    return {
      title: "Selected Case Studies & Portfolio | DIGITAL THREE",
      description: "Showcase of enterprise web platforms and custom AI solutions.",
    };
  }
}

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

  const breadcrumbs = [
    { name: "Home", item: appUrl },
    { name: "Portfolio", item: `${appUrl}/portfolio` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Navbar siteName={settings?.siteName} />
      <main className="min-h-screen bg-[#F7F7F5]">
        <PortfolioSection portfolios={portfolios} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
