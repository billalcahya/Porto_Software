# Bab 01 — Pendahuluan

## 1.1 Latar Belakang

Perkembangan industri teknologi informasi yang pesat menuntut perusahaan penyedia jasa rekayasa perangkat lunak (Software House & Enterprise AI Studio) untuk memiliki identitas digital yang profesional, berkinerja tinggi, dan responsif. Sebuah situs portofolio tidak hanya berfungsi sebagai brosur digital, melainkan sebagai etalase kapabilitas teknis (*technical showcase*), media interaksi dengan calon klien, dan pusat manajemen konten (*Content Management System / CMS*) yang aman.

Aplikasi **DIGITAL THREE** dirancang untuk memenuhi kebutuhan tersebut dengan menggabungkan arsitektur modern Next.js 16 App Router, komponen animasi sinematik (GSAP & Three.js WebGL Shader), serta sistem manajemen konten terintegrasi berbasis MongoDB.

## 1.2 Rumusan Masalah

1. Bagaimana menyediakan platform portofolio digital yang cepat, aman, dan mudah diindeks oleh mesin pencari (SEO)?
2. Bagaimana menampilkan elemen visual dan animasi 3D/WebGL yang interaktif tanpa mengorbankan performa *load time* dan aksesibilitas?
3. Bagaimana memfasilitasi tim administrator untuk mengelola data layanan, portofolio, artikel blog, faq, tim, dan pesan masuk secara mandiri melalui CMS yang aman?

## 1.3 Tujuan Project

1. Membangun platform web fullstack *production-ready* berkinerja tinggi menggunakan Next.js 16, TypeScript, dan MongoDB.
2. Menyediakan antarmuka publik (*Public Landing Page*) yang estetis dengan tema terang (*Bright Cinematic Digital Atelier*), animasi fluid GSAP, serta visual 3D Three.js.
3. Menyediakan dashboard admin (*Admin CMS*) terlindungi yang mendukung operasi CRUD (Create, Read, Update, Delete) pada 15 modul data utama.
4. Menjamin keamanan data dari ancaman serangan umum (SQL/NoSQL Injection, XSS, CSRF, dan Unauthorized Access).

## 1.4 Batasan Sistem

* **Framework Fullstack**: Next.js 16 (App Router) tanpa backend terpisah.
* **Database**: MongoDB (diakses via Mongoose ODM).
* **Autentikasi**: JSON Web Token (JWT) berbasis cookie `HttpOnly`.
* **Tema Visual Utama**: *Bright White / Off-White* dengan elemen aksen cyan/lime/blue.

## 1.5 Target Pengguna

1. **Pengunjung / Calon Klien**: Masyarakat umum, pelaku bisnis, dan mitra perusahaan yang mencari layanan pembuatan software atau solusi AI.
2. **Administrator / Editor**: Tim internal **DIGITAL THREE** yang mengelola data landing page, membalas pesan masuk, serta mempublikasikan artikel blog melalui portal `/admin`.
