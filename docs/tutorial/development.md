# Tutorial — Developer Guide

Panduan ini berisi standar dan tata cara pengkodean bagi insinyur perangkat lunak yang mengerjakan project ini.

## Workflow Alur Git (Git Branch Strategy)
- `main`: Branch produksi terstabil.
- `develop`: Branch pengembangan aktif.
- **Setiap fitur baru dikembangkan di branch `develop`, lalu dimuat ke `main` setelah verifikasi lint & typecheck**.

## Standar Kode & Konvensi
1. **Server Components by Default**: Jangan menambahkan `"use client"` di bagian atas file kecuali komponen membutuhkan hook React (`useState`, `useRef`), animasi GSAP, atau Three.js Canvas.
2. **Strict Type Safety**: Selalu tentukan tipe data props interface dan kembalian fungsi. Jangan gunakan `any`.
3. **Validasi Zod pada Mutasi**: Selalu buat Zod schema di `src/lib/zod-schemas.ts` sebelum membuat fungsi Server Action baru.
4. **Revalidasi Cache**: Selalu panggil `revalidatePath(...)` setelah melakukan operasi mutasi data MongoDB di Server Action.

## Jalur Pengujian Sebelum Pull Request
```bash
# 1. Jalankan linter
npm run lint

# 2. Jalankan typecheck
npx tsc --noEmit

# 3. Jalankan test build
npm run build
```
