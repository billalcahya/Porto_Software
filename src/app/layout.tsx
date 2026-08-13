import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageLoader } from "@/components/animations/PageLoader";
import { GsapScrollProgress } from "@/components/animations/GsapScrollProgress";
import { LanguageProvider } from "@/context/LanguageContext";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

import { VisitorTracker } from "@/components/analytics/VisitorTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalthree.dev";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    await connectDB();
    const settingsDoc = await SiteSettings.findOne().lean();
    if (settingsDoc) {
      settings = JSON.parse(JSON.stringify(settingsDoc));
    }
  } catch (err) {
    console.warn("Layout metadata DB offline:", err);
  }

  const siteName = settings?.siteName || "DIGITAL THREE";
  const siteUrl = settings?.seo?.siteUrl || defaultAppUrl;
  const title = settings?.seo?.metaTitle || `${siteName} | Software House & Enterprise AI Studio`;
  const description =
    settings?.seo?.metaDescription ||
    settings?.description ||
    "We engineer high-performance web applications, cloud architecture, custom AI LLM models, and mobile platforms.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: settings?.seo?.keywords || [
      "Software House",
      "Enterprise AI",
      "Next.js Development",
      "WebGL Agency",
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: siteUrl,
      title,
      description,
      siteName,
      images: [
        {
          url: settings?.seo?.ogImage || `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@digitalthree",
      images: [settings?.seo?.ogImage || `${siteUrl}/og-image.jpg`],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    await connectDB();
    const settingsDoc = await SiteSettings.findOne().lean();
    if (settingsDoc) {
      settings = JSON.parse(JSON.stringify(settingsDoc));
    }
  } catch (err) {
    console.warn("RootLayout settings fetch error:", err);
  }

  const siteName = settings?.siteName || "DIGITAL THREE";
  const siteUrl = settings?.seo?.siteUrl || defaultAppUrl;
  const description = settings?.description || "Software House & Enterprise AI Studio";
  const address = settings?.contactInfo?.address || "Jakarta, Indonesia";
  const email = settings?.contactInfo?.email || "hello@digitalthree.dev";
  const phone = settings?.contactInfo?.phone || "+62 812-3456-7890";
  const socialLinks = settings?.socialLinks
    ? [
        settings.socialLinks.github,
        settings.socialLinks.linkedin,
        settings.socialLinks.twitter,
        settings.socialLinks.instagram,
      ].filter(Boolean)
    : [];

  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f0f7ff] text-slate-900 flex flex-col font-sans selection:bg-lime-400 selection:text-slate-950">
        <OrganizationJsonLd
          name={siteName}
          url={siteUrl}
          description={description}
          address={address}
          email={email}
          phone={phone}
          sameAs={socialLinks}
        />
        <WebSiteJsonLd name={siteName} url={siteUrl} description={description} />
        <LanguageProvider>
          <VisitorTracker />
          <GsapScrollProgress />
          <PageLoader />
          <CustomCursor />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
