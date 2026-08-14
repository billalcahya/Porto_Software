# Bab 02 — Analisis Kebutuhan

## 2.1 Kebutuhan Fungsional (Functional Requirements)

### A. Sisi Pengunjung Publik (Landing Page)
1. **Navigasi & Header**: Pengunjung dapat menavigasi bagian Hero, About, Services, Work, Process, Blog, dan Contact dengan *smooth scrolling*.
2. **Visual Interaktif & WebGL**: Pengunjung dapat melihat animasi WebGL (TorusKnot, Icosahedron 3D, Liquid Shader) yang merespons pergerakan kursor.
3. **Internasionalisasi (Multi-bahasa)**: Pengunjung dapat mengubah bahasa antarmuka antara Bahasa Inggris (`en`) dan Bahasa Indonesia (`id`).
4. **Detail Portofolio & Blog**: Pengunjung dapat membaca studi kasus portofolio (`/portfolio/[slug]`) dan artikel blog (`/blog/[slug]`).
5. **Formulir Kontak**: Pengunjung dapat mengirimkan inquiry pesan proyek beserta data nama, email, perusahaan, layanan yang dibutuhkan, dan estimasi anggaran.

### B. Sisi Administrator (Admin CMS)
1. **Autentikasi Admin**: Pengguna internal dapat melakukan login di `/admin/login` menggunakan email dan password.
2. **Manajemen Konten (CRUD)**:
   - **Services**: Tambah, edit, dan hapus layanan teknologi.
   - **Portfolio**: Kelola studi kasus, gambar thumbnail, galeri, serta teknologi yang digunakan.
   - **Technologies**: Kelola daftar teknologi dan ikon.
   - **Process Steps**: Kelola tahapan alur kerja pengerjaan proyek.
   - **Testimonials**: Kelola ulasan dan rating dari klien.
   - **Team Members**: Kelola data anggota tim, posisi, bio, dan keahlian.
   - **Pricing Plans**: Kelola paket harga dan fitur layanan.
   - **Blog Posts**: Kelola draf dan publikasi artikel blog beserta tags dan SEO metadata.
   - **FAQ**: Kelola daftar pertanyaan yang sering diajukan.
   - **Site Settings**: Ubah nama situs, deskripsi, informasi kontak, dan tautan sosial media secara dinamis.
3. **Manajemen Pesan (Messages)**: Membaca, mengubah status pesan (`NEW`, `READ`, `REPLIED`, `ARCHIVED`), serta menghapus pesan kontak dari pengunjung.
4. **Media Library**: Mengunggah dan memantau aset gambar yang digunakan di situs.
5. **Pengguna & Log Aktivitas**: Memantau aktivitas sistem (`Activity Logs`) dan mengelola pengguna admin (`Users`).

## 2.2 Kebutuhan Non-Fungsional (Non-Functional Requirements)

1. **Performa**: Halaman publik harus memuat kurang dari 2 detik pada jaringan standar.
2. **Keamanan**:
   - Mencegah NoSQL Injection melalui validasi skema Zod.
   - Mencegah Cross-Site Scripting (XSS) melalui auto-escaping React.
   - Menggunakan token JWT berbasis cookie `HttpOnly` untuk mencegah pencurian token.
3. **Aksesibilitas & Akses Perangkat**: Responsif penuh di perangkat desktop, tablet, dan ponsel cerdas (mobile-first layout).
4. **Mesin Pencari (SEO)**: Mendukung JSON-LD (Organization, WebSite, Article, Breadcrumbs), OpenGraph, Twitter Cards, `sitemap.xml`, dan `robots.txt`.

## 2.3 Peran Pengguna (User Roles)

| Role | Hak Akses |
| --- | --- |
| `SUPER_ADMIN` | Akses penuh ke seluruh fitur CMS, Manajemen Users, Log Aktivitas, dan Hapus Konten. |
| `ADMIN` | Akses CRUD ke konten utama (Services, Portfolio, Blog, Messages, FAQ), namun terbatas pada manajemen pengguna tertentu. |
| `EDITOR` | Akses membuat dan mengubah draf Blog, FAQ, dan membaca konten. |
