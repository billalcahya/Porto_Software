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
        return <Boxes className="w-5 h-5 text-blue-600" />;
      case "FileCode":
        return <FileCode className="w-5 h-5 text-indigo-600" />;
      case "Database":
        return <Database className="w-5 h-5 text-emerald-600" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-cyan-600" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      default:
        return <Server className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section className="py-28 bg-white text-zinc-900 relative border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-zinc-50 border-zinc-200 text-zinc-700">
              CORE TECH STACK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              STATE-OF-THE-ART TECHNOLOGY WALL
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              We leverage production-proven frameworks, type-safe languages, and resilient database engines.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {technologies.map((tech, idx) => (
            <ScrollReveal key={tech._id || idx} delay={0.05 * idx}>
              <a
                href={tech.website || "#"}
                target="_blank"
                rel="noreferrer"
                data-cursor="VISIT"
                className="bg-[#FAFAFA] rounded-3xl p-6 border border-black/8 hover:border-blue-500/40 text-center flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs group-hover:scale-110 transition-transform">
                  {getIcon(tech.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {tech.name}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 block uppercase tracking-wider truncate max-w-full">
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
