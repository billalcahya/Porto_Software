# Technical Reference — Authentication & Security

## Session Token Specification
- **Library**: `jose`
- **Token Type**: JWT (JSON Web Token)
- **Algorithm**: `HS256`
- **Secret**: `process.env.AUTH_SECRET`
- **Session Duration**: 7 Days (`7d`)

## Cookie Specification
```text
Set-Cookie: digitalthree_admin_session=<jwt_token>; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax; Secure (in production)
```

## Security Audit Summary

| Threat Vector | Mitigation Strategy | Implementation File | Status |
| --- | --- | --- | --- |
| **SQL / NoSQL Injection** | Strict Zod Object Schema Parsing (`.parse()`) & Mongoose ODM | `src/lib/zod-schemas.ts` | 🛡️ Protected |
| **Cross-Site Scripting (XSS)** | Automatic React JSX String Escaping + Zod Sanitization | React Engine | 🛡️ Protected |
| **Session Hijacking / Token Theft** | `HttpOnly` Cookies (Inaccessible to `document.cookie` in JS) | `src/lib/auth.ts` | 🛡️ Protected |
| **CSRF Attack** | Next.js Server Actions Built-in Origin Header Check | Next.js Server | 🛡️ Protected |
| **Password Exposure** | Bcrypt Salt Hashing (10 rounds) | `src/lib/auth.ts` | 🛡️ Protected |
| **Unauthorized Admin Route Access** | Edge Proxy Middleware Check | `src/proxy.ts` | 🛡️ Protected |
