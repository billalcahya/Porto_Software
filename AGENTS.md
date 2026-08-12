# SOFTWARE HOUSE LANDING PAGE

# MASTER DEVELOPMENT INSTRUCTION — BRIGHT CINEMATIC WEBGL EDITION

## ROLE

Act as a Senior Fullstack Engineer, Software Architect, UI/UX Engineer, Creative Developer, Motion Designer, WebGL Engineer, Database Engineer, Security Engineer, Performance Engineer, dan QA Engineer.

---

# 1. TASK

Bangun aplikasi **Software House Landing Page + Admin CMS** secara production-ready menggunakan Next.js fullstack.

Jangan hanya membuat mockup, prototype, atau dokumentasi.

Agent harus langsung mengimplementasikan seluruh aplikasi ke repository berdasarkan spesifikasi ini.

Website harus terasa seperti **premium creative technology studio**, bukan template landing page biasa.

---

# 2. DEVELOPMENT OBJECTIVE

Buat website software house yang:

* modern
* premium
* bright
* cinematic
* immersive
* futuristic
* editorial
* interactive
* responsive
* SEO friendly
* fast
* accessible
* maintainable
* scalable
* production ready

Visual utama harus menggunakan:

* bright white interface
* WebGL
* Three.js
* GLSL shader
* GSAP
* ScrollTrigger
* smooth scrolling
* cinematic transitions
* interactive mouse effects
* parallax
* micro-interactions
* fluid motion
* subtle particles
* dynamic lighting

Website harus memiliki **strong visual identity**.

Hindari tampilan seperti template SaaS generik.

---

# 3. CORE TECHNOLOGY

Gunakan:

* Next.js
* App Router
* TypeScript
* React
* Tailwind CSS
* shadcn/ui
* GSAP
* GSAP ScrollTrigger
* Three.js
* React Three Fiber
* @react-three/drei
* GLSL shaders
* Lenis atau smooth scrolling solution yang compatible dengan GSAP
* Lucide React
* MongoDB
* Mongoose
* Auth.js / NextAuth
* Zod
* React Hook Form

### Animation Stack

Gunakan **GSAP sebagai animation engine utama**.

Gunakan:

* GSAP Timeline
* ScrollTrigger
* scrub animations
* stagger animations
* reveal animations
* text animations
* image transitions
* scale transitions
* clip-path transitions
* horizontal scroll sections
* pinned sections
* parallax
* magnetic buttons
* cursor interactions

### WebGL Stack

Gunakan Three.js / React Three Fiber untuk visual yang membutuhkan WebGL.

Gunakan GLSL shader untuk:

* animated background
* liquid distortion
* gradient field
* noise
* fluid movement
* particles
* light effects
* subtle displacement
* interactive mouse distortion

Jangan menggunakan WebGL hanya sebagai gimmick.

WebGL harus menjadi bagian dari visual identity website.

---

# 4. IMPORTANT — ARCHITECTURE

Tetap gunakan Next.js sebagai fullstack framework.

JANGAN menggunakan:

* Express.js
* Laravel
* backend server terpisah
* REST API server terpisah

Gunakan:

* Server Components
* Server Actions
* Route Handlers jika diperlukan
* Middleware
* Mongoose
* database service

Prioritaskan Server Components.

Gunakan `"use client"` hanya ketika memang diperlukan, terutama untuk:

* GSAP
* Three.js
* WebGL
* browser APIs
* interactive UI

---

# 5. DESIGN DIRECTION

## PRIMARY VISUAL THEME

### "Bright Cinematic Digital Atelier"

Website harus memiliki nuansa:

* clean
* bright
* futuristic
* premium
* artistic
* sophisticated
* minimal
* editorial
* immersive
* technological

Dominant visual:

**WHITE / OFF-WHITE / LIGHT GRAY**

Bukan dark mode sebagai visual utama.

---

# 6. COLOR SYSTEM

Gunakan light theme sebagai default.

### Primary Background

```text
#FFFFFF
```

### Secondary Background

```text
#F7F7F5
```

### Surface

```text
#FAFAFA
```

### Primary Text

```text
#111111
```

### Secondary Text

```text
#666666
```

### Muted Text

```text
#999999
```

### Border

Gunakan:

```text
rgba(0,0,0,0.08)
```

### Accent

Gunakan accent futuristik yang sangat subtle.

Contoh:

* soft electric blue
* cyan
* violet
* silver
* iridescent gradient

Accent tidak boleh mendominasi halaman.

---

# 7. IMPORTANT VISUAL RULE

Jangan membuat halaman penuh dengan gradient.

Gradient hanya digunakan sebagai:

* shader
* ambient lighting
* background glow
* accent
* hover effect
* WebGL visualization

Background utama tetap:

**white / off-white.**

---

# 8. TYPOGRAPHY

Gunakan typography modern:

* Inter
* Geist
* Space Grotesk

Gunakan typography hierarchy yang sangat kuat.

Hero heading harus sangat besar.

Gunakan:

* oversized typography
* variable font weight
* tight letter spacing
* editorial composition
* asymmetrical layout

Contoh struktur:

```text
WE CREATE

DIGITAL
EXPERIENCES

THAT MOVE
PEOPLE.
```

Jangan copy teks tersebut secara literal jika tidak sesuai branding.

---

# 9. HERO SECTION

Hero adalah bagian paling penting dari website.

Hero harus terasa seperti opening scene sebuah **high-end technology film**.

Gunakan:

* massive typography
* white background
* WebGL shader
* liquid gradient
* animated particles
* soft lighting
* cursor interaction
* mouse distortion
* parallax
* floating elements
* animated typography
* GSAP entrance animation

### HERO BACKGROUND

Gunakan Three.js / React Three Fiber.

Buat shader background yang:

* sangat halus
* abstract
* fluid
* organic
* responsive
* interactive

Visual dapat berupa:

* liquid surface
* flowing light
* abstract gradient field
* procedural noise
* soft glowing particles

Background jangan terlihat seperti wallpaper stock.

Harus terasa **procedural dan generative**.

---

# 10. HERO WEBGL INTERACTION

Mouse movement harus mempengaruhi shader.

Contoh:

```text
mouse movement
      ↓
shader distortion
      ↓
liquid movement
      ↓
soft light displacement
```

Gunakan interpolation agar movement smooth.

Jangan membuat efek terlalu agresif.

---

# 11. HERO GSAP ANIMATION

Saat halaman pertama kali dibuka:

1. page loader
2. logo reveal
3. background shader fade-in
4. hero typography reveal
5. words animate menggunakan stagger
6. CTA muncul
7. decorative elements masuk
8. scroll indicator muncul

Gunakan GSAP Timeline.

Animasi harus terasa:

* premium
* cinematic
* smooth
* intentional

Hindari animasi yang terlalu cepat.

---

# 12. PAGE INTRO / LOADER

Buat cinematic page loader.

Konsep:

```text
WHITE SCREEN
      ↓
minimal logo
      ↓
progress / animated line
      ↓
shader reveal
      ↓
hero reveal
```

Loader jangan terlalu lama.

Target sekitar:

**0.8–1.5 detik**

Jika asset sudah siap lebih cepat, skip loader secara adaptif.

Jangan membuat user menunggu tanpa alasan.

---

# 13. CUSTOM CURSOR

Desktop dapat menggunakan custom cursor.

Cursor memiliki:

* small dot
* magnetic interaction
* hover expansion
* text label

Contoh:

```text
VIEW
```

atau:

```text
EXPLORE
```

Saat hover portfolio:

```text
VIEW PROJECT
```

Saat hover CTA:

```text
LET'S TALK
```

Disable custom cursor pada:

* mobile
* tablet jika diperlukan
* touch device

---

# 14. MAGNETIC BUTTON

CTA harus memiliki magnetic interaction.

Ketika mouse mendekati button:

```text
cursor
   ↓
button sedikit tertarik
```

Gunakan GSAP.

Movement harus subtle.

Jangan membuat button bergerak terlalu jauh.

---

# 15. NAVBAR

Navbar:

* transparent pada awal
* floating
* sticky
* berubah ketika scroll
* white / glass surface
* subtle backdrop blur
* smooth transition

Ketika scroll:

```text
transparent
     ↓
white glass navigation
```

Menu:

* Home
* About
* Services
* Work
* Process
* Blog
* Contact

CTA:

**Start a Project**

Navbar entrance menggunakan GSAP.

---

# 16. SCROLL EXPERIENCE

Scrolling harus terasa seperti sebuah **cinematic journey**.

Gunakan:

* GSAP ScrollTrigger
* smooth scrolling
* parallax
* pinned sections
* reveal animation
* horizontal scrolling
* scale transitions
* opacity transitions
* image masking

Jangan membuat setiap elemen bergerak.

Gunakan motion hierarchy.

---

# 17. SECTION TRANSITIONS

Setiap section harus memiliki transition yang halus.

Contoh:

```text
Section A
    ↓
fade
    ↓
scale
    ↓
clip-path
    ↓
Section B
```

Gunakan:

* clip-path
* transform
* opacity
* blur
* scale
* WebGL transitions

---

# 18. ABOUT SECTION

About section harus terasa editorial.

Gunakan layout:

```text
ABOUT US

large statement
        +
supporting description
        +
statistics
```

Gunakan oversized typography.

Tambahkan subtle scroll animation.

Data berasal dari database.

Admin dapat mengubah:

* title
* description
* vision
* mission
* values
* company statistics

---

# 19. SERVICES SECTION

Services berasal dari database.

Jangan membuat grid card biasa.

Gunakan **interactive editorial layout**.

Contoh:

```text
01  WEB DEVELOPMENT
02  MOBILE DEVELOPMENT
03  UI/UX DESIGN
04  SOFTWARE ENGINEERING
05  DIGITAL PRODUCT
```

Saat hover:

* typography berubah
* background berubah
* image preview muncul
* cursor berubah
* subtle shader effect muncul

Gunakan GSAP untuk interaction.

---

# 20. PORTFOLIO / SELECTED WORK

Portfolio adalah salah satu bagian paling cinematic.

Jangan membuat:

```text
card
card
card
card
```

Gunakan:

### Horizontal storytelling

Contoh:

```text
SELECTED

WORK

PROJECT 01
      ↓
PROJECT 02
      ↓
PROJECT 03
```

Gunakan:

* horizontal scroll
* pinned section
* image scale
* clip-path
* parallax
* typography reveal

Portfolio image dapat:

* scale
* rotate sangat sedikit
* distort
* reveal menggunakan mask

---

# 21. PORTFOLIO DETAIL

Buat:

```text
/portfolio
/portfolio/[slug]
```

Portfolio detail harus terasa seperti **case study cinematic**.

Gunakan:

* huge hero image
* project metadata
* typography
* animated gallery
* technology list
* project story
* result
* CTA

Image transitions menggunakan GSAP.

---

# 22. TECHNOLOGY SECTION

Jangan hanya membuat logo grid.

Gunakan interactive technology wall.

Contoh:

```text
NEXT.JS
REACT
TYPESCRIPT
NODE
MONGODB
POSTGRESQL
DOCKER
AWS
FLUTTER
```

Technology dapat:

* float
* move
* reveal
* respond to mouse

Tetap jaga readability.

---

# 23. PROCESS SECTION

Workflow:

```text
Discovery
   ↓
Strategy
   ↓
Design
   ↓
Development
   ↓
Testing
   ↓
Deployment
   ↓
Maintenance
```

Buat process sebagai visual timeline.

Gunakan ScrollTrigger.

Saat user scroll:

```text
step aktif
   ↓
line progress
   ↓
content reveal
```

Gunakan GSAP scrub.

---

# 24. STATISTICS

Statistics harus memiliki count-up animation.

Contoh:

```text
50+
Projects

20+
Clients

5+
Years

99%
Commitment
```

Counter berjalan ketika masuk viewport.

Gunakan GSAP.

---

# 25. TESTIMONIAL

Buat testimonial yang minimal.

Jangan membuat card grid berlebihan.

Gunakan:

* large quote
* client name
* position
* subtle image
* horizontal transition

Quote muncul menggunakan text reveal.

---

# 26. TEAM

Team section gunakan editorial layout.

Saat hover member:

* image reveal
* image scale
* text transition
* social links muncul

Gunakan GSAP.

---

# 27. PRICING

Pricing harus tetap clean.

Gunakan:

* white surface
* subtle border
* large typography
* minimal shadow

Jangan menggunakan dashboard-style pricing cards.

Pricing tetap berasal dari database.

---

# 28. BLOG

Buat:

```text
/blog
/blog/[slug]
```

Blog list harus editorial.

Gunakan:

* large featured article
* asymmetric grid
* image reveal
* category
* metadata

Scroll animation menggunakan GSAP.

---

# 29. FAQ

Gunakan accordion minimal.

Saat membuka FAQ:

* height animation
* opacity
* icon rotation

Gunakan GSAP atau CSS transition.

---

# 30. CONTACT / CTA

CTA harus menjadi salah satu bagian paling memorable.

Konsep:

```text
LET'S BUILD

SOMETHING
EXTRAORDINARY.
```

Background tetap bright.

Gunakan WebGL shader sebagai ambient visual.

Ketika cursor bergerak:

* shader berubah
* light mengikuti mouse
* typography sedikit bergerak

CTA button menggunakan magnetic effect.

---

# 31. FOOTER

Footer minimal dan elegant.

Gunakan:

* company identity
* navigation
* social links
* email
* location
* copyright

Tambahkan subtle entrance animation.

---

# 32. GSAP ANIMATION SYSTEM

Buat animation architecture terpisah.

Contoh:

```text
components/
└── animations/
    ├── FadeIn.tsx
    ├── TextReveal.tsx
    ├── Parallax.tsx
    ├── MagneticButton.tsx
    ├── ScrollReveal.tsx
    ├── ImageReveal.tsx
    ├── HorizontalScroll.tsx
    └── PageTransition.tsx
```

Buat reusable GSAP utilities.

Contoh:

```text
lib/
└── animations/
    ├── gsap.ts
    ├── easing.ts
    ├── transitions.ts
    └── scroll.ts
```

Jangan menulis animation logic berulang-ulang.

---

# 33. THREE.JS / WEBGL ARCHITECTURE

Pisahkan WebGL components.

Contoh:

```text
components/
└── webgl/
    ├── ShaderBackground.tsx
    ├── LiquidShader.tsx
    ├── ParticleField.tsx
    ├── GradientMesh.tsx
    ├── CursorLight.tsx
    └── WebGLCanvas.tsx
```

Shader:

```text
shaders/
├── liquid.vert
├── liquid.frag
├── noise.glsl
├── distortion.glsl
└── gradient.glsl
```

Gunakan reusable shader utilities.

---

# 34. WEBGL PERFORMANCE

WebGL wajib performant.

Implement:

* device pixel ratio limit
* adaptive quality
* resize handling
* visibility detection
* lazy initialization
* cleanup
* dispose geometries
* dispose materials
* dispose textures
* reduce particle count on mobile

Desktop:

High quality.

Mobile:

Reduced quality.

Very low-end devices:

Fallback ke CSS gradient / static background.

Jangan memaksa WebGL berjalan dengan kualitas tinggi di semua device.

---

# 35. REDUCED MOTION

Jika user menggunakan:

```text
prefers-reduced-motion
```

Maka:

* disable unnecessary animations
* disable parallax
* reduce GSAP transitions
* disable custom cursor
* simplify WebGL
* gunakan static fallback

Accessibility lebih penting daripada visual effect.

---

# 36. MOTION PRINCIPLES

Gunakan prinsip:

### 1. Motion hierarchy

Tidak semua elemen bergerak.

### 2. Slow + smooth

Gunakan easing premium.

### 3. Spatial consistency

Movement harus memiliki arah yang jelas.

### 4. Purposeful animation

Animasi harus membantu storytelling.

### 5. Responsive motion

Desktop dan mobile memiliki behavior berbeda.

---

# 37. AVOID

Jangan gunakan:

* dark futuristic default
* black background sebagai dominan
* excessive neon
* excessive glow
* excessive glassmorphism
* excessive cards
* excessive gradients
* generic SaaS layout
* Bootstrap-style layout
* random floating objects
* excessive particle effects
* animation pada setiap elemen
* WebGL yang berat
* animation yang membuat user pusing

---

# 38. VISUAL QUALITY TARGET

Bayangkan kualitas visual seperti:

**premium creative technology agency**

bukan:

**generic software company website**

Website harus terasa:

```text
Apple
+
Awwwards
+
creative coding studio
+
premium digital agency
```

Tetapi jangan meniru website tertentu secara literal.

Buat identitas visual original.

---

# 39. ADMIN CMS

Pertahankan seluruh requirement CMS yang ada.

Admin route:

```text
/admin
```

Dashboard harus benar-benar berfungsi.

Menu:

```text
Dashboard

Content
├── About
├── Services
├── Portfolio
├── Technologies
├── Process
├── Testimonials
├── Team
├── Pricing
├── FAQ
└── Blog

Communication
└── Messages

Media
└── Media Library

Settings
├── General
├── SEO
└── Social Media

System
├── Users
└── Activity Logs
```

---

# 40. DATABASE

Gunakan:

* MongoDB
* Mongoose

Models:

```text
User
Service
Portfolio
Technology
ProcessStep
Testimonial
TeamMember
PricingPlan
BlogPost
FAQ
ContactMessage
SiteSettings
Media
ActivityLog
```

Semua konten yang dapat dikelola admin harus berasal dari database.

Jangan mengganti database dengan hardcoded array.

---

# 41. AUTHENTICATION

Gunakan:

* Auth.js / NextAuth
* secure session
* protected routes
* role based access

Role:

```text
SUPER_ADMIN
ADMIN
EDITOR
```

Permission harus berbeda berdasarkan role.

---

# 42. SECURITY

Implementasikan:

* password hashing
* secure session
* protected admin routes
* authorization
* Zod validation
* sanitized content
* rate limiting
* secure cookies
* environment variables
* XSS prevention
* injection prevention

Jangan menyimpan password plaintext.

---

# 43. SEO

Implement:

* metadata
* dynamic metadata
* OpenGraph
* Twitter Cards
* sitemap
* robots.txt
* canonical URL
* JSON-LD
* structured data

Portfolio dan Blog harus memiliki dynamic metadata.

---

# 44. PERFORMANCE

Prioritaskan:

* Server Components
* image optimization
* lazy loading
* dynamic imports
* caching
* revalidation
* code splitting
* minimal client JS

### IMPORTANT

GSAP dan Three.js harus di-load hanya pada bagian yang membutuhkan.

Jangan membuat seluruh website menjadi Client Component hanya karena animation.

---

# 45. RESPONSIVE

Wajib support:

* mobile
* tablet
* laptop
* desktop
* large desktop

Perhatikan:

* typography
* WebGL
* navigation
* animation
* layout
* spacing
* touch interaction

Mobile bukan sekadar desktop yang diperkecil.

Buat responsive experience secara intentional.

---

# 46. COMPONENT ARCHITECTURE

Gunakan reusable components.

Target:

```text
components/
├── ui/
├── layout/
├── navbar/
├── footer/
├── sections/
├── animations/
├── webgl/
├── portfolio/
├── blog/
├── forms/
└── admin/
```

Jangan membuat satu file berisi ribuan baris.

---

# 47. EXISTING FUNCTIONAL REQUIREMENTS

Pertahankan seluruh functionality dari requirement awal:

* About CMS
* Services CRUD
* Portfolio CRUD
* Technology CRUD
* Process CMS
* Testimonials CRUD
* Team CRUD
* Pricing CRUD
* Blog CRUD
* FAQ CRUD
* Contact messages
* Media Library
* Admin Dashboard
* Authentication
* Role permissions
* Activity Logs
* SEO management
* Site settings

Semua harus benar-benar bekerja.

---

# 48. BEFORE CODING

Sebelum menulis kode:

1. Inspect repository.
2. Inspect package.json.
3. Inspect Next.js configuration.
4. Inspect Tailwind configuration.
5. Inspect existing components.
6. Inspect environment variables.
7. Identify existing architecture.
8. Jangan menghapus fitur existing yang masih relevan.
9. Buat implementation plan internal.
10. Langsung implementasikan.

Jangan berhenti hanya pada planning.

---

# 49. IMPLEMENTATION ORDER

## Phase 1 — Foundation

Setup:

* Next.js
* TypeScript
* Tailwind
* shadcn
* MongoDB
* Mongoose
* Auth
* architecture

## Phase 2 — Database

Implement:

* models
* schemas
* validation
* indexes
* seed

## Phase 3 — Authentication

Implement:

* login
* logout
* session
* middleware
* roles
* permissions

## Phase 4 — Admin CMS

Implement seluruh CRUD.

## Phase 5 — Public Website

Implement seluruh landing page.

## Phase 6 — Visual System

Implement:

* typography
* white theme
* spacing
* responsive layout
* design tokens

## Phase 7 — GSAP

Implement:

* page intro
* text reveal
* scroll reveal
* parallax
* magnetic buttons
* image reveal
* horizontal scrolling
* page transitions
* micro-interactions

## Phase 8 — WebGL

Implement:

* shader background
* liquid distortion
* particle field
* mouse interaction
* WebGL transitions

## Phase 9 — Optimization

Optimize:

* WebGL
* GSAP
* images
* bundle
* rendering
* mobile experience

## Phase 10 — SEO

Implement seluruh SEO.

## Phase 11 — QA

Test seluruh application.

## Phase 12 — Production

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Semua harus berhasil.

---

# 50. FINAL QUALITY CHECK

Sebelum menyatakan selesai:

### Visual

* White theme dominan
* Premium
* Cinematic
* Original
* Responsive
* Consistent typography
* Good spacing
* No generic template feeling

### Animation

* GSAP berjalan
* ScrollTrigger berjalan
* text reveal bekerja
* parallax bekerja
* magnetic buttons bekerja
* page transition bekerja
* hover interaction bekerja

### WebGL

* shader berjalan
* mouse interaction bekerja
* responsive
* mobile fallback
* reduced motion support
* tidak memory leak
* tidak menyebabkan browser crash

### Public Website

* Navbar bekerja
* Hero bekerja
* About bekerja
* Services bekerja
* Portfolio bekerja
* Technology bekerja
* Process bekerja
* Statistics bekerja
* Testimonials bekerja
* Team bekerja
* Pricing bekerja
* Blog bekerja
* FAQ bekerja
* Contact bekerja
* Footer bekerja

### Admin

* Login
* Logout
* Protected route
* Role permission
* Dashboard
* CRUD
* Search
* Filter
* Pagination
* Upload
* Activity log

### Technical

* TypeScript tidak error
* Lint tidak error
* Build berhasil
* Tidak ada broken import
* Tidak ada console error
* Tidak ada secret di repository
* Tidak ada mock API production
* Tidak ada dummy UI untuk fitur utama

---

# 51. IMPORTANT AGENT RULES

## RULE 1

DO NOT ONLY EXPLAIN.

Implement the application.

## RULE 2

Jika menemukan bug, perbaiki langsung.

Jangan hanya menjelaskan penyebabnya.

## RULE 3

Jika dependency diperlukan, install dependency tersebut.

## RULE 4

Jika keputusan teknis tidak ditentukan, pilih solusi yang paling:

* maintainable
* secure
* scalable
* performant
* idiomatic Next.js

## RULE 5

GSAP adalah animation engine utama.

Jangan mencampur terlalu banyak animation library.

## RULE 6

Three.js digunakan untuk WebGL experience.

Jangan menggunakan WebGL untuk elemen yang bisa dibuat dengan CSS.

## RULE 7

Jangan menggunakan dark background sebagai default.

Dominant theme harus:

**WHITE / OFF-WHITE / LIGHT GRAY**

## RULE 8

Landing page harus membaca content dari database untuk content yang dikelola CMS.

## RULE 9

Admin tidak boleh dapat diakses tanpa authentication.

## RULE 10

Jangan expose database credentials atau secret ke client.

## RULE 11

Performance harus menjadi prioritas.

Visual yang bagus tetapi membuat website lag dianggap sebagai implementasi yang gagal.

---

# 52. DEFINITION OF DONE

User flow:

```text
User
 ↓
Landing Page
 ↓
Browse Services
 ↓
Browse Portfolio
 ↓
Read Blog
 ↓
Submit Contact
```

Admin flow:

```text
Admin
 ↓
Login
 ↓
Dashboard
 ↓
Create/Edit/Delete Content
 ↓
Database
 ↓
Landing Page Automatically Updated
```

Seluruh flow harus berjalan.

---

# 53. FINAL OUTPUT FROM AGENT

Setelah implementasi selesai, berikan:

## Implementation Summary

### Completed

* ...

### Architecture

* ...

### Database

* ...

### Authentication

* ...

### Admin CMS

* ...

### Public Website

* ...

### Animation System

* ...

### WebGL / Three.js

* ...

### Security

* ...

### SEO

* ...

### Performance

* ...

### Testing

* ...

### Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

### Environment Variables

* ...

### Remaining Issues

Jika tidak ada:

```text
Remaining Issues: None
```

Jangan menyatakan project selesai jika build masih gagal atau fitur utama belum berfungsi.
