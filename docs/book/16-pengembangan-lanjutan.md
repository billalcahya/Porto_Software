# Bab 16 — Pengembangan Lanjutan & Technical Debt

## 16.1 Batasan Sistem Saat Ini (Current Limitations)

1. **Upload File Lokal**: Saat ini pengunggahan gambar di Media Library menyimulasikan penyimpanan string URL gambar. Belum terhubung ke Object Storage cloud seperti AWS S3, Cloudinary, atau Uploadthing.
2. **Kirim Email Notifikasi**: Form kontak mengirim dan menyimpan inquiry ke database MongoDB, namun belum menyertakan pengiriman email otomatis (via Resend/Nodemailer) ke kotak masuk admin.

## 16.2 Utang Teknis (Technical Debt)

- Peringatan minor `<img />` pada tabel CMS admin dianjurkan diganti bertahap menggunakan `<Image />` bawaan `next/image` untuk otomatisasi optimasi gambar LCP.

## 16.3 Rekomendasi Fitur Masa Depan (Future Roadmap)

1. **Integrasi Provider AWS S3 / Cloudinary**: Menambahkan provider penyimpanan cloud untuk mendukung pengunggahan berkas media ukuran besar langsung dari dashboard `/admin/media`.
2. **Notifikasi Email Real-time**: Mengintegrasikan SDK `resend` atau `nodemailer` pada Server Action `submitContactMessageAction` agar pesan kontak baru langsung memicu notifikasi email ke tim penjualan.
3. **Analitik Lanjutan (Visitor Telemetry)**: Mengembangkan grafik visual interaktif berbasis Chart.js / Recharts pada halaman `/admin/dashboard` menggunakan data dari koleksi `PageVisit`.
