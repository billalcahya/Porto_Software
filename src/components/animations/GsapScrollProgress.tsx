"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const ctx = gsap.context(() => {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="fixed top-0 left-0 right-0 h-1 z-[100] bg-linear-to-r from-blue-600 via-sky-400 to-lime-400 origin-left scale-x-0 pointer-events-none shadow-xs"
    />
  );
}
