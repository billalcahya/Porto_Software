# Bab 14 — Troubleshooting & Solusi Error

Berikut adalah daftar eror teknis terverifikasi beserta penyebab dan langkah pemecahannya:

## 14.1 Eror 1: `querySrv ECONNREFUSED _mongodb._tcp...`

* **Gejala**: Log terminal menampilkan `SRV resolution fallback active, proceeding with standard URI: Error: querySrv ECONNREFUSED`.
* **Penyebab**: Koneksi DNS lokal/ISP gagal memecahkan *SRV Record* MongoDB Atlas (`mongodb+srv://`).
* **Solusi**:
  1. Ganti DNS komputer/server ke Google Public DNS (`8.8.8.8` / `8.8.4.4`) atau Cloudflare (`1.1.1.1`).
  2. Atau ganti string koneksi `MONGODB_URI` menggunakan format standard connection string tanpa SRV.

---

## 14.2 Eror 2: `React Hooks: Avoid calling setState() directly within an effect`

* **Gejala**: ESLint memperingatkan eror pada komponen WebGL (`EnergyCore3DCanvas.tsx` / `Floating3DCanvas.tsx`).
* **Penyebab**: Aturan React 19 melarang pemanggilan `setMounted(true)` secara synchronous di dalam `useEffect` karena dapat memicu *cascading renders*.
* **Solusi**:
  Ganti `useState` + `useEffect` dengan hook `useSyncExternalStore`:
  ```typescript
  const emptySubscribe = () => () => {};
  function useIsMounted() {
    return React.useSyncExternalStore(emptySubscribe, () => true, () => false);
  }
  ```

---

## 14.3 Eror 3: `THREE.Clock: This module has been deprecated`

* **Gejala**: Peringatan browser console saat merender animasi Three.js.
* **Penyebab**: Versi Three.js terbaru (`^0.185.0`) mendepresi modul `THREE.Clock` dan merekomendasikan `THREE.Timer` atau `state.clock.elapsedTime` dari React Three Fiber.
* **Solusi**: Gunakan argumen `delta` atau `state.clock.elapsedTime` di dalam hook `useFrame((state, delta) => ...)` bawaan `@react-three/fiber`.

---

## 14.4 Eror 4: `Unauthorized: Please log in to continue` saat Akses Admin Actions

* **Gejala**: Server Action mengembalikan respon `{ success: false, error: "Unauthorized..." }`.
* **Penyebab**: Cookie `digitalthree_admin_session` telah kadaluarsa (melewati 7 hari) atau belum diset.
* **Solusi**: Buka `/admin/login` dan lakukan autentikasi ulang untuk memperbarui token JWT cookie.
