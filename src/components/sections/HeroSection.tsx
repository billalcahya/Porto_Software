"use client";

import React, { useEffect, useRef } from "react";
import { Archivo_Black } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ISiteSettings } from "@/types";
import { LiveBubblesBackground } from "@/components/webgl/LiveBubblesBackground";

const archivo = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });

interface HeroProps {
  settings?: ISiteSettings;
}

export function HeroSection({ settings }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Scroll Indicator Animation (Loop)
    const indicatorAnim = gsap.to(scrollLineRef.current, {
      y: "100%",
      duration: 1.5,
      repeat: -1,
      ease: "power2.inOut",
    });

    // Scroll-driven Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      // Background Zoom
      tl.to(bgRef.current, {
        scale: 1.35,
        ease: "none",
      }, 0);

      // Theater Text Effect (Slide and Fade)
      tl.to(text1Ref.current, {
        x: -400,
        opacity: 0,
        ease: "none",
      }, 0);

      tl.to(text2Ref.current, {
        x: 400,
        opacity: 0,
        ease: "none",
      }, 0);

      // Bubble Effect (Vertical Slide and Fade)
      tl.to(bubbleRef.current, {
        y: -400,
        opacity: 0,
        ease: "none",
      }, 0);

      // Subtitle Fade Down
      tl.to(subtitleRef.current, {
        y: 50,
        opacity: 0,
        ease: "none",
      }, 0);

      // Scroll Indicator Fade Out Early
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.2, // relative to the total timeline, it fades out quickly
        ease: "none",
      }, 0);
    }, containerRef);

    return () => {
      indicatorAnim.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Live Bubbles Background Wrapper */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: 'translate3d(0,0,0) scale(1)',
        }}
      >
        <LiveBubblesBackground />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.7)] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">

        {/* Theater Text */}
        <div className={`relative flex flex-col items-center justify-center leading-[0.85] text-center w-full ${archivo.className}`}>
          <div
            ref={text1Ref}
            className="drop-shadow-2xl will-change-transform"
            style={{
              height: 'clamp(3rem, 12vw, 10rem)',
              transform: 'translate3d(0,0,0)'
            }}
          >
            <img
              src="/digital.svg"
              alt="DIGITAL"
              className="h-full w-auto object-contain"
            />
          </div>
          <div
            ref={text2Ref}
            className="drop-shadow-2xl will-change-transform"
            style={{
              height: 'clamp(3rem, 12vw, 10rem)',
              transform: 'translate3d(0,0,0)'
            }}
          >
            <img
              src="/three.svg"
              alt="three"
              className="h-full w-auto object-contain"
            />
          </div>
          {/* Bubble Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-[65vw] md:w-[50vw] max-w-[600px] aspect-square z-[-1]">
            <div ref={bubbleRef} className="w-full h-full will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}>
              <img src="/bubble.svg" alt="bubble background" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="mt-16 uppercase tracking-[3px] opacity-70 font-light text-white text-[10px] sm:text-xs md:text-sm text-center px-4 will-change-transform"
        >
          Creative Developer • Designer • Storyteller
        </div>

      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50 will-change-transform"
      >
        <span className="text-[10px] uppercase tracking-[3px] font-light">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div
            ref={scrollLineRef}
            className="w-full h-1/2 bg-white absolute top-[-50%] left-0"
          />
        </div>
      </div>
    </section>
  );
}
