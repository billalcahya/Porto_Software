import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Building, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import SiteSettings from "@/models/SiteSettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const portfolio = await Portfolio.findOne({ slug: resolvedParams.slug, published: true }).lean();
    if (!portfolio) return { title: "Portfolio Not Found" };

    return {
      title: `${portfolio.title} | Case Study`,
      description: portfolio.description,
    };
  } catch {
    return { title: "NEXUS | Portfolio Case Study" };
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

  return (
    <>
      <Navbar siteName={settings?.siteName} />
      <main className="pt-32 pb-24 bg-zinc-950 text-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <Badge variant="glow">{portfolio.category}</Badge>
              <span className="text-xs font-mono text-zinc-400">{portfolio.year}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {portfolio.title}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
              {portfolio.description}
            </p>
          </div>

          {/* Featured Thumbnail Image */}
          <div className="relative h-96 sm:h-120 w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl mb-12 bg-zinc-900">
            <Image
              src={portfolio.thumbnail}
              alt={portfolio.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Meta Grid & Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-3xl glass-card border-zinc-800 bg-zinc-950/80 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase block">Client</span>
                <span className="text-sm font-bold text-white">{portfolio.client}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase block">Completion</span>
                <span className="text-sm font-bold text-white">{portfolio.year}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-start md:justify-end">
              {portfolio.projectUrl && (
                <a href={portfolio.projectUrl} target="_blank" rel="noreferrer">
                  <Button variant="glow" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </Button>
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <GithubIcon className="w-4 h-4" /> Repository
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-4 mb-12">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" /> Technology Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Images */}
          {portfolio.gallery && portfolio.gallery.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Interface Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.gallery.map((img: string, idx: number) => (
                  <div key={idx} className="relative h-64 w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <Image src={img} alt={`${portfolio.title} screenshot ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
