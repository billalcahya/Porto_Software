"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";

export function TrustedBySection() {
  const brands = [
    "AURA CAPITAL",
    "VORTEX NETWORKS",
    "HEALTHCORP GLOBAL",
    "CYBERPULSE SYSTEMS",
    "SOLARIS AI",
    "QUANTUM LABS",
  ];

  return (
    <section className="py-12 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-xs font-mono tracking-widest text-zinc-400 uppercase mb-8">
            TRUSTED BY FORWARD-THINKING ENTERPRISES & SCALE-UPS WORLDWIDE
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="text-sm font-extrabold tracking-widest font-mono text-zinc-500 hover:text-zinc-950 transition-colors cursor-default uppercase"
              >
                {brand}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
