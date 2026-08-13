"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, Compass, Code, CheckCircle2, Rocket, ShieldCheck, Check, Sparkles } from "lucide-react";
import { FigmaIcon } from "@/components/ui/brand-icons";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Badge } from "@/components/ui/badge";
import { ShaderBackground } from "@/components/webgl/ShaderBackground";
import { useLanguage } from "@/context/LanguageContext";
import { IProcessStep } from "@/types";

interface ProcessProps {
  processSteps?: IProcessStep[];
}

export function ProcessSection({ processSteps = [] }: ProcessProps) {
  const { t, locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion useScroll & useSpring for vertical progress line fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-5 h-5 text-sky-600" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-blue-600" />;
      case "Figma":
        return <FigmaIcon className="w-5 h-5 text-sky-700" />;
      case "Code":
        return <Code className="w-5 h-5 text-lime-600" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-lime-600" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-sky-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-700" />;
    }
  };

  const defaultStepsEn: IProcessStep[] = [
    {
      _id: "1",
      stepNumber: 1,
      title: "Discovery & Strategy",
      description: "In-depth technical requirements analysis, user persona mapping, system architecture planning, and project roadmap definition.",
      icon: "Search",
      deliverables: ["Product Requirements Document", "Technical Architecture Blueprint", "Project Timeline & SLA"],
      order: 1,
      published: true,
    },
    {
      _id: "2",
      stepNumber: 2,
      title: "UI/UX & Motion Design",
      description: "Crafting bespoke wireframes, interactive high-fidelity prototypes, design tokens, and fluid motion design systems.",
      icon: "Figma",
      deliverables: ["Figma Design System", "Interactive Clickable Prototype", "Motion UI Micro-interactions"],
      order: 2,
      published: true,
    },
    {
      _id: "3",
      stepNumber: 3,
      title: "Full-Stack Development",
      description: "Clean code engineering with Next.js 16 App Router, TypeScript type safety, MongoDB database schemas, and API integration.",
      icon: "Code",
      deliverables: ["Type-Safe Codebase", "Database Schemas & Models", "REST & Server Actions"],
      order: 3,
      published: true,
    },
    {
      _id: "4",
      stepNumber: 4,
      title: "Testing & Deployment",
      description: "Rigorous automated testing, security vulnerability scanning, performance optimization, and Vercel edge deployment.",
      icon: "Rocket",
      deliverables: ["Zero TypeScript Errors", "Lighthouse 100/100 Index", "Production Edge Launch"],
      order: 4,
      published: true,
    },
  ];

  const defaultStepsId: IProcessStep[] = [
    {
      _id: "1",
      stepNumber: 1,
      title: "Riset & Strategi",
      description: "Analisis kebutuhan teknis mendalam, pemetaan pengguna, perencanaan arsitektur sistem, dan definisi jadwal proyek.",
      icon: "Search",
      deliverables: ["Dokumen Persyaratan Produk", "Blueprint Arsitektur Teknis", "Jadwal Proyek & SLA"],
      order: 1,
      published: true,
    },
    {
      _id: "2",
      stepNumber: 2,
      title: "Desain UI/UX & Animasi",
      description: "Merancang wireframe kustom, prototipe interaktif, token desain, dan sistem animasi antarmuka yang mulus.",
      icon: "Figma",
      deliverables: ["Design System Figma", "Prototipe Interaktif", "Mikro-interaksi Motion UI"],
      order: 2,
      published: true,
    },
    {
      _id: "3",
      stepNumber: 3,
      title: "Pengembangan Full-Stack",
      description: "Penulisan kode bersih dengan Next.js 16 App Router, TypeScript type safety, skema database MongoDB, dan integrasi API.",
      icon: "Code",
      deliverables: ["Codebase Type-Safe", "Skema & Model Database", "REST & Server Actions"],
      order: 3,
      published: true,
    },
    {
      _id: "4",
      stepNumber: 4,
      title: "Pengujian & Peluncuran",
      description: "Pengujian otomatis yang ketat, pemindaian kerentanan keamanan, optimasi performa, dan peluncuran Vercel edge.",
      icon: "Rocket",
      deliverables: ["0 Error TypeScript", "Skor Lighthouse 100/100", "Peluncuran Edge Produksi"],
      order: 4,
      published: true,
    },
  ];

  const defaultSteps = locale === "id" ? defaultStepsId : defaultStepsEn;
  const stepsToRender = processSteps.length > 0 ? processSteps : defaultSteps;

  return (
    <section id="process" className="py-28 bg-[#e8f2ff] text-slate-900 relative overflow-hidden aurora-bg">
      {/* Moving Background Layer */}
      <ShaderBackground />

      {/* Decorative Background Technical Badges */}
      <div className="absolute top-20 right-10 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-sky-700/40 select-none pointer-events-none text-right">
        <span>&lt;TIMELINE_ENGINE_V3&gt;</span>
        <span>FRAMER_MOTION_USESCROLL</span>
        <span>SPRING_DAMPING: 30</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white/95 border-sky-300 text-slate-900 font-bold shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-lime-600 animate-pulse" />
            {t("process.badge", "WORKFLOW & METHODOLOGY")}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-slate-950 font-sans">
            <GsapTextReveal text={t("process.heading", "PREDICTABLE ENGINEERING PROCESS")} />
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {t("process.subheading", "From initial discovery through deployment and SLA maintenance, every milestone is structured for maximum transparency and speed.")}
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-12">
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 -translate-x-1/2 bg-slate-300/80 rounded-full" />

          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 -translate-x-1/2 bg-linear-to-b from-blue-600 via-sky-500 to-lime-500 origin-top rounded-full shadow-lg z-10"
          />

          {/* ================= DESKTOP LAYOUT (ALTERNATING ZIG-ZAG LEFT & RIGHT) ================= */}
          <div className="hidden md:block space-y-16 relative z-20">
            {stepsToRender.map((step, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div key={step._id || idx} className="relative flex items-center w-full">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-white bg-slate-950 text-lime-400 font-mono text-xs font-black shadow-lg flex items-center justify-center z-30 transition-transform hover:scale-110">
                    0{step.stepNumber}
                  </div>

                  <div className="w-1/2 pr-14 text-right">
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-sky-200/90 shadow-xl hover:shadow-2xl hover:border-lime-400 transition-all duration-300 group text-left w-full"
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
                            {locale === "id" ? "FASE" : "PHASE"} 0{step.stepNumber}
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                            {getIcon(step.icon)}
                          </div>
                        </div>

                        <h3 className="text-2xl font-black uppercase text-slate-950 mb-3 group-hover:text-sky-700 transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-sm text-slate-700 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {step.deliverables && step.deliverables.length > 0 && (
                          <div className="pt-4 border-t border-sky-100 space-y-2 text-xs text-slate-800 font-medium">
                            {step.deliverables.map((del, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <div className="w-1/2 pl-14 text-left">
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-sky-200/90 shadow-xl hover:shadow-2xl hover:border-lime-400 transition-all duration-300 group text-left w-full"
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                            {getIcon(step.icon)}
                          </div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
                            {locale === "id" ? "FASE" : "PHASE"} 0{step.stepNumber}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black uppercase text-slate-950 mb-3 group-hover:text-sky-700 transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-sm text-slate-700 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {step.deliverables && step.deliverables.length > 0 && (
                          <div className="pt-4 border-t border-sky-100 space-y-2 text-xs text-slate-800 font-medium">
                            {step.deliverables.map((del, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= MOBILE LAYOUT ================= */}
          <div className="block md:hidden space-y-12 relative z-20 pl-16">
            {stepsToRender.map((step, idx) => (
              <div key={step._id || idx} className="relative">
                <div className="absolute -left-16 top-6 w-10 h-10 rounded-full border-4 border-white bg-slate-950 text-lime-400 font-mono text-xs font-black shadow-lg flex items-center justify-center z-30">
                  0{step.stepNumber}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-sky-200/90 shadow-xl hover:shadow-2xl hover:border-lime-400 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 shadow-xs">
                      {getIcon(step.icon)}
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
                      {locale === "id" ? "FASE" : "PHASE"} 0{step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-slate-950 mb-3 group-hover:text-sky-700 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {step.deliverables && step.deliverables.length > 0 && (
                    <div className="pt-4 border-t border-sky-100 space-y-2 text-xs text-slate-800 font-medium">
                      {step.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
