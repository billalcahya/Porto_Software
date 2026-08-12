"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Terminal, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, TextReveal } from "@/components/animations/MotionWrapper";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ShaderBackground } from "@/components/webgl/ShaderBackground";
import { ISiteSettings } from "@/types";

interface HeroProps {
  settings?: ISiteSettings;
}

export function HeroSection({ settings }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-36 pb-24 overflow-hidden bg-white text-zinc-900">
      {/* Three.js / WebGL Fluid Shader Canvas */}
      <ShaderBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2 mb-8">
            <Badge variant="outline" className="px-4 py-1.5 text-xs font-mono tracking-widest uppercase gap-2 bg-white/80 border-zinc-200 text-zinc-800 backdrop-blur-md shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              CINEMATIC DIGITAL ATELIER
            </Badge>
          </div>
        </ScrollReveal>

        {/* Massive Editorial Hero Heading */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-950 leading-[1.02] uppercase font-sans">
            <TextReveal text={settings?.heroHeading || "WE CREATE DIGITAL EXPERIENCES THAT MOVE PEOPLE."} />
          </h1>
        </div>

        {/* Hero Subheading */}
        <ScrollReveal delay={0.3}>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-normal">
            {settings?.heroSubheading ||
              "Bespoke software engineering, scalable cloud systems, custom enterprise AI, and liquid motion UI architecture."}
          </p>
        </ScrollReveal>

        {/* Magnetic CTA Buttons */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <MagneticButton strength={0.25}>
              <Link href="/#contact" data-cursor="LET'S TALK">
                <Button size="lg" className="w-full sm:w-auto px-8 py-7 text-sm font-bold uppercase tracking-wider bg-zinc-950 text-white hover:bg-zinc-800 rounded-full gap-3 shadow-xl">
                  Start a Project
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <Link href="/portfolio" data-cursor="EXPLORE">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-7 text-sm font-bold uppercase tracking-wider border-zinc-300 bg-white/80 text-zinc-900 hover:bg-zinc-100 rounded-full gap-2 backdrop-blur-md">
                  <Terminal className="w-5 h-5 text-blue-600" />
                  Explore Selected Works
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Key Feature Pills */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 sm:mt-20 pt-10 border-t border-zinc-200/80 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">Sub-Second Speed</h4>
                <p className="text-xs text-zinc-500">Next.js 16 RSC Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
              <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">Zero-Trust Guard</h4>
                <p className="text-xs text-zinc-500">JWT Auth & Zod Security</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
              <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">WebGL Motion</h4>
                <p className="text-xs text-zinc-500">Three.js & GSAP Shaders</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
