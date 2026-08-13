"use client";

import React, { useState } from "react";
import { Code2, Smartphone, Cpu, Cloud, Layers, ArrowUpRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { IService } from "@/types";

interface ServicesProps {
  services?: IService[];
}

export function ServicesSection({ services = [] }: ServicesProps) {
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-sky-600" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-lime-600" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-sky-700" />;
      case "Cloud":
        return <Cloud className="w-6 h-6 text-blue-600" />;
      default:
        return <Layers className="w-6 h-6 text-lime-600" />;
    }
  };

  return (
    <section id="services" className="py-28 bg-[#f0f7ff] text-slate-900 relative border-t border-sky-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-sky-300 text-slate-900 font-bold">
                {t("services.badge", "CAPABILITIES & DISCIPLINES")}
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-slate-950 font-sans">
                <GsapTextReveal text={t("services.heading", "BESPOKE SOFTWARE ARCHITECTURE & ENGINEERING SERVICES")} />
              </h2>
            </div>
            <p className="text-base text-slate-700 max-w-md leading-relaxed">
              {t("services.subheading", "We design, build, deploy, and scale high-impact software tailored specifically for mission-critical business requirements.")}
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
                  className={`group relative rounded-3xl p-8 sm:p-10 border transition-all duration-400 cursor-pointer overflow-hidden ${
                    isHovered
                      ? "bg-slate-950 text-white border-slate-900 shadow-2xl scale-[1.01]"
                      : "bg-white border-sky-200/80 text-slate-900 hover:border-lime-400 shadow-xs"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                    {/* Index & Title */}
                    <div className="flex items-center gap-6 sm:gap-10">
                      <span
                        className={`text-2xl sm:text-3xl font-mono font-black transition-colors ${
                          isHovered ? "text-lime-400" : "text-sky-600"
                        }`}
                      >
                        {formattedIndex}
                      </span>

                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3.5 rounded-2xl transition-all duration-300 ${
                            isHovered ? "bg-slate-800 text-white" : "bg-sky-50 border border-sky-200 text-slate-800 shadow-xs"
                          }`}
                        >
                          {getIcon(service.icon)}
                        </div>
                        <h3
                          className={`text-2xl sm:text-4xl font-black tracking-tight uppercase transition-colors ${
                            isHovered ? "text-white" : "text-slate-950"
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
                                  ? "bg-slate-800 text-slate-300 border border-slate-700"
                                  : "bg-lime-50 text-lime-800 border border-lime-200 font-bold"
                              }`}
                            >
                              <Check className="w-3 h-3 inline mr-1 text-lime-600" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isHovered
                            ? "bg-lime-400 text-slate-950 rotate-45 shadow-lg font-bold"
                            : "bg-white border border-sky-200 text-slate-900 group-hover:border-lime-400"
                        }`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Description Expansion on Hover */}
                  <div
                    className={`transition-all duration-400 overflow-hidden ${
                      isHovered ? "max-h-40 opacity-100 mt-6 pt-6 border-t border-slate-800" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
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
