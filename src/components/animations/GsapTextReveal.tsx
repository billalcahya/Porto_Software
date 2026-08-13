"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function GsapTextReveal({ text, className = "", delay = 0 }: GsapTextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".gsap-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: "110%",
          opacity: 0,
          rotateX: 45,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          delay: delay,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, text]);

  const wordList = text.split(" ");

  return (
    <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      {wordList.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] vertical-align-bottom">
          <span className="gsap-word inline-block transform-gpu origin-bottom-left">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
