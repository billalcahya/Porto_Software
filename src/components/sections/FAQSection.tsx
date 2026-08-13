"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";
import { IFAQ } from "@/types";

import { DetailShaderCanvas } from "@/components/webgl/DetailShaderCanvas";
import { AnimatedGeometryBackground } from "@/components/webgl/AnimatedGeometryBackground";

interface FAQProps {
  faqs?: IFAQ[];
  isEmbedded?: boolean;
}

export function FAQSection({ faqs = [], isEmbedded = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <section className={`py-28 relative ${isEmbedded ? "bg-transparent" : "bg-[#F7F7F5] overflow-hidden border-t border-black/5"}`}>
      {!isEmbedded && (
        <>
          {/* WebGL GLSL Shader Liquid Silk Background */}
          <DetailShaderCanvas />

          {/* Tech Blueprint Dot Grid Pattern */}
          <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none z-0" />

          {/* 3D Blueprint Wireframe SVG Geometry Suite */}
          <AnimatedGeometryBackground />

          {/* Ambient Glow Orbs */}
          <div className="orb-glow w-[36rem] h-[36rem] bg-sky-400/25 top-10 left-[5%] pointer-events-none" />
          <div className="orb-glow w-[32rem] h-[32rem] bg-lime-400/25 top-1/2 right-[3%] pointer-events-none" />
        </>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-sky-300 text-slate-900 font-bold">
              {t("faq.badge", "FREQUENTLY ASKED QUESTIONS")}
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-slate-950 font-sans">
              <GsapTextReveal text={t("faq.heading", "EVERYTHING YOU NEED TO KNOW")} />
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq._id || idx}
                title={faq.question}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.answer}
              </AccordionItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
