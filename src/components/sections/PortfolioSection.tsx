"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Filter, Sparkles, Eye, Maximize2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { IPortfolio } from "@/types";
import { PortfolioModal } from "@/components/portfolio/PortfolioModal";
import { DetailShaderCanvas } from "@/components/webgl/DetailShaderCanvas";
import { AnimatedGeometryBackground } from "@/components/webgl/AnimatedGeometryBackground";

interface PortfolioProps {
  portfolios?: IPortfolio[];
}

export function PortfolioSection({ portfolios = [] }: PortfolioProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<IPortfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", ...Array.from(new Set(portfolios.map((p) => p.category)))];

  const filteredPortfolios =
    activeCategory === "All"
      ? portfolios
      : portfolios.filter((p) => p.category === activeCategory);

  const handleOpenModal = (item: IPortfolio) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section id="work" className="pt-36 pb-28 bg-[#F7F7F5] text-slate-900 relative overflow-hidden">
      {/* WebGL GLSL Shader Liquid Silk Background */}
      <DetailShaderCanvas />

      {/* Tech Blueprint Dot Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none z-0" />

      {/* 3D Blueprint Wireframe SVG Geometry Suite */}
      <AnimatedGeometryBackground />

      {/* Ambient Glow Orbs */}
      <div className="orb-glow w-[36rem] h-[36rem] bg-sky-300/25 top-10 left-[5%] pointer-events-none" />
      <div className="orb-glow w-[32rem] h-[32rem] bg-lime-300/25 top-1/2 right-[3%] pointer-events-none" />
      <div className="orb-glow w-[40rem] h-[40rem] bg-cyan-300/20 bottom-10 left-[15%] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-sky-300 text-slate-900 font-bold">
                {t("portfolio.badge", "SELECTED CASE STUDIES")}
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-slate-950 font-sans">
                <GsapTextReveal text={t("portfolio.heading", "FEATURED WORK & DIGITAL SYSTEMS")} />
              </h2>
            </div>
            <Link href="/portfolio">
              <Button className="gap-2 rounded-full border-2 border-slate-950 bg-white !text-slate-950 hover:!bg-slate-950 hover:!text-white font-extrabold uppercase tracking-wider text-xs px-6 py-6 shadow-md transition-all">
                {t("portfolio.view_all", "View All Case Studies")}
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Filter Categories */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none snap-x touch-pan-x">
            <Filter className="w-4 h-4 text-sky-700 mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 snap-start shrink-0 ${
                  activeCategory === cat
                    ? "bg-lime-400 text-slate-950 font-black shadow-md glow-lime"
                    : "bg-white border border-sky-200 text-slate-700 hover:text-slate-950 hover:border-lime-400"
                }`}
              >
                {cat === "All" ? t("portfolio.all", "All") : cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Editorial Storytelling Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredPortfolios.map((item, idx) => (
            <ScrollReveal key={item._id || idx} delay={0.1 * idx}>
              <div
                className="group bg-white rounded-3xl overflow-hidden border border-sky-200/80 shadow-xs hover:shadow-2xl hover:border-lime-400 transition-all duration-500 flex flex-col justify-between h-full"
              >
                {/* Thumbnail Image Container - Interactive Modal Trigger */}
                <div
                  onClick={() => handleOpenModal(item)}
                  className="relative h-72 sm:h-96 w-full overflow-hidden bg-sky-50 cursor-pointer"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 z-10">
                    <Badge className="bg-lime-400 text-slate-950 border-none font-mono text-xs uppercase tracking-wider px-3 py-1 shadow-md font-extrabold">
                      <Sparkles className="w-3 h-3 inline mr-1 text-slate-950" />
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-6 right-6 z-10 text-xs font-mono font-bold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                    {item.year}
                  </div>

                  {/* Interactive Glassmorphism Overlay CTA on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(item);
                      }}
                      className="px-6 py-3 rounded-full bg-white/90 backdrop-blur-md border border-white text-slate-950 font-mono font-extrabold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-lime-400"
                    >
                      <Maximize2 className="w-4 h-4" />
                      View Documentation & Specs
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-sky-700 tracking-widest mb-2">{item.client}</div>
                    <h3
                      onClick={() => handleOpenModal(item)}
                      className="text-2xl sm:text-3xl font-black uppercase text-slate-950 mb-4 group-hover:text-sky-700 transition-colors leading-tight cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-lime-50 border border-lime-200 text-lime-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-sky-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:text-sky-700 transition-colors group/link"
                    >
                      <Eye className="w-4 h-4 text-sky-600" />
                      Quick Preview & Details
                    </button>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className="p-2.5 rounded-full bg-sky-50 text-slate-700 hover:text-sky-700 hover:bg-sky-100 transition-colors"
                        title="Full Case Study Page"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-full bg-sky-50 text-slate-700 hover:text-sky-700 hover:bg-sky-100 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Case Study Glassmorphism Modal */}
        <PortfolioModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}
