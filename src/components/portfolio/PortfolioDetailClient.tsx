"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Building,
  Layers,
  CheckCircle2,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPortfolio } from "@/types";
import { DetailShaderCanvas } from "@/components/webgl/DetailShaderCanvas";
import { AnimatedGeometryBackground } from "@/components/webgl/AnimatedGeometryBackground";

interface PortfolioDetailClientProps {
  portfolio: IPortfolio;
}

export function PortfolioDetailClient({ portfolio }: PortfolioDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metaGridRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Gallery Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Lightbox Popup State
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const lightboxOverlayRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLDivElement>(null);
  const isClosingLightboxRef = useRef(false);

  // Consolidate thumbnail and gallery images into a unique list
  const allImages = Array.from(
    new Set([portfolio.thumbnail, ...(portfolio.gallery || [])].filter((img): img is string => Boolean(img) && typeof img === "string"))
  );

  // GSAP Entrance & ScrollTrigger Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power2.out" }
        );
      }

      // 2. Meta Grid Stagger Entrance
      if (metaGridRef.current) {
        gsap.fromTo(
          metaGridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metaGridRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. In-Depth Story Card Reveal
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Key Features Grid Cards Stagger Reveal
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll(".gsap-feature-card");
        if (featureCards.length > 0) {
          gsap.fromTo(
            featureCards,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: featuresRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 5. Technology Badges Stagger Reveal
      if (techRef.current) {
        const techBadges = techRef.current.querySelectorAll(".gsap-tech-badge");
        if (techBadges.length > 0) {
          gsap.fromTo(
            techBadges,
            { opacity: 0, scale: 0.9, y: 15 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: techRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 6. Interface Gallery Cards Stagger Reveal
      if (galleryRef.current) {
        const galleryItems = galleryRef.current.querySelectorAll(".gsap-gallery-item");
        if (galleryItems.length > 0) {
          gsap.fromTo(
            galleryItems,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [portfolio]);

  // Lightbox GSAP Entrance & Exit Logic
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
      isClosingLightboxRef.current = false;

      if (lightboxOverlayRef.current && lightboxImageRef.current) {
        gsap.fromTo(
          lightboxOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          lightboxImageRef.current,
          { scale: 0.92, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  // Close Lightbox
  const closeLightbox = () => {
    if (isClosingLightboxRef.current) return;
    isClosingLightboxRef.current = true;

    if (lightboxOverlayRef.current && lightboxImageRef.current) {
      gsap.to(lightboxImageRef.current, {
        scale: 0.95,
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(lightboxOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveImageIndex(null);
          isClosingLightboxRef.current = false;
        },
      });
    } else {
      setActiveImageIndex(null);
      isClosingLightboxRef.current = false;
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
      }
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, allImages.length]);

  const totalGallery = portfolio.gallery?.length || 0;
  const maxCarouselIndex = Math.max(0, totalGallery - 3);

  return (
    <main ref={containerRef} className="relative pt-36 pb-28 bg-[#F7F7F5] text-zinc-900 min-h-screen overflow-hidden">
      {/* Dynamic WebGL GLSL Liquid Silk Shader Canvas */}
      <DetailShaderCanvas />

      {/* Tech Blueprint Dot Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none z-0" />

      {/* 3D Blueprint Wireframe SVG Geometry Suite */}
      <AnimatedGeometryBackground />

      {/* Ambient Glow Orbs */}
      <div className="orb-glow w-[38rem] h-[38rem] bg-sky-300/25 top-10 left-[8%] pointer-events-none" />
      <div className="orb-glow w-[34rem] h-[34rem] bg-lime-300/25 top-1/2 right-[4%] pointer-events-none" />
      <div className="orb-glow w-[42rem] h-[42rem] bg-cyan-300/20 bottom-10 left-[15%] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-600 hover:text-zinc-950 transition-colors mb-8 px-4 py-2 rounded-full bg-white/90 border border-black/8 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-sky-600" /> Back to Case Studies
        </Link>

        {/* Header */}
        <div ref={headerRef} className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-lime-400 text-slate-950 border-none font-mono text-xs uppercase px-3.5 py-1 font-extrabold shadow-2xs">
              <Sparkles className="w-3 h-3 inline mr-1 text-slate-950" />
              {portfolio.category}
            </Badge>
            <span className="text-xs font-mono font-bold text-zinc-600 bg-white/90 px-3 py-1 rounded-full border border-black/8 shadow-2xs">
              {portfolio.year}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-950 leading-tight font-sans">
            {portfolio.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-4xl font-normal">
            {portfolio.description}
          </p>
        </div>

        {/* Static Hero Thumbnail Image */}
        <div
          onClick={() => setActiveImageIndex(0)}
          className="relative h-72 sm:h-112 lg:h-[520px] xl:h-[580px] w-full rounded-3xl overflow-hidden border border-black/8 shadow-xl mb-12 bg-zinc-100 cursor-pointer group"
        >
          <Image
            src={portfolio.thumbnail}
            alt={portfolio.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1380px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg">
              <Maximize2 className="w-4 h-4 text-sky-600" /> Click to Expand Fullscreen
            </span>
          </div>
        </div>

        {/* Meta Grid & Links */}
        <div
          ref={metaGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-10 rounded-3xl bg-white/90 border border-black/8 shadow-xs mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shadow-2xs">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase block">Client</span>
              <span className="text-sm font-bold text-zinc-950">{portfolio.client}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-lime-50 text-lime-700 border border-lime-100 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase block">Completion</span>
              <span className="text-sm font-bold text-zinc-950">{portfolio.year}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-start md:justify-end">
            {portfolio.projectUrl && (
              <a href={portfolio.projectUrl} target="_blank" rel="noreferrer">
                <Button variant="default" size="sm" className="gap-2 bg-lime-400 text-slate-950 hover:bg-lime-300 rounded-full font-extrabold uppercase tracking-wider text-xs px-5 py-5 shadow-xs border-none">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Button>
              </a>
            )}
            {portfolio.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="default" size="sm" className="gap-2 rounded-full bg-zinc-950 text-white font-extrabold uppercase tracking-wider text-xs px-5 py-5 shadow-xs border-none">
                  <GithubIcon className="w-4 h-4 fill-current text-white" /> Repository
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* In-Depth Architectural Case Study & Story */}
        <div
          ref={storyRef}
          className="space-y-4 mb-12 bg-white/90 p-8 sm:p-12 rounded-3xl border border-black/8 shadow-xs"
        >
          <h2 className="text-xl font-bold uppercase text-zinc-950 flex items-center gap-2 font-mono">
            <Layers className="w-5 h-5 text-sky-600" />
            Full Architectural Case Study & Story
          </h2>
          <div className="text-base text-zinc-800 leading-relaxed font-normal whitespace-pre-line space-y-4">
            {portfolio.fullDescription || portfolio.description}
          </div>
        </div>

        {/* Key Features & Deliverables */}
        {portfolio.features && portfolio.features.length > 0 && (
          <div ref={featuresRef} className="space-y-4 mb-12">
            <h3 className="text-lg font-bold uppercase text-zinc-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-lime-600" />
              Key Features & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.features.map((feat: string, idx: number) => (
                <div
                  key={idx}
                  className="gsap-feature-card flex items-start gap-3 p-4 rounded-2xl bg-white/90 border border-black/8 shadow-2xs text-sm font-semibold text-zinc-900 hover:border-lime-400 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div ref={techRef} className="space-y-4 mb-12">
          <h3 className="text-lg font-bold uppercase text-zinc-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" /> Technology Architecture
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {portfolio.technologies.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="gsap-tech-badge px-4 py-2 rounded-full bg-white/90 border border-black/8 text-xs font-mono font-bold text-zinc-900 shadow-2xs inline-block hover:border-sky-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interface Gallery Carousel */}
        {portfolio.gallery && portfolio.gallery.length > 0 && (
          <div ref={galleryRef} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold uppercase text-zinc-950 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-sky-600" />
                  Interface & System Gallery ({totalGallery})
                </h3>
                {totalGallery > 3 && (
                  <span className="text-xs font-mono font-bold text-zinc-600 bg-white/90 px-3 py-1 rounded-full border border-black/8 shadow-2xs">
                    {carouselIndex + 1}–{Math.min(carouselIndex + 3, totalGallery)} of {totalGallery}
                  </span>
                )}
              </div>

              {/* Navigation Arrows if > 3 items */}
              {totalGallery > 3 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
                    disabled={carouselIndex === 0}
                    className={`p-2.5 rounded-full border border-zinc-200 transition-all ${
                      carouselIndex === 0
                        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed border-zinc-200"
                        : "bg-white text-zinc-900 hover:bg-zinc-950 hover:text-white shadow-xs"
                    }`}
                    aria-label="Previous Gallery Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarouselIndex((prev) => Math.min(maxCarouselIndex, prev + 1))}
                    disabled={carouselIndex >= maxCarouselIndex}
                    className={`p-2.5 rounded-full border border-zinc-200 transition-all ${
                      carouselIndex >= maxCarouselIndex
                        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed border-zinc-200"
                        : "bg-white text-zinc-900 hover:bg-zinc-950 hover:text-white shadow-xs"
                    }`}
                    aria-label="Next Gallery Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Carousel Track */}
            <div className="overflow-hidden p-1 -m-1">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: totalGallery > 3 ? `translateX(-${carouselIndex * (100 / 3 + 2)}%)` : "none",
                }}
              >
                {portfolio.gallery.map((img: string, idx: number) => {
                  const imgGlobalIdx = allImages.indexOf(img) !== -1 ? allImages.indexOf(img) : idx + 1;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(imgGlobalIdx)}
                      className="gsap-gallery-item relative h-60 sm:h-72 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 rounded-3xl overflow-hidden border border-black/8 bg-zinc-100 shadow-xs group cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`${portfolio.title} screenshot ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
                          <Maximize2 className="w-3.5 h-3.5 text-sky-600" /> View Fullscreen
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN POP-UP LIGHTBOX VIEWER */}
      {activeImageIndex !== null && (
        <div
          ref={lightboxOverlayRef}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxImageRef}
            className="relative w-full max-w-6xl xl:max-w-7xl max-h-[90vh] bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2 sm:p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="w-full flex items-center justify-between p-3 sm:p-4 border-b border-white/15 bg-white/5 rounded-2xl mb-2 backdrop-blur-md">
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
                {portfolio.title} — Screenshot {activeImageIndex + 1} of {allImages.length}
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/15 text-white hover:bg-white hover:text-slate-950 transition-all border border-white/20 shadow-xs"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Full Image Container */}
            <div className="relative w-full h-[60vh] sm:h-[72vh] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center">
              <Image
                src={allImages[activeImageIndex]}
                alt={`${portfolio.title} Full Resolution Screenshot ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-white hover:text-slate-950 text-white border border-white/30 backdrop-blur-md transition-all shadow-lg"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-white hover:text-slate-950 text-white border border-white/30 backdrop-blur-md transition-all shadow-lg"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
