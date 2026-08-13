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
  const getIcon = (iconName: string, index: number) => {
    const iconColors = [
      "text-sky-700 bg-sky-100 border-sky-200",
      "text-lime-700 bg-lime-100 border-lime-200",
      "text-indigo-700 bg-indigo-100 border-indigo-200",
      "text-emerald-700 bg-emerald-100 border-emerald-200",
      "text-cyan-700 bg-cyan-100 border-cyan-200",
      "text-purple-700 bg-purple-100 border-purple-200",
    ];
    const colorClass = iconColors[index % iconColors.length];

    const iconComponent = () => {
      switch (iconName) {
        case "Boxes":
          return <Boxes className="w-5 h-5" />;
        case "FileCode":
          return <FileCode className="w-5 h-5" />;
        case "Database":
          return <Database className="w-5 h-5" />;
        case "Palette":
          return <Palette className="w-5 h-5" />;
        case "Sparkles":
          return <Sparkles className="w-5 h-5" />;
        default:
          return <Server className="w-5 h-5" />;
      }
    };

    return <div className={`p-3.5 rounded-2xl border shadow-xs group-hover:scale-110 transition-transform ${colorClass}`}>{iconComponent()}</div>;
  };

  return (
    <section className="py-28 bg-[#f0f7ff] text-slate-900 relative border-t border-sky-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-sky-300 text-slate-900 font-bold">
              CORE TECH STACK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-slate-950">
              STATE-OF-THE-ART <span className="gradient-text-vibrant">TECHNOLOGY WALL</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
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
                className="bg-white rounded-3xl p-6 border border-sky-200/80 hover:border-lime-400 text-center flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {getIcon(tech.icon, idx)}
                <div>
                  <h4 className="text-sm font-bold text-slate-950 uppercase tracking-tight group-hover:text-sky-700 transition-colors">
                    {tech.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono font-bold mt-1 block uppercase tracking-wider truncate max-w-full">
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
