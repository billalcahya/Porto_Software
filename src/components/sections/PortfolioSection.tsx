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
    <section id="work" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge variant="glow" className="mb-4 font-mono">SELECTED CASE STUDIES</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Cinematic Portfolio & Systems Built
              </h2>
            </div>
            <Link href="/portfolio">
              <Button variant="outline" className="gap-2 border-zinc-800">
                View All Case Studies
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Filter Categories */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
            <Filter className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPortfolios.map((item, idx) => (
            <ScrollReveal key={item._id || idx} delay={0.1 * idx}>
              <div className="glass-card rounded-3xl overflow-hidden bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 transition-all duration-300 group">
                {/* Thumbnail Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <Badge variant="glow" className="bg-zinc-950/80 backdrop-blur-md">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 text-xs font-mono text-zinc-300 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="text-xs font-semibold text-blue-400 mb-1">{item.client}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
                    >
                      Read Case Study
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
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
                          className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
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
