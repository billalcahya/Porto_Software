"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Disable on touch devices / mobile screens
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    const cursor = document.getElementById("custom-cursor");
    const cursorDot = document.getElementById("custom-cursor-dot");

    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest("a, button, input, textarea, select")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Cursor Ring / Bubble */}
      <div
        id="custom-cursor"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? cursorText
              ? "w-20 h-20 bg-zinc-900/90 text-white text-[10px] font-mono font-bold tracking-widest backdrop-blur-md border border-zinc-700 shadow-xl"
              : "w-10 h-10 bg-blue-600/20 border border-blue-500/40"
            : "w-6 h-6 border border-zinc-900/40 bg-zinc-900/5"
        }`}
      >
        {cursorText && <span className="uppercase animate-fadeIn">{cursorText}</span>}
      </div>

      {/* Center Small Dot */}
      <div
        id="custom-cursor-dot"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 rounded-full bg-zinc-900 transition-transform duration-100 ${
          isHovered ? "scale-0" : "w-1.5 h-1.5"
        }`}
      />
    </>
  );
}
