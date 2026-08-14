# Bab 10 — Fitur Sistem

## 10.1 Modul Landing Page Publik (`/`)

### 1. Hero Section
- **Tujuan**: Memperkenalkan **DIGITAL THREE** sebagai Software House & Enterprise AI Studio dengan visual 3D interaktif.
- **Komponen**: `HeroSection.tsx`, `Floating3DCanvas.tsx`, `AnimatedGeometryBackground.tsx`.
- **Alur Data**: Membaca nama situs, tagline, dan hero heading dari `SiteSettings` MongoDB.

### 2. About Section & Statistics Counter
- **Tujuan**: Menampilkan latar belakang perusahaan, nilai utama rekayasa (*core values*), visi, misi, dan 4 pencapaian statistik.
- **Komponen**: `AboutSection.tsx`.
- **Fitur Animasi**: Animasi angka berjalan (*count-up counter*) saat masuk ke viewport.

### 3. Services Section
- **Tujuan**: Menampilkan 5 kapabilitas layanan utama (Full-Stack Web Platforms, Mobile App Ecosystems, Enterprise AI & LLM Solutions, Cloud Architecture & DevOps, UI/UX & Motion Design).
- **Komponen**: `ServicesSection.tsx`.
- **Alur Data**: Mengambil daftar layanan terpublikasi dari koleksi `services`.

### 4. Portfolio Showcase & Case Studies
- **Tujuan**: Menampilkan karya studi kasus unggulan proyek yang telah diselesaikan.
- **Komponen**: `PortfolioSection.tsx`, `PortfolioModal.tsx`, `/portfolio`, `/portfolio/[slug]`.
- **Fitur**: Fitur filter per kategori (Fintech, Cloud, Healthcare, Cybersecurity), modal pratinjau cepat, dan halaman detail studi kasus lengkap.

### 5. Process Methodology Timeline
- **Tujuan**: Menjelaskan 7 tahapan proses rekayasa perangkat lunak (Discovery, Strategy, Design, Development, Testing, Deployment, Maintenance).
- **Komponen**: `ProcessSection.tsx`.

### 6. Testimonials Slider & FAQ Accordion
- **Tujuan**: Menampilkan ulasan asli klien dan jawaban pertanyaan umum.
- **Komponen**: `TestimonialsSection.tsx`, `FAQSection.tsx`.

### 7. Contact Discovery Inquiry Form
- **Tujuan**: Menampung formulir inquiry proyek dari calon klien.
- **Komponen**: `ContactSection.tsx`.
- **Action Backend**: Memanggil `submitContactMessageAction` yang memvalidasi input dengan Zod dan menyimpan dokumen ke koleksi `contactmessages`.

---

## 10.2 Modul Admin CMS Portal (`/admin`)

### 1. Dashboard Overview (`/admin/dashboard`)
- Menampilkan ringkasan metrik statistik (Jumlah Portofolio, Layanan, Pesan Baru, Pengunjung), pesan terbaru, dan aktivitas audit log terakhir.

### 2. Management Modules (CRUD)
- **Services** (`/admin/services`): Formulir modal & tabel kelola layanan.
- **Portfolio** (`/admin/portfolio`): Kelola proyek, galeri gambar, status publikasi, dan urutan.
- **Technologies** (`/admin/technologies`): Kelola pustaka teknologi dan kategori.
- **Process Steps** (`/admin/process`): Kelola tahapan alur kerja.
- **Testimonials** (`/admin/testimonials`): Kelola ulasan klien dan rating bintang.
- **Team Members** (`/admin/team`): Kelola profil tim dan keahlian insinyur.
- **Pricing Plans** (`/admin/pricing`): Kelola paket harga dan opsi tagihan.
- **Blog Posts** (`/admin/blog`): Editor artikel blog, status draf/publikasi, dan SEO meta tags.
- **FAQ** (`/admin/faq`): Kelola pertanyaan & jawaban umum per kategori.

### 3. Communication & Messages (`/admin/messages`)
- Membaca rincian pesan masuk dari pengunjung publik, mengubah status (`NEW` -> `READ` -> `REPLIED` -> `ARCHIVED`), atau menghapus pesan.

### 4. Media Library (`/admin/media`)
- Katalog manajemen aset media gambar.

### 5. Site Settings (`/admin/settings`)
- Mengubah informasi umum perusahaan, teks hero, email kontak, telepon, alamat hq, tautan sosial media, dan SEO global metadata secara real-time.

### 6. System Audit & User Management (`/admin/users` & `/admin/activity-logs`)
- Memantau log aktivitas operasi CRUD admin dan mengelola pengguna akun admin.
