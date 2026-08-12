"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Terminal, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { ISiteSettings } from "@/types";

interface HeroProps {
  settings?: ISiteSettings;
}

export function HeroSection({ settings }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-zinc-950">
      {/* Background Glows & Aurora Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-100 h-100 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-112.5 h-112.5 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="glow" className="px-4 py-1.5 text-xs font-mono tracking-wide gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              CINEMATIC LIQUID TECHNOLOGY STUDIO
            </Badge>
          </div>
        </ScrollReveal>

        {/* Hero Heading */}
        <ScrollReveal delay={0.2}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] max-w-5xl mx-auto">
            {settings?.heroHeading || "WE BUILD DIGITAL EXPERIENCES."}
          </h1>
        </ScrollReveal>

        {/* Hero Subheading */}
        <ScrollReveal delay={0.3}>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-normal">
            {settings?.heroSubheading ||
              "Engineered for high performance, bespoke software architecture, scalable cloud systems, and futuristic web applications."}
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact">
              <Button size="lg" variant="glow" className="w-full sm:w-auto px-8 gap-3 text-base shadow-xl shadow-blue-600/30">
                Start a Project
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 gap-2 text-base border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800">
                <Terminal className="w-5 h-5 text-blue-400" />
                Explore Selected Works
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Key Feature Pills */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 pt-8 border-t border-zinc-900 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-center gap-3 glass-panel p-4 rounded-xl border-zinc-800/60">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Sub-Second Load</h4>
                <p className="text-xs text-zinc-400">Optimized Next.js 16 RSC</p>
              </div>
            </div>

            <div className="flex items-center gap-3 glass-panel p-4 rounded-xl border-zinc-800/60">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Zero-Trust Security</h4>
                <p className="text-xs text-zinc-400">JWT Auth & Zod Guard</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center gap-3 glass-panel p-4 rounded-xl border-zinc-800/60">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Liquid UI Design</h4>
                <p className="text-xs text-zinc-400">Framer Motion FX</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
