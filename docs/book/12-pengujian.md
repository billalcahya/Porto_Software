# Bab 12 — Pengujian & Penjaminan Kualitas

## 12.1 Strategi Pengujian

Penjaminan kualitas (*Quality Assurance*) pada aplikasi **DIGITAL THREE** mencakup tiga lapisan utama:
1. **Pengujian Tipe Data Statis (Static Type Checking)** via TypeScript compiler.
2. **Pengujian Kode & Formatting (Linter)** via ESLint.
3. **Pengujian Kompilasi Produksi (Build Verification)** via Next.js Turbopack compiler.
4. **Pengujian Manual (Manual E2E Testing Procedure)** untuk alur autentikasi dan mutasi data.

## 12.2 Perintah Pengujian Otomatis

### 1. ESLint Check
Memastikan tidak ada eror aturan React Hooks, unused variables, atau sintaks terlarang:
```bash
npm run lint
```
*Hasil Verifikasi Audit*: **`0 Errors`**, **`25 Warnings (Non-blocking)`**.

### 2. TypeScript Static Analysis
Memastikan seluruh tipe data props, Mongoose model, dan Server Action kompatibel tanpa eror tipe:
```bash
npx tsc --noEmit
```
*Hasil Verifikasi Audit*: **`0 Errors`** (Process exited with code 0).

### 3. Production Compilation Test
Simulasi pengkompilasian penuh lingkungan produksi Next.js:
```bash
npm run build
```
*Hasil Verifikasi Audit*: **`Compiled successfully in 707ms`** (21/21 static & dynamic pages generated).

## 12.3 Prosedur Pengujian Manual (Manual Testing Checklists)

### A. Pengujian Alur Publik (Landing Page)
- [x] **Hero & WebGL**: Kanvas 3D TorusKnot / Icosahedron memuat tanpa crash pada browser desktop & mobile.
- [x] **Internasionalisasi**: Menekan tombol switcher `EN / ID` merubah bahasa teks di seluruh section secara instan.
- [x] **Formulir Kontak**: Mengisi form kontak dan menekan tombol *Send Inquiry* menampilkan notifikasi sukses hijau dan menyimpan pesan ke database MongoDB.
- [x] **Dynamic Metadata**: Mengunjungi `/portfolio/aura-capital-ai-wealth-management` merender title dan OpenGraph tag sesuai judul portofolio.

### B. Pengujian Alur Admin CMS
- [x] **Proteksi Unauthenticated**: Mengakses `/admin/dashboard` langsung tanpa login dialihkan secara otomatis ke `/admin/login`.
- [x] **Login Admin**: Menginput email `admin@softwarehouse.com` dan password `admin123` berhasil membuat cookie `digitalthree_admin_session` dan mengarahkan ke dashboard.
- [x] **CRUD Operations**: Menambah data Service/Portfolio baru berhasil memperbarui tampilan landing page publik secara otomatis (`revalidatePath`).
- [x] **Logout**: Menekan tombol Logout menghapus cookie session dan mengembalikan pengguna ke `/admin/login`.
