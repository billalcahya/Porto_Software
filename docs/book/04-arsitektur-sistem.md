# Bab 04 — Arsitektur Sistem

## 4.1 Gambaran Umum Arsitektur

Aplikasi **DIGITAL THREE** mengadopsi arsitektur terintegrasi berbasis **Next.js App Router Fullstack Architecture**. Aplikasi memisahkan lapisan rendering antarmuka pengguna (*Client UI & Server Components*) dari lapisan logika bisnis (*Server Actions*) dan sumber data (*MongoDB via Mongoose*).

```mermaid
graph TD
    User[Client Browser / Mobile] -->|HTTP GET / Page Request| NextServer[Next.js App Router Server]
    User -->|Invoke Server Action| ServerActions[Next.js Server Actions]
    
    subgraph Frontend Layer
        NextServer -->|Render RSC| HTMLOutput[Static/Dynamic HTML + React Hydration]
        HTMLOutput -->|Client Components| ThreeJS[Three.js WebGL & GSAP Engine]
    end
    
    subgraph Middle Security Layer
        ServerActions -->|Validate Data| ZodSchema[Zod Input Validation]
        ServerActions -->|Verify JWT Cookie| ProxyAuth[Proxy Middleware & Session Auth]
    end
    
    subgraph Database Layer
        ServerActions -->|Mongoose ODM Query| MongoDB[(MongoDB Database)]
    end
```

## 4.2 Alur Permintaan & Respon (Request-Response Lifecycle)

1. **Routing & Middleware**: Permintaan awal dari pengguna akan diperiksa oleh `src/proxy.ts` (Next.js Middleware). Jalur sensitif `/admin/*` diperiksa keberadaan cookie `digitalthree_admin_session`.
2. **Server Component Rendering**: Halaman publik (seperti `/` dan `/portfolio`) memanggil Mongoose ODM langsung dari Server Component untuk mengambil data terenkapsulasi tanpa API tambahan.
3. **Client Component Execution**: Efek visual 3D (Three.js), kanvas shader GLSL, serta animasi scrolling (GSAP ScrollTrigger) berjalan secara terisolasi di sisi klien (`"use client"`).
4. **Server Actions (Mutasi Data)**: Formulir publik (Kontak) atau dashboard admin (CRUD) memanggil Server Actions di `src/actions/`. Setiap aksi memvalidasi input dengan skema Zod sebelum mengubah data di MongoDB.

## 4.3 Alur Autentikasi Admin

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant Client as Browser Client
    participant AuthAction as auth.ts (Server Action)
    participant DB as MongoDB User Collection
    participant Cookie as HttpOnly Cookie Store

    Admin->>Client: Input Email & Password
    Client->>AuthAction: Submit loginAction(email, password)
    AuthAction->>AuthAction: Validate Zod loginSchema
    AuthAction->>DB: User.findOne({ email })
    DB-->>AuthAction: Return User Data & Hashed Password
    AuthAction->>AuthAction: bcrypt.compare(password, hash)
    AuthAction->>AuthAction: Sign JWT Token (Jose HS256)
    AuthAction->>Cookie: Set-Cookie: digitalthree_admin_session (HttpOnly, SameSite)
    AuthAction-->>Client: Return { success: true }
    Client->>Client: Redirect to /admin/dashboard
```
