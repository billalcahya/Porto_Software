/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

import Image from "next/image";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const { progress, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  
  const isFinished = useRef(false);

  // Sync displayProgress smoothly to actual progress
  useEffect(() => {
    let targetProgress = total > 0 ? progress : 100;

    gsap.to({ val: displayProgress }, {
      val: targetProgress,
      duration: 0.5,
      onUpdate: function () {
        const currentVal = Math.round(this.targets()[0].val);
        setDisplayProgress(currentVal);
        
        const line = document.getElementById("loader-line");
        if (line) {
          line.style.width = `${currentVal}%`;
        }
      }
    });

    if (targetProgress >= 100 && !isFinished.current) {
      isFinished.current = true;
      const loader = document.getElementById("page-loader");
      const logo = document.getElementById("loader-logo");

      const tl = gsap.timeline({
        delay: 0.4, // give it a moment to show 100%
        onComplete: () => {
          setIsLoading(false);
        },
      });

      tl.to(logo, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(loader, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.2");
    }
  }, [progress, total]);



  if (!isLoading) return null;

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[100] bg-[#FAFAFA] flex flex-col items-center justify-center pointer-events-auto"
    >
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>

      <div id="loader-logo" className="animate-fade-in flex flex-col items-center gap-6 mb-8 text-center">
        {/* Real Loading Percentage */}
        <span className="text-6xl sm:text-7xl font-light tracking-tighter text-zinc-950">
          {displayProgress}<span className="text-zinc-300 font-extralight">%</span>
        </span>
      </div>

      <div className="w-48 sm:w-64 h-[1px] bg-black/10 overflow-hidden relative">
        <div id="loader-line" className="w-0 h-full bg-black" />
      </div>
      
      <span className="animate-fade-in text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 mt-6" style={{ animationDelay: '0.1s', opacity: 0 }}>
        Loading Assets
      </span>
    </div>
  );
}
