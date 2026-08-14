# Bab 05 — Struktur Project

## 5.1 Pohon Direktori Utama

```text
portofolio/
├── public/                     # Aset statis (logo.PNG, favicon, svg)
├── docs/                       # Dokumentasi sistem & tutorial
├── src/
│   ├── actions/                # Next.js Server Actions (Backend Logic & Mutation)
│   ├── app/                    # Next.js App Router (Pages, Layouts, APIs)
│   │   ├── (marketing)/        # Route Group Landing Page Utama (/)
│   │   ├── admin/              # Route Group Portal Admin CMS (/admin)
│   │   │   ├── (dashboard)/    # Admin Dashboard Sub-routes
│   │   │   └── login/          # Halaman Login Admin
│   │   ├── api/                # API Routes (Seeding, Analytics, etc)
│   │   ├── blog/               # Halaman Publik Blog (/blog & /blog/[slug])
│   │   ├── portfolio/          # Halaman Publik Portofolio (/portfolio & /portfolio/[slug])
│   │   ├── globals.css         # CSS Global & Design Tokens Tailwind v4
│   │   ├── layout.tsx          # Root Layout & Provider Wrappers
│   │   ├── manifest.ts         # Manifest PWA Dinamis
│   │   ├── robots.ts           # Konfigurasi Robot SEO
│   │   └── sitemap.ts          # Sitemap Generator Dinamis
│   ├── components/             # Komponen UI React
│   │   ├── analytics/          # Component Pelacak Kunjungan
│   │   ├── animations/         # GSAP, SmoothScroll, & Cursor Wrappers
│   │   ├── layout/             # Navbar & Footer
│   │   ├── sections/           # Section UI Landing Page (Hero, About, Services, dll)
│   │   ├── seo/                # Komponen JSON-LD Structured Data
│   │   ├── ui/                 # Komponen UI dasar (button, input, badge, modal)
│   │   └── webgl/              # Komponen Canvas Three.js & GLSL Shaders
│   ├── context/                # React Context (LanguageContext)
│   ├── lib/                    # Utilities, DB Connection, Auth, Seed, Zod Schemas
│   ├── models/                 # Mongoose Models (15 MongoDB Schemas)
│   ├── types/                  # TypeScript Interfaces & Definitions
│   └── proxy.ts                # Middleware Proteksi Route Admin & Session Verification
├── package.json                # Dependensi & Script npm
├── next.config.ts              # Konfigurasi Next.js
├── tsconfig.json               # Konfigurasi TypeScript
└── PROMPT-GENERATE-DOCUMENTATION.md
```

## 5.2 Pembagian Tanggung Jawab Modul

* **`src/actions/`**: Berfungsi sebagai controller backend yang mengeksekusi operasi database MongoDB, melakukan revalidasi cache Next.js (`revalidatePath`), dan memverifikasi autentikasi.
* **`src/models/`**: Mendefinisikan skema data terstruktur untuk Mongoose Mappings.
* **`src/components/webgl/`**: Mengisolasi kanvas Three.js / R3F (seperti `EnergyCore3DCanvas`, `Floating3DCanvas`, `DetailShaderCanvas`) untuk memastikan rendering 3D tidak mengganggu performa server.
* **`src/components/animations/`**: Menyediakan integrasi animasi GSAP ScrollTrigger, Lenis Smooth Scroll, serta pelacak kursor kustom (`CustomCursor`).
* **`src/proxy.ts`**: Menangani proteksi keamanan rute administratif berbasis middleware Next.js.
