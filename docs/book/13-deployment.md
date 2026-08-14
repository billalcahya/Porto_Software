# Bab 13 — Deployment & Produksi

## 13.1 Persyaratan Lingkungan Produksi

* **Node.js**: v20.x LTS atau lebih baru.
* **Database**: MongoDB Atlas Cluster (v6.0+) atau MongoDB Enterprise Server.
* **Hosting Platform**: Vercel (Direkomendasikan), AWS Amplify, Docker Container, atau VPS Linux (Ubuntu 22.04 LTS).

## 13.2 Konfigurasi Variabel Lingkungan (`.env`)

Sebelum menjalankan perintah build produksi, pastikan variabel lingkungan berikut terkonfigurasi di server target:

```env
# Database Connection String (MongoDB Atlas)
MONGODB_URI=mongodb+srv://<db_user>:<db_password>@cluster0.example.mongodb.net/portofolio?retryWrites=true&w=majority

# JWT Authentication Secret (Minimal 32 karakter acak)
AUTH_SECRET=a8f9c0b1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9

# Public Application URL
NEXT_PUBLIC_APP_URL=https://digitalthree.dev
```

## 13.3 Langkah Build & Jalankan Server (Standar Node.js)

```bash
# 1. Install dependensi produksi secara bersih
npm ci

# 2. Kompilasi bundle Next.js produksi
npm run build

# 3. Jalankan server produksi di port 3000
npm run start
```

## 13.4 Deployment ke Platform Vercel

1. Hubungkan repositori GitHub `billalcahya/Porto_Software` ke dashboard Vercel.
2. Atur **Framework Preset**: `Next.js`.
3. Tambahkan variabel lingkungan (`MONGODB_URI`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`) pada menu **Environment Variables**.
4. Tekan **Deploy**. Vercel akan mengeksekusi `npm run build` secara otomatis pada Edge Network.

## 13.5 Inisialisasi Seed Database Pertama Kali

Setelah aplikasi pertama kali diluncurkan di server produksi, buka endpoint pembenihan database di browser atau via cURL untuk mengisi akun admin default dan konten awal:

```bash
curl -X GET https://digitalthree.dev/api/seed
```

**Kredensial Admin Default**:
- **Email**: `admin@softwarehouse.com`
- **Password**: `admin123`
- *(Disarankan segera mengubah password admin default setelah login pertama kali di `/admin/settings`)*.
