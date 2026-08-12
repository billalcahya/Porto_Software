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
    <section className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">FREQUENTLY ASKED QUESTIONS</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Clear answers regarding timeline expectations, intellectual property ownership, and technical standards.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion FAQ items */}
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
