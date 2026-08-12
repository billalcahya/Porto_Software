"use client";

import React from "react";
import { Search, Compass, Code, CheckCircle2, Rocket, ShieldCheck, ArrowRight } from "lucide-react";
import { FigmaIcon } from "@/components/ui/brand-icons";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { IProcessStep } from "@/types";

interface ProcessProps {
  processSteps?: IProcessStep[];
}

export function ProcessSection({ processSteps = [] }: ProcessProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-5 h-5 text-blue-600" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-indigo-600" />;
      case "Figma":
        return <FigmaIcon className="w-5 h-5 text-cyan-600" />;
      case "Code":
        return <Code className="w-5 h-5 text-emerald-600" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-amber-600" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-purple-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <section id="process" className="py-28 bg-[#F7F7F5] text-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-zinc-200 text-zinc-700">
              WORKFLOW & METHODOLOGY
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              PREDICTABLE ENGINEERING PROCESS
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              From initial discovery through deployment and SLA maintenance, every milestone is structured for maximum transparency and speed.
            </p>
          </div>
        </ScrollReveal>

        {/* Process Step Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <ScrollReveal key={step._id || idx} delay={0.08 * idx}>
              <div className="bg-white rounded-3xl p-8 border border-black/8 shadow-xs hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#F7F7F5] border border-zinc-200/80 flex items-center justify-center">
                      {getIcon(step.icon)}
                    </div>
                    <span className="text-3xl font-black font-mono text-zinc-300 group-hover:text-zinc-950 transition-colors">
                      0{step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-zinc-950 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <span>PHASE 0{step.stepNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
