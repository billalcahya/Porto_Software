"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { IPricingPlan } from "@/types";

interface PricingProps {
  pricingPlans?: IPricingPlan[];
}

export function PricingSection({ pricingPlans = [] }: PricingProps) {
  return (
    <section className="py-28 bg-white text-zinc-900 relative border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-zinc-50 border-zinc-200 text-zinc-700">
              TRANSPARENT INVESTMENT
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              FLEXIBLE DEVELOPMENT PACKAGES
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Clear scope deliverables, no hidden fees, and production-ready guarantees for every engagement.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <ScrollReveal key={plan._id || idx} delay={0.1 * idx}>
              <div
                className={`bg-white rounded-3xl p-8 sm:p-10 border flex flex-col justify-between h-full relative transition-all duration-300 ${
                  plan.highlighted
                    ? "border-zinc-950 shadow-2xl bg-zinc-950 text-white"
                    : "border-black/8 bg-white text-zinc-900 shadow-xs hover:border-zinc-300"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="px-4 py-1 text-[11px] font-mono font-bold uppercase bg-blue-600 text-white border-none shadow-md">
                      <Sparkles className="w-3 h-3 mr-1 inline" /> MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className={`text-2xl font-black uppercase mb-2 ${plan.highlighted ? "text-white" : "text-zinc-950"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs min-h-10 leading-relaxed mb-8 ${plan.highlighted ? "text-zinc-400" : "text-zinc-600"}`}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${plan.highlighted ? "text-white" : "text-zinc-950"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs uppercase font-mono tracking-wider ${plan.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>
                      / {plan.billing}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className={`space-y-3.5 pt-6 border-t mb-8 ${plan.highlighted ? "border-zinc-800" : "border-zinc-100"}`}>
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className={`flex items-center gap-3 text-xs font-semibold ${plan.highlighted ? "text-zinc-200" : "text-zinc-700"}`}>
                        <div className={`p-1 rounded-full ${plan.highlighted ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <MagneticButton strength={0.2} className="w-full">
                    <Link href="/#contact">
                      <Button
                        variant={plan.highlighted ? "default" : "outline"}
                        className={`w-full justify-center py-6 text-xs font-bold uppercase tracking-wider rounded-full shadow-md ${
                          plan.highlighted
                            ? "bg-white text-zinc-950 hover:bg-zinc-200"
                            : "bg-zinc-950 text-white hover:bg-zinc-800 border-none"
                        }`}
                      >
                        {plan.cta || "Get Started"}
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
