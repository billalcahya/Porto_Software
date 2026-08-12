"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPricingPlan } from "@/types";

interface PricingProps {
  pricingPlans?: IPricingPlan[];
}

export function PricingSection({ pricingPlans = [] }: PricingProps) {
  return (
    <section className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">TRANSPARENT INVESTMENT</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Flexible Development Packages
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Clear scope deliverables, no hidden fees, and production-ready guarantees for every engagement.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <ScrollReveal key={plan._id || idx} delay={0.1 * idx}>
              <div
                className={`glass-card rounded-3xl p-8 bg-zinc-950/80 border-zinc-800/80 flex flex-col justify-between h-full relative transition-all duration-300 ${
                  plan.highlighted
                    ? "border-blue-500/80 shadow-2xl shadow-blue-600/20 bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950"
                    : "hover:border-zinc-700"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="glow" className="px-4 py-1 text-xs bg-blue-600 text-white border-blue-400">
                      <Sparkles className="w-3 h-3 mr-1 inline" /> MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 min-h-9 leading-relaxed mb-6">{plan.description}</p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                    <span className="text-xs text-zinc-500 uppercase font-mono">/ {plan.billing}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 pt-6 border-t border-zinc-900 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs text-zinc-300">
                        <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link href="/#contact">
                    <Button
                      variant={plan.highlighted ? "glow" : "outline"}
                      className="w-full justify-center py-6 text-sm font-bold"
                    >
                      {plan.cta || "Get Started"}
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
