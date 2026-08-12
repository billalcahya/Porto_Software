"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { IFAQ } from "@/types";

interface FAQProps {
  faqs?: IFAQ[];
}

export function FAQSection({ faqs = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28 bg-[#F7F7F5] text-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-zinc-200 text-zinc-700">
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              EVERYTHING YOU NEED TO KNOW
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
                className="bg-white border-black/8 shadow-xs rounded-2xl"
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
