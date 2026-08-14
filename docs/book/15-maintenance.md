# Bab 15 — Pemeliharaan Sistem

## 15.1 Alur Kerja Pemeliharaan (Maintenance Workflow)

1. **Pemeriksaan Kesehatan Rutin**: Meninjau tabel `ActivityLog` di CMS `/admin/activity-logs` dan memantau status kunjungan di tabel `PageVisit`.
2. **Pembaruan Dependensi (Package Updates)**: Jalankan pemeriksaan kompatibilitas sebelum melakukan pembaruan versi paket:
   ```bash
   npm outdated
   ```
3. **Validasi Build Setelah Update**: Setiap kali kode diubah atau dependensi diperbarui, eksekusi pipeline validasi wajib:
   ```bash
   npm run lint && npx tsc --noEmit && npm run build
   ```

## 15.2 Prosedur Backup & Restore Database MongoDB

### A. Backup Database (mongodump)
```bash
mongodump --uri="MONGODB_URI_PRODUKSI" --out=./backups/$(date +%Y%m%d)
```

### B. Restore Database (mongorestore)
```bash
mongorestore --uri="MONGODB_URI_TARGET" ./backups/20260814/portofolio
```

## 15.3 Rotasi Secret Key & Keamanan
- Disarankan memperbarui string `AUTH_SECRET` secara berkala setiap 6 bulan.
- Saat `AUTH_SECRET` diubah, seluruh token sesi admin aktif akan menjadi invalid secara otomatis, memaksa semua admin untuk melakukan login ulang secara aman.
