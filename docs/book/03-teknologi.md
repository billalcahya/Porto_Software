# Bab 03 — Teknologi & Library

Sistem ini dibangun mengacu pada standar pustaka dan framework industri modern per versi terverifikasi pada `package.json`:

## 3.1 Core Stack

| Teknologi | Versi | Fungsi / Peran |
| --- | --- | --- |
| **Next.js** | `16.3.0` | Framework React Fullstack (App Router, Server Components, Server Actions). |
| **React** | `19.2.8` | Engine rendering antarmuka pengguna berbasis komponen. |
| **TypeScript** | `^5.0.0` | Pemrograman terstruktur dengan *static type checking*. |
| **Node.js** | `^20.0.0` | Runtime environment server. |

## 3.2 Database & Database Driver

| Teknologi | Versi | Fungsi / Peran |
| --- | --- | --- |
| **MongoDB** | Cloud / Local | Database NoSQL document-oriented. |
| **Mongoose** | `^9.9.2` | Object Data Modeling (ODM) untuk validasi skema dan interaksi MongoDB. |

## 3.3 Graphics & Animation Libraries

| Pustaka | Versi | Fungsi / Peran |
| --- | --- | --- |
| **Three.js** | `^0.185.1` | Pustaka grafis WebGL 3D. |
| **React Three Fiber** | `^9.7.0` | Renderer React deklaratif untuk Three.js. |
| **@react-three/drei** | `^10.7.8` | Abstraksi dan komponen pembantu untuk React Three Fiber. |
| **GSAP** | `^3.15.0` | Animation engine utama untuk animasi teks, scroll trigger, dan mikro-interaksi. |
| **Framer Motion** | `^13.1.0` | Pustaka animasi komponen deklaratif React. |
| **Lenis** | `^1.3.26` | Engine *smooth scrolling* yang terintegrasi dengan GSAP ScrollTrigger. |

## 3.4 Security & Validation

| Pustaka | Versi | Fungsi / Peran |
| --- | --- | --- |
| **Jose** | `^6.2.8` | Pustaka pembuat dan pemverifikasi token JSON Web Token (JWT) pada Edge/Node. |
| **Bcryptjs** | `^3.0.3` | Hashing enkripsi kata sandi pengguna. |
| **Zod** | `^4.4.3` | Validasi skema tipe data input pada Server Actions. |

## 3.5 UI & Styling Frameworks

| Pustaka | Versi | Fungsi / Peran |
| --- | --- | --- |
| **Tailwind CSS** | `^4.0.0` | Framework CSS utilitas utama. |
| **Lucide React** | `^1.31.0` | Pustaka ikon vektor modern. |
| **Clsx & Tailwind-Merge** | `^2.1.1` / `^3.6.0` | Penggabungan kelas CSS kondisional secara aman. |
| **React Hook Form** | `^7.85.0` | Manajemen formulir interaktif di sisi klien. |
