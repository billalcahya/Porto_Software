"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Terminal, ShieldCheck, Zap, Layers, Cpu, Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ShaderBackground } from "@/components/webgl/ShaderBackground";
import { useLanguage } from "@/context/LanguageContext";
import { ISiteSettings } from "@/types";

interface HeroProps {
  settings?: ISiteSettings;
}

export function HeroSection({ settings }: HeroProps) {
  const { t, locale } = useLanguage();

  // Dynamic heading & subheading resolving translations when locale === "id"
  const heroHeading = locale === "id"
    ? t("hero.heading", "KAMI MENCIPTAKAN PENGALAMAN DIGITAL YANG MENGGERAKKAN MANUSIA.")
    : (settings?.heroHeading || t("hero.heading", "WE CREATE DIGITAL EXPERIENCES THAT MOVE PEOPLE."));

  const heroSubheading = locale === "id"
    ? t("hero.subheading", "Rekayasa perangkat lunak kustom, sistem cloud skalabel, integrasi AI enterprise, dan arsitektur antarmuka animasi sinematik.")
    : (settings?.heroSubheading || t("hero.subheading", "Bespoke software engineering, scalable cloud systems, custom enterprise AI, and liquid motion UI architecture."));

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-linear-to-b from-[#e0f2fe] via-[#f0f7ff] to-white text-slate-900 aurora-bg">
      {/* Rich Tech Grid & Floating Ambient Glow Orbs */}
      <ShaderBackground />

      {/* Decorative Technical Watermark Badges */}
      <div className="absolute top-28 left-8 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-sky-700/40 select-none pointer-events-none">
        <span>&lt;DIGITAL_THREE_ARCH_V2.5&gt;</span>
        <span>STATUS: ACTIVE_100_FPS</span>
        <span>REGION: US_WEST_EDGE</span>
      </div>

      <div className="absolute bottom-16 right-8 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-lime-700/40 text-right select-none pointer-events-none">
        <span>01010011 01011001 01010011</span>
        <span>RSC_TURBOPACK_ENGINE</span>
        <span>THREEJS_SHADERS_READY</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Massive Editorial Heading & CTAs */}
          <div className="lg:col-span-7 text-left">
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 mb-6">
                <Badge variant="outline" className="px-4 py-1.5 text-xs font-mono tracking-widest uppercase gap-2 bg-white/95 border-sky-300 text-slate-900 backdrop-blur-md shadow-xs glow-blue">
                  <Sparkles className="w-3.5 h-3.5 text-lime-600 animate-pulse" />
                  <span className="gradient-text-vibrant font-extrabold">{t("hero.badge", "CREATIVE DIGITAL ATELIER")}</span>
                </Badge>
              </div>
            </ScrollReveal>

            {/* Massive Cinematic GSAP Hero Heading */}
            <div className="mb-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-950 leading-[1.02] uppercase font-sans">
                <GsapTextReveal text={heroHeading} />
              </h1>
            </div>

            {/* Hero Subheading */}
            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-base sm:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
                {heroSubheading}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <MagneticButton>
                  <Link href="/#contact">
                    <Button size="lg" className="w-full sm:w-auto px-8 py-7 text-sm font-bold uppercase tracking-wider bg-lime-400 text-slate-950 hover:bg-lime-300 rounded-full gap-3 shadow-xl glow-lime border-none">
                      {t("hero.cta_start", "Start a Project")}
                      <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link href="/portfolio">
                    <Button 
                      size="lg" 
                      className="group w-full sm:w-auto px-8 py-7 text-sm font-extrabold uppercase tracking-wider border-2 border-slate-950 bg-slate-950 text-white hover:bg-white hover:text-slate-950 rounded-full gap-2 shadow-md transition-all"
                    >
                      <Terminal className="w-5 h-5 text-sky-400 group-hover:text-slate-950 transition-colors" />
                      {t("hero.cta_explore", "Explore Case Studies")}
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Large Cinematic DIGITAL THREE Emblem */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-8 lg:py-0">
            <ScrollReveal direction="left" delay={0.3}>
              <div className="relative flex items-center justify-center">
                {/* Ambient Glowing Tech Rings */}
                <div className="absolute w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-sky-400/30 via-blue-500/20 to-transparent pointer-events-none transform-gpu" />
                <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-sky-300/40 animate-spin-slow pointer-events-none" />
                <div className="absolute w-60 h-60 sm:w-[350px] sm:h-[350px] rounded-full border-2 border-dashed border-lime-400/50 animate-spin-reverse pointer-events-none" />

                {/* Extra-Large Prominent Logo Emblem */}
                <div className="relative z-10 p-2 sm:p-4 animate-float-geometry">
                  <Image
                    src="/logo.PNG"
                    alt="DIGITAL THREE Emblem"
                    width={500}
                    height={500}
                    priority
                    className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] object-contain filter drop-shadow-[0_25px_60px_rgba(2,132,199,0.35)] hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Feature Pills Footer */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 pt-8 border-t border-sky-200/60 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="flex items-center gap-3.5 bg-white/95 backdrop-blur-md p-4.5 rounded-2xl border border-sky-200/80 shadow-xs hover:border-lime-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-lime-100 text-lime-700 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950">{t("hero.speed_title", "Sub-Second Speed")}</h4>
                <p className="text-xs text-slate-500">{t("hero.speed_desc", "Next.js 16 RSC Engine")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/95 backdrop-blur-md p-4.5 rounded-2xl border border-sky-200/80 shadow-xs hover:border-sky-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950">{t("hero.security_title", "Zero-Trust Guard")}</h4>
                <p className="text-xs text-slate-500">{t("hero.security_desc", "JWT Auth & Zod Security")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/95 backdrop-blur-md p-4.5 rounded-2xl border border-sky-200/80 shadow-xs hover:border-lime-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-lime-100 text-lime-700 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950">{t("hero.motion_title", "GSAP Motion")}</h4>
                <p className="text-xs text-slate-500">{t("hero.motion_desc", "60 FPS Cinematic Typography")}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
