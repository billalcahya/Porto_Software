"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Filter } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPortfolio } from "@/types";

interface PortfolioProps {
  portfolios?: IPortfolio[];
}

export function PortfolioSection({ portfolios = [] }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(portfolios.map((p) => p.category)))];

  const filteredPortfolios =
    activeCategory === "All"
      ? portfolios
      : portfolios.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-28 bg-[#F7F7F5] text-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-zinc-200 text-zinc-700">
                SELECTED CASE STUDIES
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
                SELECTED WORK & SYSTEMS SHIPPED
              </h2>
            </div>
            <Link href="/portfolio" data-cursor="VIEW">
              <Button variant="outline" className="gap-2 rounded-full border-zinc-300 bg-white text-zinc-900 font-bold uppercase tracking-wider text-xs px-6 py-6 shadow-xs">
                View All Case Studies
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Filter Categories */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none snap-x touch-pan-x">
            <Filter className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 snap-start shrink-0 ${
                  activeCategory === cat
                    ? "bg-zinc-950 text-white shadow-md"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Editorial Storytelling Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredPortfolios.map((item, idx) => (
            <ScrollReveal key={item._id || idx} delay={0.1 * idx}>
              <div
                data-cursor="VIEW PROJECT"
                className="group bg-white rounded-3xl overflow-hidden border border-black/8 shadow-sm hover:shadow-2xl hover:border-zinc-300 transition-all duration-500 flex flex-col justify-between h-full"
              >
                {/* Thumbnail Image Container */}
                <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-6 left-6">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-md text-zinc-900 border-none font-mono text-xs uppercase tracking-wider px-3 py-1">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-6 right-6 text-xs font-mono font-bold text-white bg-zinc-950/80 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-blue-600 tracking-widest mb-2">{item.client}</div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-[#F7F7F5] border border-zinc-200 text-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:text-blue-600 transition-colors group/link"
                    >
                      Read Case Study
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-full bg-[#F7F7F5] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-full bg-[#F7F7F5] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
