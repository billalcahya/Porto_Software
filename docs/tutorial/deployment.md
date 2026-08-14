# Tutorial — Production Deployment Guide

Panduan ini menjelaskan langkah-langkah mendeploy aplikasi ke lingkungan produksi.

## Opsi A: Deployment ke Vercel (Rekomendasi Utama)

1. **Push Repository**: Pastikan seluruh kode terbaru berada di branch `main` GitHub.
2. **Import Project di Vercel**:
   - Masuk ke [Vercel Dashboard](https://vercel.com).
   - Impor repositori `billalcahya/Porto_Software`.
3. **Environment Variables**:
   Tambahkan variabel berikut pada menu *Settings -> Environment Variables*:
   - `MONGODB_URI`: String koneksi MongoDB Atlas produksi.
   - `AUTH_SECRET`: String rahasia JWT unik.
   - `NEXT_PUBLIC_APP_URL`: Domain resmi (contoh `https://digitalthree.dev`).
4. **Deploy**: Klik tombol **Deploy**. Vercel akan otomatis melakukan pembentukan bundel Next.js 16.

---

## Opsi B: Deployment ke VPS Linux / Docker Container

1. **Build Container Image**:
   ```bash
   docker build -t digitalthree-app .
   ```
2. **Run Container**:
   ```bash
   docker run -d -p 3000:3000 --env-file .env digitalthree-app
   ```
3. **Konfigurasi Reverse Proxy Nginx & SSL Certbot**:
   Arahkan Nginx port 80/443 ke `http://localhost:3000` dengan sertifikat SSL HTTPS Let's Encrypt.
