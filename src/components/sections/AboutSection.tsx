"use client";

import React from "react";
import { CheckCircle2, Eye, Target } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { ISiteSettings } from "@/types";

interface AboutProps {
  settings?: ISiteSettings;
}

export function AboutSection({ settings }: AboutProps) {
  const stats = settings?.stats || {
    projectsCompleted: 148,
    satisfiedClients: 92,
    teamExperts: 28,
    yearsExperience: 9,
  };

  const values = settings?.values || [
    "Uncompromising Engineering Precision",
    "Cinematic User Experience",
    "Predictable & Scalable Architecture",
    "Continuous AI Integration",
  ];

  return (
    <section id="about" className="py-28 bg-[#F7F7F5] text-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-zinc-200 text-zinc-700">
              ABOUT NEXUS ATELIER
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-zinc-950 uppercase">
              WE BRIDGE THE GAP BETWEEN HEAVY ENTERPRISE BACKEND & FLUID MOTION DESIGN.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-3xl">
              {settings?.description ||
                "We bridge the gap between heavy enterprise backend engineering and fluid, interactive frontend motion design."}
            </p>
          </div>
        </ScrollReveal>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/8 shadow-xs h-full">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-950 mb-3">Our Vision</h3>
              <p className="text-zinc-600 leading-relaxed text-base">
                {settings?.vision ||
                  "To pioneer transformative digital experiences through modern software engineering, artificial intelligence, and world-class UI motion design."}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/8 shadow-xs h-full">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-950 mb-3">Our Mission</h3>
              <p className="text-zinc-600 leading-relaxed text-base">
                {settings?.mission ||
                  "Empower businesses globally with scalable, secure, and visually stunning digital products built with state-of-the-art tech."}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Values & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Values List */}
          <ScrollReveal direction="up" delay={0.4} className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/8 shadow-xs h-full">
              <h3 className="text-2xl font-bold text-zinc-950 mb-8">Our Core Engineering Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4.5 rounded-2xl bg-[#F7F7F5] border border-zinc-200/60">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-zinc-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Summary */}
          <ScrollReveal direction="up" delay={0.5} className="lg:col-span-1">
            <div className="bg-zinc-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider font-mono">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">{stats.projectsCompleted}+</div>
                  <div className="text-xs text-zinc-400 mt-1 uppercase font-mono tracking-wider">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">{stats.satisfiedClients}+</div>
                  <div className="text-xs text-zinc-400 mt-1 uppercase font-mono tracking-wider">Global Clients</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">{stats.teamExperts}</div>
                  <div className="text-xs text-zinc-400 mt-1 uppercase font-mono tracking-wider">Senior Engineers</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">{stats.yearsExperience} Yrs</div>
                  <div className="text-xs text-zinc-400 mt-1 uppercase font-mono tracking-wider">Industry Mastery</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
