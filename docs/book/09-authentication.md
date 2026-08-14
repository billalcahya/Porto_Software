# Bab 09 — Autentikasi & Keamanan

## 9.1 Mekanisme Autentikasi JWT Cookie

Sistem autentikasi aplikasi menggunakan **JSON Web Token (JWT)** yang dikirim melalui cookie HTTP aman (*HTTP-Only Cookie*).

* **Nama Cookie**: `digitalthree_admin_session`
* **Pustaka Token**: `jose` (SignJWT & jwtVerify)
* **Algoritma**: `HS256`
* **Masa Berlaku Token**: 7 hari (`7d`)
* **Atribut Cookie**:
  - `httpOnly: true` (Mencegah pencurian token via `document.cookie` / XSS)
  - `secure: process.env.NODE_ENV === "production"`
  - `sameSite: "lax"`
  - `path: "/"`

## 9.2 Hashing Kata Sandi (`src/lib/auth.ts`)

Kata sandi pengguna di-hash menggunakan `bcryptjs` dengan *salt round* sebanyak 10 sebelum disimpan di koleksi `users` MongoDB:

```typescript
import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

## 9.3 Proteksi Middleware Router (`src/proxy.ts`)

Seluruh rute administratif di bawah direktori `/admin/*` diverifikasi oleh **Next.js Middleware** (`src/proxy.ts`). Middleware mencegat permintaan HTTP sebelum mencapai handler halaman:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "super-secret-jwt-key-change-in-production-32chars"
);

const COOKIE_NAME = "digitalthree_admin_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (pathname === "/admin/login") {
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        } catch {
          // Token invalid, ijinkan login
        }
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

## 9.4 Matriks Hak Akses Peran (Role-Based Access Control)

| Peran (Role) | Akses Dashboard Admin | Kelola Konten (CRUD) | Hapus Konten / Pesan | Kelola Users & Logs |
| --- | --- | --- | --- | --- |
| `SUPER_ADMIN` | ✅ Ya | ✅ Ya | ✅ Ya | ✅ Ya |
| `ADMIN` | ✅ Ya | ✅ Ya | ✅ Ya | ❌ Tidak |
| `EDITOR` | ✅ Ya | ✅ Draf / Edit (Blog, FAQ) | ❌ Tidak | ❌ Tidak |
