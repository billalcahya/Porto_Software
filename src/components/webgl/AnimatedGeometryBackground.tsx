"use client";

import React from "react";

export function AnimatedGeometryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* ================= TOP SECTION GEOMETRY ================= */}
      {/* 3D Wireframe Cube 1 - Top Left Rotating */}
      <div className="absolute top-12 left-[5%] animate-spin-slow opacity-50">
        <svg viewBox="0 0 100 100" className="w-44 h-44 text-sky-600 fill-none stroke-current stroke-1">
          <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
          <line x1="50" y1="5" x2="50" y2="50" />
          <line x1="50" y1="50" x2="10" y2="27" />
          <line x1="50" y1="50" x2="90" y2="27" />
          <line x1="50" y1="50" x2="50" y2="95" />
          <circle cx="50" cy="50" r="4" className="fill-lime-400 stroke-none" />
        </svg>
      </div>

      {/* Blueprint Compass Dial - Top Center Right */}
      <div className="absolute top-20 right-[15%] animate-spin-reverse opacity-45">
        <svg viewBox="0 0 140 140" className="w-52 h-52 text-lime-600 fill-none stroke-current stroke-1">
          <circle cx="70" cy="70" r="60" strokeDasharray="4 4" />
          <circle cx="70" cy="70" r="45" />
          <circle cx="70" cy="70" r="30" strokeDasharray="2 2" />
          <polygon points="70,10 75,25 70,20 65,25" className="fill-sky-500" />
          <polygon points="70,130 75,115 70,120 65,115" className="fill-lime-500" />
          <text x="70" y="8" fontSize="6" textAnchor="middle" className="fill-slate-600 font-mono">0°</text>
          <text x="135" y="72" fontSize="6" textAnchor="middle" className="fill-slate-600 font-mono">90°</text>
          <text x="70" y="138" fontSize="6" textAnchor="middle" className="fill-slate-600 font-mono">180°</text>
          <text x="5" y="72" fontSize="6" textAnchor="middle" className="fill-slate-600 font-mono">270°</text>
        </svg>
      </div>

      {/* Octahedron Wireframe - Top Right Corner */}
      <div className="absolute top-10 right-[3%] animate-float-geometry opacity-40">
        <svg viewBox="0 0 100 100" className="w-36 h-36 text-blue-600 fill-none stroke-current stroke-1">
          <polygon points="50,5 95,50 50,95 5,50" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <polygon points="50,20 80,50 50,80 20,50" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* ================= MIDDLE SECTION GEOMETRY ================= */}
      {/* Nested Blueprint Squares - Mid Left */}
      <div className="absolute top-[35%] left-[3%] animate-spin-reverse opacity-45">
        <svg viewBox="0 0 120 120" className="w-48 h-48 text-cyan-600 fill-none stroke-current stroke-1">
          <rect x="15" y="15" width="90" height="90" rx="8" />
          <rect x="30" y="30" width="60" height="60" rx="4" transform="rotate(45 60 60)" />
          <circle cx="60" cy="60" r="16" className="fill-lime-400/20" />
          <line x1="0" y1="60" x2="120" y2="60" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Radar Sonar Reticle - Mid Right */}
      <div className="absolute top-[40%] right-[6%] animate-spin-slow opacity-50">
        <svg viewBox="0 0 160 160" className="w-64 h-64 text-sky-600 fill-none stroke-current stroke-1">
          <circle cx="80" cy="80" r="70" strokeDasharray="8 6" />
          <circle cx="80" cy="80" r="50" />
          <circle cx="80" cy="80" r="30" strokeDasharray="4 4" />
          <line x1="80" y1="0" x2="80" y2="160" />
          <line x1="0" y1="80" x2="160" y2="80" />
          <circle cx="80" cy="40" r="4" className="fill-lime-500 stroke-none" />
          <circle cx="110" cy="90" r="3" className="fill-sky-500 stroke-none" />
        </svg>
      </div>

      {/* 3D Wireframe Icosahedron - Center Matrix */}
      <div className="absolute top-[50%] left-[20%] animate-float-geometry opacity-40">
        <svg viewBox="0 0 120 120" className="w-52 h-52 text-blue-600 fill-none stroke-current stroke-1">
          <polygon points="60,5 110,35 110,85 60,115 10,85 10,35" />
          <polygon points="60,25 95,45 95,75 60,95 25,75 25,45" strokeDasharray="2 2" />
          <line x1="60" y1="5" x2="60" y2="115" />
          <line x1="10" y1="35" x2="110" y2="85" />
          <line x1="10" y1="85" x2="110" y2="35" />
        </svg>
      </div>

      {/* ================= LOWER SECTION GEOMETRY ================= */}
      {/* Nested Wireframe Cube 3 - Bottom Left */}
      <div className="absolute bottom-28 left-[8%] animate-spin-slow opacity-45">
        <svg viewBox="0 0 100 100" className="w-56 h-56 text-lime-600 fill-none stroke-current stroke-1">
          <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
          <line x1="50" y1="5" x2="50" y2="50" />
          <line x1="50" y1="50" x2="10" y2="27" />
          <line x1="50" y1="50" x2="90" y2="27" />
          <line x1="50" y1="50" x2="50" y2="95" />
          <polygon points="50,22 72,34 72,66 50,78 28,66 28,34" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Blueprint Diamond Node Matrix - Bottom Right */}
      <div className="absolute bottom-20 right-[12%] animate-float-geometry opacity-45">
        <svg viewBox="0 0 120 120" className="w-48 h-48 text-sky-600 fill-none stroke-current stroke-1">
          <rect x="30" y="30" width="60" height="60" transform="rotate(45 60 60)" />
          <rect x="42" y="42" width="36" height="36" transform="rotate(45 60 60)" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="8" className="fill-lime-400 stroke-none" />
          <line x1="60" y1="0" x2="60" y2="120" />
          <line x1="0" y1="60" x2="120" y2="60" />
        </svg>
      </div>

      {/* ================= MICRO NODE CROSSHAIRS & BADGES ================= */}
      <div className="absolute top-24 left-[35%] text-sky-600/50 text-xl font-mono font-bold animate-pulse">
        + + +
      </div>
      <div className="absolute top-[48%] right-[30%] text-lime-600/60 text-2xl font-mono font-bold animate-pulse">
        ◇ ◇ ◇
      </div>
      <div className="absolute bottom-36 left-[38%] text-blue-600/50 text-lg font-mono font-bold animate-pulse">
        △ △ △
      </div>
      <div className="absolute top-[75%] left-[5%] text-slate-500/40 text-xs font-mono font-bold select-none">
        [SYS_MATRIX_CORE]
      </div>
      <div className="absolute top-[28%] right-[40%] text-slate-500/40 text-xs font-mono font-bold select-none">
        [POLYGON_MESH_60FPS]
      </div>
    </div>
  );
}
