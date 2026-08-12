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
    <section className="py-28 bg-white text-zinc-900 relative border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-zinc-50 border-zinc-200 text-zinc-700">
              CLIENT TESTIMONIALS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              ENDORSED BY ENGINEERING & PRODUCT LEADERS
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Read how our custom software architecture and liquid UI design elevated business benchmarks for global companies.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <ScrollReveal key={item._id || idx} delay={0.1 * idx}>
              <div className="bg-[#FAFAFA] rounded-3xl p-8 sm:p-10 border border-black/8 hover:border-zinc-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Message Quote */}
                  <p className="text-base text-zinc-700 leading-relaxed italic mb-8 relative">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-200/80">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200 shrink-0 border border-zinc-300 shadow-xs">
                    {item.avatar ? (
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-white bg-zinc-950">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-500">
                      {item.position}, <span className="font-semibold text-zinc-800">{item.company}</span>
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
