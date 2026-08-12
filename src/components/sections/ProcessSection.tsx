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
        return <Search className="w-5 h-5 text-blue-400" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-indigo-400" />;
      case "Figma":
        return <FigmaIcon className="w-5 h-5 text-cyan-400" />;
      case "Code":
        return <Code className="w-5 h-5 text-emerald-400" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-amber-400" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-purple-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">WORKFLOW & METHODOLOGY</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Predictable Engineering Process
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              From initial discovery through deployment and SLA maintenance, every milestone is structured for maximum transparency and speed.
            </p>
          </div>
        </ScrollReveal>

        {/* Process Step Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <ScrollReveal key={step._id || idx} delay={0.08 * idx}>
              <div className="glass-card rounded-3xl p-6 bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 relative flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      {getIcon(step.icon)}
                    </div>
                    <span className="text-2xl font-black font-mono text-zinc-700 group-hover:text-blue-500 transition-colors">
                      0{step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <span>Phase 0{step.stepNumber}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
