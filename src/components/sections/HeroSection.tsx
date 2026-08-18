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
  const badgeRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const decosRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Noland's Loop Animation for Scroll Indicator Line
    const indicatorAnim = gsap.to(scrollLineRef.current, {
      y: "100%",
      duration: 1.5,
      repeat: -1,
      ease: "power2.inOut",
    });

    const ctx = gsap.context(() => {
      // Noland's Pinned ScrollTrigger Timeline
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

      // 1. Background Zoom (Noland's Signature Effect)
      if (bgRef.current) {
        tl.to(bgRef.current, {
          scale: 1.35,
          ease: "none",
        }, 0);
      }

      // 2. Theater Text Effect (Slide Left & Right and Fade)
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

      // 3. Blob Effect (Vertical Slide and Fade)
      tl.to(blobRef.current, {
        y: -400,
        opacity: 0,
        ease: "none",
      }, 0);

      // 4. Tagline & Description Fade Down
      tl.to(taglineRef.current, {
        y: 50,
        opacity: 0,
        ease: "none",
      }, 0);

      tl.to(descRef.current, {
        y: 50,
        opacity: 0,
        ease: "none",
      }, 0);

      // 5. CTAs & Cards Fade Down
      tl.to(ctaRef.current, {
        y: 50,
        opacity: 0,
        ease: "none",
      }, 0);

      tl.to(cardsRef.current, {
        y: 60,
        opacity: 0,
        ease: "none",
      }, 0);

      // 6. Scroll Indicator Fade Out Early
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "none",
      }, 0);

      // Floating Ambient Animation for Decos
      if (decosRef.current) {
        gsap.to(decosRef.current.children, {
          y: -10,
          repeat: -1,
          yoyo: true,
          duration: 3.5,
          ease: "sine.inOut",
          stagger: 0.3,
        });
      }
    }, containerRef);

    return () => {
      indicatorAnim.kill();
      ctx.revert();
    };
  }, []);

  const heroSubheading = locale === "id"
    ? t("hero.subheading", "Custom enterprise web architecture, AI systems integration, and bespoke mobile engineering tailored for high-growth enterprises.")
    : (settings?.heroSubheading || t("hero.subheading", "Custom enterprise web architecture, AI systems integration, and bespoke mobile engineering tailored for high-growth enterprises."));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#f0f7ff] text-slate-900 flex flex-col justify-between items-center pt-28 sm:pt-36 pb-12 sm:pb-16"
    >
      {/* Live Bubbles Background Wrapper */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform z-0 pointer-events-none"
        style={{
          transform: 'translate3d(0,0,0) scale(1)',
        }}
      >
        <LiveBubblesBackground />
      </div>

      {/* Bright Glass Overlay to guarantee high contrast & readability for dark blue SVGs */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/90 via-white/95 to-slate-50/90 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* Decorative Geometric Elements */}
      <div ref={decosRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-44 left-6 xl:left-16 opacity-30 hidden lg:block">
          <div className="p-4 rounded-2xl bg-sky-200/50 backdrop-blur-xs border border-sky-300/50 shadow-xs">
            <Box className="w-8 h-8 text-sky-700 animate-spin-slow" />
          </div>
        </div>

        <div className="absolute top-40 right-6 xl:right-16 opacity-30 hidden lg:flex flex-col gap-4 items-center">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-lime-500/60 animate-spin-slow" />
          <CircleDot className="w-6 h-6 text-sky-600 animate-pulse" />
          <Triangle className="w-5 h-5 text-lime-600 rotate-12" />
        </div>

        <div className="absolute bottom-24 left-10 hidden xl:flex gap-1.5 opacity-25">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <div className="w-2 h-2 rounded-full bg-lime-500" />
          <div className="w-2 h-2 rounded-full bg-sky-500" />
        </div>
      </div>

      {/* Centralized Layout Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center my-auto">

        {/* 1. TOP BADGE */}
        <div ref={badgeRef} className="mb-6 sm:mb-8 pointer-events-auto z-20">
          <Badge variant="outline" className="px-4.5 py-1.5 text-xs font-mono tracking-widest uppercase gap-2 bg-white/95 border-sky-300 text-slate-900 backdrop-blur-md shadow-xs glow-blue">
            <Sparkles className="w-3.5 h-3.5 text-lime-600 animate-pulse" />
            <span className="gradient-text-vibrant font-extrabold">{t("hero.badge", "CREATIVE DIGITAL ATELIER")}</span>
          </Badge>
        </div>

        {/* 2. MAIN LOGO / BRAND (Noland's Theater SVGs + Organic Lime Blob) */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12 w-full max-w-xl">
          {/* Organic Lime Blob Background Container */}
          <div
            ref={blobRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[280px] sm:w-[380px] md:w-[460px] aspect-square flex items-center justify-center opacity-95 filter drop-shadow-xl will-change-transform"
          >
            <img
              src="/bubble.svg"
              alt="Organic Lime Blob"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Noland's Theater Text Box (DIGITAL THREE) */}
          <div className={`relative z-10 flex flex-col items-center justify-center text-center py-6 sm:py-10 px-6 sm:px-12 ${archivo.className}`}>
            {/* DIGITAL SVG - Slides Left (-400px) on Noland's ScrollTrigger */}
            <div
              ref={text1Ref}
              className="drop-shadow-[0_15px_30px_rgba(0,74,173,0.25)] h-12 sm:h-20 md:h-24 will-change-transform"
            >
              <img
                src="/digital.svg"
                alt="DIGITAL"
                className="h-full w-auto object-contain"
              />
            </div>

            {/* THREE SVG - Slides Right (400px) on Noland's ScrollTrigger */}
            <div
              ref={text2Ref}
              className="drop-shadow-[0_15px_30px_rgba(0,74,173,0.25)] h-12 sm:h-20 md:h-24 mt-2 sm:mt-3 will-change-transform"
            >
              <img
                src="/three.svg"
                alt="THREE"
                className="h-full w-auto object-contain"
              />
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

      {/* Noland's Signature Scroll Indicator Container */}
      <div
        ref={scrollIndicatorRef}
        className="mt-6 flex flex-col items-center gap-2 text-slate-600 will-change-transform z-20 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[3px] font-bold text-sky-900">Scroll</span>
        <div className="w-[1px] h-10 bg-sky-300 relative overflow-hidden">
          <div
            ref={scrollLineRef}
            className="w-full h-1/2 bg-sky-600 absolute top-[-50%] left-0"
          />
        </div>
      </div>
    </section>
  );
}
