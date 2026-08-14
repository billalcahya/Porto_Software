# Bab 07 — Backend & Server Actions

## 7.1 Konsep Server Actions

Aplikasi menggunakan **Next.js 16 Server Actions** (`"use server"`) sebagai cara utama komunikasi mutasi data dari antarmuka ke database tanpa membutuhkan REST API terpisah. Semua file Server Action berlokasi di direktori `src/actions/`.

## 7.2 Pola Implementasi Server Action Standard

Tiap fungsi Server Action mengikuti arsitektur baku:
1. **Pemeriksaan Autentikasi / Otorisasi**: Menggunakan `requireAuth(["SUPER_ADMIN", "ADMIN"])`.
2. **Validasi Input terstruktur**: Menggunakan Zod Schema parse (`zodSchema.parse(data)`).
3. **Koneksi Database Singleton**: Menguji koneksi MongoDB via `connectDB()`.
4. **Eksekusi Operasi Mongoose**: Menggunakan metode Mongoose (`create`, `findOneAndUpdate`, `findByIdAndDelete`).
5. **Pencatatan Activity Log**: Memanggil `logActivity(...)` untuk audit internal.
6. **Revalidasi Cache Next.js**: Memanggil `revalidatePath(...)` agar data terbaru langsung ter-render di antarmuka pengguna.
7. **Pengembalian Respon Terstruktur**: Mengembalikan objek `{ success: true, ... }` atau `{ success: false, error: string }`.

## 7.3 Contoh Kode Server Action (Modul Portfolio)

```typescript
// src/actions/portfolio.ts
"use server";

import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { portfolioSchema } from "@/lib/zod-schemas";
import { requireAuth } from "@/lib/auth";
import { logActivity } from "@/actions/activity";
import { revalidatePath } from "next/cache";

export async function createPortfolioAction(data: unknown) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = portfolioSchema.parse(data);

    await connectDB();

    const portfolio = await Portfolio.create(validated);

    await logActivity(
      session.id,
      session.name,
      "CREATE",
      "Portfolio",
      `Created portfolio: ${portfolio.title}`
    );

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");

    return {
      success: true,
      message: "Portfolio project created successfully.",
      portfolio: JSON.parse(JSON.stringify(portfolio)),
    };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message || "Failed to create portfolio." };
  }
}
```

## 7.4 Penanganan Database Singleton (`src/lib/db.ts`)

Koneksi database MongoDB dikelola secara aman agar tidak terjadi masalah kehabisan koneksi (*socket exhaustion*) saat berjalan di lingkungan Serverless / Vercel Edge dengan memanfaatkan skema caching `global.mongoose`:

```typescript
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
```
