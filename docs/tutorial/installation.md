# Tutorial — Installation Guide

Panduan ini membantu Anda menyiapkan lingkungan pengembangan lokal dari nol.

## Prasyarat
- **Node.js**: Versi `20.x` LTS atau lebih tinggi
- **Git**: Versi `2.x`
- **MongoDB**: Akun MongoDB Atlas gratis atau instans Mongo lokal

---

## Langkah 1: Clone Repositori
```bash
git clone https://github.com/billalcahya/Porto_Software.git
cd Porto_Software
```

## Langkah 2: Install Dependensi
```bash
npm install
```

## Langkah 3: Konfigurasi File Environment
Buat file `.env` di akar direktori:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portofolio
AUTH_SECRET=super-secret-jwt-key-change-in-production-32chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Langkah 4: Jalankan Server Pengembangan
```bash
npm run dev
```
Buka `http://localhost:3000` di browser Anda.

## Langkah 5: Inisialisasi Database (Seeding)
Buka `http://localhost:3000/api/seed` di browser untuk mengisi data awal. Login admin di `http://localhost:3000/admin/login` dengan:
- **Email**: `admin@softwarehouse.com`
- **Password**: `admin123`
