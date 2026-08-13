"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export function CTASection() {
  const { t, locale } = useLanguage();

  return (
    <section className="py-24 bg-[#e8f2ff] text-slate-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal>
          <div className="rounded-3xl p-12 sm:p-16 bg-slate-950 text-white shadow-2xl relative overflow-hidden border border-slate-800 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-lime-500/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="px-4 py-1.5 text-xs font-mono font-black uppercase tracking-widest bg-lime-400 text-slate-950 rounded-full shadow-md">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-slate-950" /> {t("hero.badge", "CREATIVE DIGITAL ATELIER")}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                {locale === "id" ? (
                  <>SIAP MEMBANGUN <span className="gradient-text-vibrant">KEUNGGULAN DIGITAL ANDA?</span></>
                ) : (
                  <>READY TO ARCHITECT YOUR <span className="gradient-text-vibrant">DIGITAL SUPERIORITY?</span></>
                )}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                {locale === "id"
                  ? "Bekerja sama dengan insinyur senior dan pengembang kreatif untuk meluncurkan solusi perangkat lunak yang menetapkan tolok ukur industri."
                  : "Partner with senior architects and creative developers to launch bespoke software solutions that set industry benchmarks."}
              </p>

              <div className="flex items-center justify-center">
                <MagneticButton>
                  <Link href="/#contact">
                    <Button size="lg" className="px-8 py-7 text-sm font-bold uppercase tracking-wider bg-lime-400 text-slate-950 hover:bg-lime-300 rounded-full gap-3 shadow-xl glow-lime border-none">
                      {locale === "id" ? "Mulai Konsultasi Proyek" : "Initiate Discovery Call"}
                      <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
