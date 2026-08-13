import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import SiteSettings from "@/models/SiteSettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CreativeWorkJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PortfolioDetailClient } from "@/components/portfolio/PortfolioDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalthree.dev";

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const portfolio = await Portfolio.findOne({ slug: resolvedParams.slug, published: true }).lean();
    if (!portfolio) return { title: "Portfolio Not Found" };

    const pageTitle = `${portfolio.title} — ${portfolio.category} Case Study`;
    const pageDesc = portfolio.description;
    const pageUrl = `${appUrl}/portfolio/${portfolio.slug}`;
    const pageImage = portfolio.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: [portfolio.category, ...(portfolio.technologies || []), portfolio.client, "Case Study"],
      alternates: {
        canonical: `/portfolio/${portfolio.slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: pageUrl,
        type: "article",
        images: [{ url: pageImage, width: 1200, height: 630, alt: portfolio.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDesc,
        images: [pageImage],
      },
    };
  } catch {
    return { title: "DIGITAL THREE | Portfolio Case Study" };
  }
}

export const dynamic = "force-dynamic";

export default async function PortfolioDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  let portfolioDoc, settingsDoc;

  try {
    await connectDB();
    const [pDoc, sDoc] = await Promise.all([
      Portfolio.findOne({ slug: resolvedParams.slug, published: true }).lean(),
      SiteSettings.findOne().lean(),
    ]);
    portfolioDoc = pDoc;
    settingsDoc = sDoc;
  } catch (err) {
    console.warn("Portfolio detail DB offline:", err);
  }

  if (!portfolioDoc) notFound();

  const portfolio = JSON.parse(JSON.stringify(portfolioDoc));
  const settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : undefined;

  const breadcrumbs = [
    { name: "Home", item: appUrl },
    { name: "Portfolio", item: `${appUrl}/portfolio` },
    { name: portfolio.title, item: `${appUrl}/portfolio/${portfolio.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CreativeWorkJsonLd
        url={`${appUrl}/portfolio/${portfolio.slug}`}
        name={portfolio.title}
        description={portfolio.description}
        image={portfolio.thumbnail}
        category={portfolio.category}
        authorName={settings?.siteName || "DIGITAL THREE"}
      />
      <Navbar siteName={settings?.siteName} />
      <PortfolioDetailClient portfolio={portfolio} />
      <Footer settings={settings} />
    </>
  );
}
