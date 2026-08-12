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
      <main className="pt-36 pb-28 bg-[#F7F7F5] text-zinc-900 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-500 hover:text-zinc-950 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-white border-zinc-200 text-zinc-900 font-mono text-xs uppercase px-3 py-1">
                {portfolio.category}
              </Badge>
              <span className="text-xs font-mono text-zinc-500">{portfolio.year}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 leading-tight font-sans">
              {portfolio.title}
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-3xl">
              {portfolio.description}
            </p>
          </div>

          {/* Featured Thumbnail Image */}
          <div className="relative h-64 sm:h-96 lg:h-120 w-full rounded-3xl overflow-hidden border border-black/8 shadow-xl mb-12 bg-zinc-100">
            <Image
              src={portfolio.thumbnail}
              alt={portfolio.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Meta Grid & Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-10 rounded-3xl bg-white border border-black/8 shadow-xs mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase block">Client</span>
                <span className="text-sm font-bold text-zinc-950">{portfolio.client}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase block">Completion</span>
                <span className="text-sm font-bold text-zinc-950">{portfolio.year}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-start md:justify-end">
              {portfolio.projectUrl && (
                <a href={portfolio.projectUrl} target="_blank" rel="noreferrer">
                  <Button variant="default" size="sm" className="gap-2 bg-zinc-950 text-white hover:bg-zinc-800 rounded-full font-bold uppercase tracking-wider text-xs px-5 py-5 shadow-xs">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </Button>
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full border-zinc-200 bg-white text-zinc-900 font-bold uppercase tracking-wider text-xs px-5 py-5 shadow-xs">
                    <GithubIcon className="w-4 h-4" /> Repository
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-4 mb-12">
            <h3 className="text-lg font-bold uppercase text-zinc-950 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" /> Technology Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-xs font-mono font-semibold text-zinc-800 shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Images */}
          {portfolio.gallery && portfolio.gallery.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase text-zinc-950">Interface Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.gallery.map((img: string, idx: number) => (
                  <div key={idx} className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden border border-black/8 bg-zinc-100 shadow-xs">
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
