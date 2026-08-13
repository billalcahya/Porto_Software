import { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import BlogPost from "@/models/BlogPost";
import SiteSettings from "@/models/SiteSettings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalthree.dev";

  let portfolioUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    if (settings?.seo?.siteUrl) {
      baseUrl = settings.seo.siteUrl;
    }

    const [portfolios, blogs] = await Promise.all([
      Portfolio.find({ published: true }).select("slug updatedAt").lean(),
      BlogPost.find({ status: "PUBLISHED" }).select("slug updatedAt").lean(),
    ]);

    portfolioUrls = portfolios.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    blogUrls = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.warn("Sitemap DB connection offline:", err);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...portfolioUrls, ...blogUrls];
}
