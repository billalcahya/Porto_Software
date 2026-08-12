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

export const metadata = {
  title: "Blog & Insights | NEXUS Engineering",
  description: "Technical articles on Next.js performance, vector database RAG architectures, and liquid UI design.",
};

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

  return (
    <>
      <Navbar siteName={settings?.siteName} />
      <main className="pt-32 pb-24 bg-zinc-950 text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="glow" className="font-mono">ENGINEERING INSIGHTS</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Thought Leadership & Tech Guides
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Deep dives into reactive server architecture, enterprise AI systems, security best practices, and modern design systems.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: IBlogPost) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-3xl overflow-hidden bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="relative h-56 w-full bg-zinc-900 overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="glow">{post.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 font-mono">
                      <span>{post.author}</span>
                      <span>{formatDate(post.publishedAt || post.createdAt || new Date())}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
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
