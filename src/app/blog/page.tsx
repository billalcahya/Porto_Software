import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import SiteSettings from "@/models/SiteSettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { IBlogPost } from "@/types";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalthree.dev";

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    const siteName = settings?.siteName || "DIGITAL THREE";

    return {
      title: "Thought Leadership & Tech Guides | " + siteName,
      description:
        "Technical articles on Next.js performance, WebGL shaders, enterprise AI architectures, and liquid UI design.",
      alternates: {
        canonical: "/blog",
      },
      openGraph: {
        title: "Thought Leadership & Tech Guides | " + siteName,
        description: "Deep dives into reactive server architecture, enterprise AI systems, and WebGL shaders.",
        url: `${appUrl}/blog`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Thought Leadership & Tech Guides | " + siteName,
        description: "Deep dives into reactive server architecture, enterprise AI systems, and WebGL shaders.",
      },
    };
  } catch {
    return {
      title: "Blog & Technical Insights | DIGITAL THREE",
      description: "Technical articles on Next.js performance, WebGL shaders, and enterprise AI.",
    };
  }
}

export const dynamic = "force-dynamic";

export default async function PublicBlogPage() {
  let posts = [], settings;
  try {
    await connectDB();
    const [blogDocs, settingsDoc] = await Promise.all([
      BlogPost.find({ status: "PUBLISHED" }).sort({ publishedAt: -1 }).lean(),
      SiteSettings.findOne().lean(),
    ]);

    posts = JSON.parse(JSON.stringify(blogDocs));
    settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : undefined;
  } catch (err) {
    console.warn("Blog page DB offline:", err);
  }

  const breadcrumbs = [
    { name: "Home", item: appUrl },
    { name: "Blog", item: `${appUrl}/blog` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Navbar siteName={settings?.siteName} />
      <main className="pt-36 pb-28 bg-[#f0f7ff] text-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <Badge variant="outline" className="font-mono text-xs uppercase tracking-widest bg-white border-zinc-200 text-zinc-700">
              ENGINEERING INSIGHTS
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              THOUGHT LEADERSHIP & TECH GUIDES
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              Deep dives into reactive server architecture, enterprise AI systems, WebGL shaders, and modern design systems.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: IBlogPost) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                data-cursor="READ"
                className="bg-white rounded-3xl overflow-hidden border border-black/8 shadow-xs hover:shadow-2xl hover:border-zinc-300 flex flex-col justify-between group transition-all duration-500"
              >
                <div>
                  <div className="relative h-60 w-full bg-zinc-100 overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-md text-zinc-900 border-none font-mono text-[10px] uppercase tracking-wider px-3 py-1">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-3 font-mono">
                      <span>{post.author}</span>
                      <span>{formatDate(post.publishedAt || post.createdAt || new Date())}</span>
                    </div>

                    <h3 className="text-xl font-bold uppercase text-zinc-950 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-950 group-hover:text-blue-600">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
