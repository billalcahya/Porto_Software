import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import SiteSettings from "@/models/SiteSettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug: resolvedParams.slug, status: "PUBLISHED" }).lean();
    if (!post) return { title: "Article Not Found" };

    return {
      title: `${post.title} | NEXUS Blog`,
      description: post.excerpt,
    };
  } catch {
    return { title: "NEXUS | Blog Article" };
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  let postDoc, settingsDoc;

  try {
    await connectDB();
    const [pDoc, sDoc] = await Promise.all([
      BlogPost.findOne({ slug: resolvedParams.slug, status: "PUBLISHED" }).lean(),
      SiteSettings.findOne().lean(),
    ]);
    postDoc = pDoc;
    settingsDoc = sDoc;
  } catch (err) {
    console.warn("Blog detail DB offline:", err);
  }

  if (!postDoc) notFound();

  const post = JSON.parse(JSON.stringify(postDoc));
  const settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : undefined;

  return (
    <>
      <Navbar siteName={settings?.siteName} />
      <main className="pt-32 pb-24 bg-zinc-950 text-white min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <Badge variant="glow">{post.category}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-zinc-400 border-y border-zinc-900 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl mb-12 bg-zinc-900">
            <Image src={post.thumbnail} alt={post.title} fill priority className="object-cover" />
          </div>

          {/* Content Body */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border-zinc-800 bg-zinc-950/80 leading-relaxed text-zinc-300 space-y-6 text-base font-sans whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center gap-3">
              <Tag className="w-4 h-4 text-zinc-500" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}
