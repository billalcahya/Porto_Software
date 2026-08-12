"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Cpu } from "lucide-react";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = document.getElementById("page-loader");
    const logo = document.getElementById("loader-logo");
    const line = document.getElementById("loader-line");

    if (!loader || !logo || !line) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    tl.to(logo, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(line, {
        width: "100%",
        duration: 0.6,
        ease: "power1.inOut",
      })
      .to(loader, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.inOut",
      });
  }, []);

  if (!isLoading) return null;

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center pointer-events-auto"
    >
      <div id="loader-logo" className="opacity-0 scale-90 flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-xl">
          <Cpu className="w-6 h-6 text-blue-500 animate-pulse" />
        </div>
        <span className="text-2xl font-extrabold tracking-wider text-zinc-950 font-mono">
          NEXUS<span className="text-blue-600">.</span>
        </span>
      </div>

      <div className="w-48 h-0.5 bg-zinc-100 rounded-full overflow-hidden relative">
        <div id="loader-line" className="w-0 h-full bg-zinc-900 rounded-full" />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-3">
        CREATIVE DIGITAL ATELIER
      </span>
    </div>
  );
}
