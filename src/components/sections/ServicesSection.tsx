"use client";

import React from "react";
import { Code2, Smartphone, Cpu, Cloud, Layers, Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { IService } from "@/types";

interface ServicesProps {
  services?: IService[];
}

export function ServicesSection({ services = [] }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-blue-400" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-indigo-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "Cloud":
        return <Cloud className="w-6 h-6 text-purple-400" />;
      default:
        return <Layers className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-zinc-950 text-white relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-125 h-125 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">OUR CAPABILITIES</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Bespoke Software Engineering Services
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              We design, build, deploy, and scale high-impact software tailored specifically for mission-critical business requirements.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service._id || index} delay={0.1 * index}>
              <div className="glass-card rounded-3xl p-8 bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                      {getIcon(service.icon)}
                    </div>
                    {service.featured && (
                      <Badge variant="glow" className="text-[10px]">FEATURED</Badge>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Checkmarks */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2.5 mb-6 pt-4 border-t border-zinc-900">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
