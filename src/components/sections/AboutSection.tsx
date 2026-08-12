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
    <section id="about" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">ABOUT NEXUS LABS</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Engineering High-Throughput Software with Cinematic Aesthetics
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              {settings?.description ||
                "We bridge the gap between heavy enterprise backend engineering and fluid, interactive frontend motion design."}
            </p>
          </div>
        </ScrollReveal>

          {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-zinc-800/80 bg-zinc-950/70 h-full">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                {settings?.vision ||
                  "To pioneer transformative digital experiences through modern software engineering, artificial intelligence, and world-class UI motion design."}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-zinc-800/80 bg-zinc-950/70 h-full">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
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
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-zinc-800/80 bg-zinc-950/70 h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Our Core Engineering Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-zinc-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Summary */}
          <ScrollReveal direction="up" delay={0.5} className="lg:col-span-1">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-zinc-800/80 bg-linear-to-br from-zinc-900 to-zinc-950 h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold text-white mb-6">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{stats.projectsCompleted}+</div>
                  <div className="text-xs text-zinc-400 mt-1">Projects Shipped</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">{stats.satisfiedClients}+</div>
                  <div className="text-xs text-zinc-400 mt-1">Global Clients</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">{stats.teamExperts}</div>
                  <div className="text-xs text-zinc-400 mt-1">Senior Engineers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">{stats.yearsExperience} Yrs</div>
                  <div className="text-xs text-zinc-400 mt-1">Industry Mastery</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
