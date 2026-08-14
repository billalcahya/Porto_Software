# Bab 08 — Frontend & WebGL Engine

## 8.1 Arsitektur Antarmuka (Bright Cinematic Digital Atelier)

Antarmuka **DIGITAL THREE** mengusung tema **Bright White Interface** (`#FFFFFF` & `#F7F7F5`) yang bersih dan futuristik. Komponen UI memadukan animasi interaktif GSAP dengan rendering kanvas 3D Three.js.

## 8.2 Struktur Komponen Visual

```text
src/components/
├── animations/
│   ├── CustomCursor.tsx            # Follower kursor kustom dengan efek magnetic
│   ├── GsapScrollProgress.tsx      # Indicator scroll bar atas berbasis GSAP
│   ├── GsapTextReveal.tsx          # Animasi kemunculan teks sinematik per karakter/kata
│   ├── MagneticButton.tsx          # Tombol interaktif yang bereaksi terhadap posisi mouse
│   ├── MotionWrapper.tsx           # Wrapper animatif Framer Motion / GSAP
│   ├── PageLoader.tsx              # Loader transisi antar halaman
│   └── SmoothScrollProvider.tsx    # Provider Lenis Smooth Scroll
├── sections/
│   ├── HeroSection.tsx             # Section pembuka dengan 3D Floating Canvas
│   ├── AboutSection.tsx            # Profil perusahaan & animasi hitung statistik
│   ├── ServicesSection.tsx         # Kartu animasi layanan teknologi
│   ├── PortfolioSection.tsx        # Galeri studi kasus portofolio
│   ├── ProcessSection.tsx          # Timeline alur kerja 7 langkah
│   ├── TestimonialsSection.tsx     # Slider ulasan klien
│   ├── PricingSection.tsx          # Paket pilihan harga
│   ├── FAQSection.tsx              # Accordion tanya-jawab
│   └── ContactSection.tsx          # Formulir inquiry kontak terintegrasi Server Actions
└── webgl/
    ├── AnimatedGeometryBackground.tsx # Latar wireframe 3D interaktif
    ├── DetailShaderCanvas.tsx         # Kanvas GLSL Shader Liquid Silk
    ├── EnergyCore3DCanvas.tsx         # Kanvas 3D TorusKnot R3F (React 19 Safe)
    └── Floating3DCanvas.tsx           # Kanvas 3D Icosahedron R3F (React 19 Safe)
```

## 8.3 Pengelolaan Render WebGL pada React 19

Untuk mencegah terjadinya *cascading renders* atau eror `react-hooks/set-state-in-effect` pada React 19, komponen WebGL menggunakan **`useSyncExternalStore`** untuk memeriksa status mount di sisi klien secara aman tanpa memerlukan `useState` & `useEffect` tambahan:

```typescript
// Contoh implementasi di src/components/webgl/Floating3DCanvas.tsx
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function Floating3DCanvas() {
  const mounted = useIsMounted();

  if (!mounted) return null;

  return (
    <div className="w-full h-80 sm:h-112.5 relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[5, -5, 5]} intensity={1.2} color="#ec4899" />
        <FloatingShape />
        <SmallFloatingSpheres />
      </Canvas>
    </div>
  );
}
```

## 8.4 Internasionalisasi Bahasa (`LanguageContext.tsx`)

Sistem mendukung alih bahasa dinamis antara Bahasa Inggris (`en`) dan Bahasa Indonesia (`id`) menggunakan `LanguageProvider`. Pilihan bahasa pengguna disimpan secara otomatis di `localStorage` dengan kunci `digitalthree_lang`.
