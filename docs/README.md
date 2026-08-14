# Master Documentation Index — DIGITAL THREE

Selamat datang di pusat dokumentasi teknis dan panduan pengembang untuk **DIGITAL THREE Portfolio & CMS Platform**.

Dokumentasi ini disusun secara komprehensif untuk menjelaskan arsitektur, skema database, alur autentikasi, integrasi API/Server Actions, tata cara instalasi, pengembangan, serta panduan pengujian dan pemeliharaan aplikasi.

---

## 📌 Peta Dokumentasi

Dokumentasi terbagi menjadi 3 bagian utama:

### 1. 📘 Documentation Book (`docs/book/`)
Buku dokumentasi mendalam mengenai arsitektur sistem, desain database, fitur, serta landasan teori dan teknis aplikasi.

| Bab | Judul | Deskripsi |
| --- | --- | --- |
| `01` | [Pendahuluan](book/01-pendahuluan.md) | Latar belakang, tujuan, cakupan, dan profil pengguna sistem. |
| `02` | [Analisis Kebutuhan](book/02-analisis-kebutuhan.md) | Kebutuhan fungsional, non-fungsional, dan batasan sistem. |
| `03` | [Teknologi](book/03-teknologi.md) | Stack teknologi (Next.js 16, React 19, MongoDB, Three.js, GSAP, Tailwind v4). |
| `04` | [Arsitektur Sistem](book/04-arsitektur-sistem.md) | Diagram arsitektur, alur data, dan interaksi komponen. |
| `05` | [Struktur Project](book/05-struktur-project.md) | Hierarki direktori, organisasi file, dan pembagian tanggung jawab. |
| `06` | [Database & Skema Mongoose](book/06-database.md) | ERD, skema 15 Mongoose Model, dan indeks database. |
| `07` | [Backend & Server Actions](book/07-backend.md) | Pola Server Actions, validasi Zod, error handling, dan koneksi DB. |
| `08` | [Frontend & WebGL Engine](book/08-frontend.md) | Halaman publik, komponen visual, animasi GSAP, dan shader 3D Three.js. |
| `09` | [Autentikasi & Keamanan](book/09-authentication.md) | Sistem JWT HttpOnly cookie, hashing bcrypt, RBAC, dan proxy middleware. |
| `10` | [Fitur Sistem](book/10-fitur-sistem.md) | Rincian alur kerja seluruh modul (Public Landing Page & Admin CMS). |
| `11` | [Panduan Implementasi Kode](book/11-implementasi.md) | Tutorial praktis menambah fitur, model, Server Action, dan halaman. |
| `12` | [Pengujian & Penjaminan Kualitas](book/12-pengujian.md) | Prosedur pengujian linters (`npm run lint`), typecheck, dan pengujian manual. |
| `13` | [Deployment & Produksi](book/13-deployment.md) | Panduan kompilasi `npm run build`, variabel lingkungan, dan deployment Vercel/Node. |
| `14` | [Troubleshooting & Solusi Error](book/14-troubleshooting.md) | Daftar eror umum beserta penyebab dan solusi terverifikasi. |
| `15` | [Pemeliharaan Sistem](book/15-maintenance.md) | Prosedur update dependency, backup database, dan logging. |
| `16` | [Pengembangan Lanjutan](book/16-pengembangan-lanjutan.md) | Batasan sistem saat ini, utang teknis, dan rencana pengembangan masa depan. |

---

### 2. ⚙️ Technical References (`docs/technical/`)
Dokumentasi teknis tingkat rendah untuk pengembang yang membutuhkan referensi langsung API, skema, dan mekanisme keamanan.

- 🏗️ [Architecture Reference](technical/architecture.md) — Detail komponen visual, SSR/RSC vs Client Components, dan WebGL lifecycle.
- 🗄️ [Database Reference](technical/database.md) — Referensi mendalam 15 koleksi MongoDB dan skema Mongoose.
- 🔌 [API & Server Actions Reference](technical/api.md) — Spesifikasi lengkap seluruh Server Actions & REST API endpoints.
- 🔐 [Authentication & Security Reference](technical/authentication.md) — Spesifikasi token JWT, enkripsi bcrypt, cookie policy, dan validasi Zod.
- 🛠️ [Troubleshooting Reference](technical/troubleshooting.md) — Log eror teknis dan langkah pemecahan masalah.

---

### 3. 🚀 Tutorials (`docs/tutorial/`)
Panduan praktis langkah demi langkah dari pengaturan awal hingga produksi.

- 📥 [Panduan Instalasi Lokal](tutorial/installation.md) — Cara clone, install dependency, set `.env`, dan menjalankan dev server.
- 💻 [Panduan Pengembang (Development)](tutorial/development.md) — Standar pengkodean, pembuatan modul baru, dan konvensi git.
- 🌐 [Panduan Deployment](tutorial/deployment.md) — Langkah-langkah build dan rilis ke server produksi Vercel / Docker.

---

## ⚡ Perintah Penting (Quick Commands)

```bash
# 1. Jalankan Environment Pengembangan (Dev Server)
npm run dev

# 2. Pengujian Linting (ESLint)
npm run lint

# 3. Pengujian TypeScript (Type Checking)
npx tsc --noEmit

# 4. Build untuk Produksi
npm run build

# 5. Jalankan Production Server
npm run start
```

---

## 🔒 Variabel Lingkungan Utama (`.env`)

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portofolio
AUTH_SECRET=super-secret-jwt-key-change-in-production-32chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
