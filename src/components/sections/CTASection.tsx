"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function CTASection() {
  return (
    <section className="py-24 bg-[#F7F7F5] text-zinc-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal>
          <div className="rounded-3xl p-12 sm:p-16 bg-zinc-950 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest bg-zinc-800 text-blue-400 rounded-full border border-zinc-700">
                <Sparkles className="w-3.5 h-3.5 inline mr-1 text-blue-400 animate-pulse" /> NEXT-GEN DEVELOPMENT
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              Ready to Architect Your Digital Superiority?
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Partner with senior architects and creative developers to launch bespoke software solutions that set industry benchmarks.
            </p>

            <div className="flex items-center justify-center">
              <MagneticButton strength={0.25}>
                <Link href="/#contact" data-cursor="LET'S TALK">
                  <Button size="lg" className="px-8 py-7 text-sm font-bold uppercase tracking-wider bg-white text-zinc-950 hover:bg-zinc-200 rounded-full gap-3 shadow-xl">
                    Initiate Discovery Call
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
