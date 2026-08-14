# Technical Reference — Architecture

## Architecture Overview

**DIGITAL THREE** is a single-repo Next.js 16 fullstack application built using the App Router model.

```text
+-----------------------------------------------------------------------+
|                           CLIENT BROWSER                              |
|  - Next.js Client Components (React 19)                               |
|  - GSAP Animation Engine + ScrollTrigger                              |
|  - Three.js / React Three Fiber WebGL Canvas Shaders                 |
|  - Lenis Smooth Scroll                                                |
+-----------------------------------------------------------------------+
                                  |
                   HTTP / Server Actions Invocation
                                  |
+-----------------------------------------------------------------------+
|                    NEXT.JS SERVER (Node.js 20)                        |
|  - Middleware (src/proxy.ts) -> Session Cookie Validation              |
|  - React Server Components (RSC) Data Fetching                        |
|  - Server Actions (src/actions/*) Mutation Layer                       |
|  - Zod Validation Schemas (src/lib/zod-schemas.ts)                    |
+-----------------------------------------------------------------------+
                                  |
                        Mongoose ODM Connection
                                  |
+-----------------------------------------------------------------------+
|                       MONGODB CLUSTER (Database)                      |
|  - 15 Mongo Collections                                               |
+-----------------------------------------------------------------------+
```

## Render Boundaries: RSC vs Client Components

- **React Server Components (RSC)**: Used for initial page rendering (`src/app/page.tsx`, `portfolio/page.tsx`, `blog/page.tsx`). Fetches Mongoose documents directly at build/request time with 0 client-side JS bundle overhead for database queries.
- **Client Components (`"use client"`)**: Isolated exclusively to interactive UI components requiring WebGL (`src/components/webgl/*`), GSAP animations (`src/components/animations/*`), and form handling (`ContactSection.tsx`, admin forms).

## WebGL Lifecycle & React 19 Hydration Safety

Three.js canvases use `useSyncExternalStore` to ensure proper client-side mounting without triggering SSR hydration mismatches or cascading re-render warnings (`react-hooks/set-state-in-effect`).
