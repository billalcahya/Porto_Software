"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function CinematicTicker() {
  const items = [
    "SOFTWARE ARCHITECTURE",
    "ENTERPRISE AI PLATFORMS",
    "HIGH-SPEED NEXT.JS 16",
    "LIQUID MOTION UI",
    "ZERO-TRUST SECURITY",
    "CLOUD DEVOPS ARCHITECTURE",
  ];

  return (
    <div className="py-5 bg-slate-950 text-white overflow-hidden border-y border-slate-800 shadow-md transform-gpu">
      <div className="flex whitespace-nowrap animate-marquee transform-gpu">
        {Array.from({ length: 2 }).map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 shrink-0 px-4">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-widest text-slate-200">
                  {item}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
