"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { ITestimonial } from "@/types";

interface TestimonialProps {
  testimonials?: ITestimonial[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialProps) {
  return (
    <section className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">CLIENT TESTIMONIALS</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Endorsed by Engineering & Product Leaders
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Read how our custom software architecture and liquid UI design elevated business benchmarks for global companies.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <ScrollReveal key={item._id || idx} delay={0.1 * idx}>
              <div className="glass-card rounded-3xl p-8 bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 flex flex-col justify-between h-full group">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Message Quote */}
                  <p className="text-sm text-zinc-300 leading-relaxed italic mb-8 relative">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-900">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                    {item.avatar ? (
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-white bg-blue-600">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {item.position}, <span className="text-zinc-300">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
