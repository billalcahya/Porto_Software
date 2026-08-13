"use client";

import React from "react";
import { AnimatedGeometryBackground } from "@/components/webgl/AnimatedGeometryBackground";

export function ShaderBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Tech Blueprint Dot Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-70" />

      {/* Floating Animated Geometry Suite (3D Wireframe Cubes, Blueprint Reticles, Node Diamonds) */}
      <AnimatedGeometryBackground />

      {/* Floating Cyan Ambient Orb */}
      <div className="orb-glow w-96 h-96 bg-cyan-400/30 top-10 left-10" />

      {/* Floating Lime Ambient Orb */}
      <div className="orb-glow w-[32rem] h-[32rem] bg-lime-400/25 top-1/3 right-5 animate-pulse" />

      {/* Floating Electric Blue Ambient Orb */}
      <div className="orb-glow w-[28rem] h-[28rem] bg-blue-500/25 bottom-20 left-1/4" />

      {/* Floating Violet Accent Orb */}
      <div className="orb-glow w-[24rem] h-[24rem] bg-purple-500/20 top-2/3 right-1/3" />
    </div>
  );
}
