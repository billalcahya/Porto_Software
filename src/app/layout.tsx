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
  const keywords = settings?.seo?.keywords || [
    "Software House",
    "Jasa Pembuatan Aplikasi",
    "Enterprise Software Development",
    "Next.js Development Agency",
    "WebGL Three.js Studio",
    "Enterprise AI Integration",
    "Cloud Architecture",
    "UI UX Motion Engineering",
  ];
  const ogImage =
    settings?.seo?.ogImage ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    alternates: {
      canonical: "/",
    },
    verification: settings?.seo?.googleSiteVerification
      ? { google: settings.seo.googleSiteVerification }
      : undefined,
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
      locale: "en_US",
      url: siteUrl,
      title,
      description,
      siteName,
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
      creator: "@digitalthree",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings;
  try {
    await connectDB();
    const settingsDoc = await SiteSettings.findOne().lean();
    if (settingsDoc) {
      settings = JSON.parse(JSON.stringify(settingsDoc));
    }
  } catch (err) {
    console.warn("Root layout DB connection offline:", err);
  }

  const siteName = settings?.siteName || "DIGITAL THREE";
  const siteUrl = settings?.seo?.siteUrl || defaultAppUrl;
  const description = settings?.description || "High-performance software engineering & AI studio.";
  const address = settings?.address || "San Francisco, CA";
  const email = settings?.contactEmail || "hello@digitalthree.dev";
  const phone = settings?.contactPhone || "+1 (800) 458-9210";
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
          <GsapScrollProgress />
          <PageLoader />
          <CustomCursor />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
