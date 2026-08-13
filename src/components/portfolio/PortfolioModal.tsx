/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { X, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Layers, Sparkles, Calendar, User, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { IPortfolio } from "@/types";

interface PortfolioModalProps {
  item: IPortfolio | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ item, isOpen, onClose }: PortfolioModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Smooth Animated Close using GSAP
  const handleAnimatedClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (!overlayRef.current || !modalRef.current) {
      onClose();
      isClosingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        isClosingRef.current = false;
      },
    });

    tl.to(modalRef.current, {
      scale: 0.92,
      y: 25,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "<"
    );
  };

  // Lock body scroll and trigger GSAP Entrance Animation
  useEffect(() => {
    if (isOpen && item) {
      document.body.style.overflow = "hidden";
      setActiveImgIndex(0);
      isClosingRef.current = false;

      const overlay = overlayRef.current;
      const modal = modalRef.current;

      if (overlay && modal) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" }
          );

          gsap.fromTo(
            modal,
            { scale: 0.86, y: 35, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
          );

          const items = modal.querySelectorAll(".gsap-modal-item");
          if (items.length > 0) {
            gsap.fromTo(
              items,
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power2.out", delay: 0.12 }
            );
          }
        }, modalRef);

        return () => ctx.revert();
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, item]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleAnimatedClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const allImages = Array.from(
    new Set([item.thumbnail, ...(item.gallery || [])].filter((img): img is string => Boolean(img) && typeof img === "string"))
  );

  const activeImage = allImages[activeImgIndex] || item.thumbnail;

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-sky-950/20 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={handleAnimatedClose}
    >
      {/* Modal Card - Pure Crystal Glassmorphism Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white/55 backdrop-blur-3xl border border-white/90 shadow-[0_20px_60px_rgba(2,132,199,0.15)] rounded-3xl overflow-hidden flex flex-col my-auto max-h-[90vh] text-slate-950 transition-all transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Crystal Glass Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/60 flex items-center justify-between bg-white/35 backdrop-blur-md shrink-0 gsap-modal-item">
          <div className="flex items-center gap-3">
            <Badge className="bg-lime-400 text-slate-950 border-none font-mono text-xs uppercase tracking-wider px-3 py-1 font-extrabold shadow-xs">
              <Sparkles className="w-3 h-3 inline mr-1 text-slate-950" />
              {item.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 bg-white/50 px-3 py-1 rounded-full border border-white/80 shadow-2xs backdrop-blur-xs">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              {item.year}
            </div>
          </div>

          <button
            onClick={handleAnimatedClose}
            className="p-2.5 rounded-full bg-white/70 border border-white/90 text-slate-800 hover:text-slate-950 hover:bg-white hover:border-lime-400 transition-all shadow-xs backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Gallery Display */}
          <div className="space-y-4 gsap-modal-item">
            <div className="relative h-64 sm:h-96 md:h-112 w-full rounded-2xl overflow-hidden bg-white/30 backdrop-blur-md border border-white/80 shadow-md group">
              <Image
                src={activeImage}
                alt={`${item.title} Screenshot ${activeImgIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover transition-all duration-500"
                priority
              />

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-slate-950 hover:bg-white border border-white/90 backdrop-blur-md shadow-md opacity-90 hover:opacity-100 transition-all"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-slate-950 hover:bg-white border border-white/90 backdrop-blur-md shadow-md opacity-90 hover:opacity-100 transition-all"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 right-4 text-xs font-mono font-bold text-slate-950 bg-white/80 px-3 py-1 rounded-full border border-white/90 backdrop-blur-md shadow-xs">
                    {activeImgIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIndex === idx
                        ? "border-lime-500 ring-2 ring-lime-400/50 scale-105 shadow-md"
                        : "border-white/80 opacity-70 hover:opacity-100 hover:border-sky-400"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Client Headline */}
          <div className="gsap-modal-item">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-sky-800 tracking-widest mb-1.5">
              <User className="w-3.5 h-3.5 text-lime-600" />
              Client: {item.client}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-950 tracking-tight leading-tight">
              {item.title}
            </h2>
          </div>

          {/* Ordered Content Sections: Description -> Features -> Tech Stack */}
          <div className="space-y-8 pt-4 border-t border-white/60">
            {/* 1. Description / Overview */}
            <div className="space-y-3 gsap-modal-item">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                Project Description & Overview
              </h3>
              <div className="bg-white/45 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-xs">
                <p className="text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                  {item.fullDescription || item.description}
                </p>
              </div>
            </div>

            {/* 2. Key Features (Below Description) */}
            {item.features && item.features.length > 0 && (
              <div className="space-y-3 gsap-modal-item">
                <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-600" />
                  Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/55 backdrop-blur-md border border-white/90 shadow-2xs text-xs font-semibold text-slate-900"
                    >
                      <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Tech Stack (Below Features) */}
            <div className="space-y-3 gsap-modal-item">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Technologies Used & Architecture
              </h3>
              <div className="flex flex-wrap gap-2.5 bg-white/45 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xs">
                {item.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-white/80 border border-lime-300/80 text-slate-950 shadow-2xs backdrop-blur-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/60 gsap-modal-item">
              {item.projectUrl && (
                <a
                  href={item.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-50 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-lime-400 text-slate-950 hover:bg-lime-300 font-extrabold text-xs uppercase tracking-wider shadow-md glow-lime transition-all"
                >
                  Visit Live Application
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-45 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 text-white font-extrabold text-xs uppercase tracking-wider shadow-md border-none"
                >
                  <GithubIcon className="w-4 h-4 fill-current text-white" />
                  View Repository
                </a>
              )}

              <Link
                href={`/portfolio/${item.slug}`}
                onClick={handleAnimatedClose}
                className="flex-1 min-w-50 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/80 border border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white font-extrabold text-xs uppercase tracking-wider shadow-2xs transition-all backdrop-blur-xs"
              >
                Full Case Study Detail
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
