"use client";

import React from "react";
import { Boxes, FileCode, Database, Palette, Sparkles, Server } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { ITechnology } from "@/types";

interface TechProps {
  technologies?: ITechnology[];
}

export function TechnologySection({ technologies = [] }: TechProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Boxes":
        return <Boxes className="w-5 h-5 text-blue-400" />;
      case "FileCode":
        return <FileCode className="w-5 h-5 text-indigo-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Server className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">CORE TECH STACK</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              State-of-the-Art Technology Stack
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              We leverage production-proven frameworks, type-safe languages, and resilient database engines.
            </p>
          </div>
        </ScrollReveal>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
          {technologies.map((tech, idx) => (
            <ScrollReveal key={tech._id || idx} delay={0.05 * idx}>
              <a
                href={tech.website || "#"}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-4 sm:p-6 bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 text-center flex flex-col items-center justify-center gap-2.5 sm:gap-3 group transition-all duration-300"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                  {getIcon(tech.icon)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono mt-0.5 block truncate max-w-full">
                    {tech.category}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
