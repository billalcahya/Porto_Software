import { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import BlogPost from "@/models/BlogPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let portfolioUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    await connectDB();
    const [portfolios, blogs] = await Promise.all([
      Portfolio.find({ published: true }).select("slug updatedAt").lean(),
      BlogPost.find({ status: "PUBLISHED" }).select("slug updatedAt").lean(),
    ]);

    portfolioUrls = portfolios.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
    }));

    blogUrls = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt || new Date(),
    }));
  } catch (err) {
    console.warn("Sitemap DB connection offline:", err);
  }

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/portfolio`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...portfolioUrls,
    ...blogUrls,
  ];
}
