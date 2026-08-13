"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";
import { IFAQ } from "@/types";

interface FAQProps {
  faqs?: IFAQ[];
}

export function FAQSection({ faqs = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-[#f0f7ff] text-slate-900 relative border-t border-sky-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
