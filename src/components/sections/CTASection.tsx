"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/MotionWrapper";

export function CTASection() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background glow aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-87.5 bg-linear-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-12 sm:p-16 border-zinc-800/80 bg-zinc-950/80 aurora-bg">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Ready to Architect Your Digital Superiority?
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Partner with senior architects and engineers to launch custom software solutions that leave competitors behind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact">
                <Button size="lg" variant="glow" className="px-8 py-6 text-base font-bold gap-2">
                  Initiate Discovery Call
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
