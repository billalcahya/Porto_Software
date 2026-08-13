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

import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalthree.dev";

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug: resolvedParams.slug, status: "PUBLISHED" }).lean();
    if (!post) return { title: "Article Not Found" };

    const pageTitle = `${post.title} | Technical Insights`;
    const pageDesc = post.excerpt;
    const pageUrl = `${appUrl}/blog/${post.slug}`;
    const pageImage = post.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: [post.category, ...(post.tags || []), post.author, "Software Engineering"],
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: pageUrl,
        type: "article",
        publishedTime: new Date(post.publishedAt || post.createdAt || Date.now()).toISOString(),
        authors: [post.author],
        tags: post.tags,
        images: [{ url: pageImage, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDesc,
        images: [pageImage],
      },
    };
  } catch {
    return { title: "DIGITAL THREE | Blog Article" };
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

  const breadcrumbs = [
    { name: "Home", item: appUrl },
    { name: "Blog", item: `${appUrl}/blog` },
    { name: post.title, item: `${appUrl}/blog/${post.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd
        url={`${appUrl}/blog/${post.slug}`}
        title={post.title}
        description={post.excerpt}
        images={[post.thumbnail]}
        datePublished={new Date(post.publishedAt || post.createdAt || Date.now()).toISOString()}
        authorName={post.author}
        publisherName={settings?.siteName || "DIGITAL THREE"}
      />
      <Navbar siteName={settings?.siteName} />
      <main className="pt-36 pb-28 bg-[#F7F7F5] text-zinc-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <Badge variant="outline" className="bg-white border-zinc-200 text-zinc-900 font-mono text-xs uppercase px-3 py-1">
              {post.category}
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-zinc-500 border-y border-zinc-200/80 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-zinc-800">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="relative h-60 sm:h-96 md:h-112 w-full rounded-3xl overflow-hidden border border-black/8 shadow-xl mb-12 bg-zinc-100">
            <Image src={post.thumbnail} alt={post.title} fill priority className="object-cover" />
          </div>

          {/* Content Body */}
          <div className="bg-white p-6 sm:p-10 md:p-14 rounded-3xl border border-black/8 shadow-xs leading-relaxed text-zinc-800 space-y-6 text-base sm:text-lg font-sans whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center gap-3">
              <Tag className="w-4 h-4 text-zinc-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-zinc-200 text-zinc-600 font-semibold shadow-xs">
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
