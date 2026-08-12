"use client";

import React, { useState } from "react";
import { Code2, Smartphone, Cpu, Cloud, Layers, ArrowUpRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { IService } from "@/types";

interface ServicesProps {
  services?: IService[];
}

export function ServicesSection({ services = [] }: ServicesProps) {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-blue-600" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-indigo-600" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-600" />;
      case "Cloud":
        return <Cloud className="w-6 h-6 text-purple-600" />;
      default:
        return <Layers className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="services" className="py-28 bg-white text-zinc-900 relative border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-zinc-50 border-zinc-200 text-zinc-700">
                CAPABILITIES & DISCIPLINES
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
                Bespoke Software Architecture & Engineering Services
              </h2>
            </div>
            <p className="text-base text-zinc-600 max-w-md leading-relaxed">
              We design, build, deploy, and scale high-impact software tailored specifically for mission-critical business requirements.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Editorial Services List */}
        <div className="space-y-4">
          {services.map((service, index) => {
            const isHovered = activeHover === index;
            const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <ScrollReveal key={service._id || index} delay={0.08 * index}>
                <div
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(null)}
                  data-cursor="EXPLORE"
                  className={`group relative rounded-3xl p-8 sm:p-10 border transition-all duration-400 cursor-pointer overflow-hidden ${
                    isHovered
                      ? "bg-zinc-950 text-white border-zinc-900 shadow-2xl scale-[1.01]"
                      : "bg-[#FAFAFA] border-black/8 text-zinc-900 hover:border-zinc-300"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                    {/* Index & Title */}
                    <div className="flex items-center gap-6 sm:gap-10">
                      <span
                        className={`text-2xl sm:text-3xl font-mono font-bold transition-colors ${
                          isHovered ? "text-blue-400" : "text-zinc-400"
                        }`}
                      >
                        {formattedIndex}
                      </span>

                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl transition-colors ${isHovered ? "bg-zinc-800" : "bg-white border border-zinc-200"}`}>
                          {getIcon(service.icon)}
                        </div>
                        <h3
                          className={`text-2xl sm:text-4xl font-black tracking-tight uppercase transition-colors ${
                            isHovered ? "text-white" : "text-zinc-950"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Features Badges & Arrow */}
                    <div className="flex items-center gap-6 justify-between lg:justify-end">
                      {service.features && service.features.length > 0 && (
                        <div className="hidden sm:flex flex-wrap items-center gap-2 max-w-md">
                          {service.features.slice(0, 3).map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className={`text-xs font-mono px-3 py-1 rounded-full transition-colors ${
                                isHovered
                                  ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                                  : "bg-white text-zinc-700 border border-zinc-200"
                              }`}
                            >
                              <Check className="w-3 h-3 inline mr-1 text-blue-500" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isHovered
                            ? "bg-blue-600 text-white rotate-45"
                            : "bg-white border border-zinc-200 text-zinc-900 group-hover:border-zinc-400"
                        }`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Description Expansion on Hover */}
                  <div
                    className={`transition-all duration-400 overflow-hidden ${
                      isHovered ? "max-h-40 opacity-100 mt-6 pt-6 border-t border-zinc-800" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
