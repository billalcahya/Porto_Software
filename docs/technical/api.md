# Technical Reference — API & Server Actions

## Overview
All data mutations and administrative features use **Next.js Server Actions** (`"use server"`).

---

## 1. Authentication Actions (`src/actions/auth.ts`)

### `loginAction(data)`
- **Description**: Authenticates admin user with email and password, creates signed JWT session cookie `digitalthree_admin_session`.
- **Authentication**: Not Required
- **Validation**: `loginSchema` (Zod)
- **Input Payload**:
  ```json
  {
    "email": "admin@softwarehouse.com",
    "password": "admin123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "65b...",
      "name": "Alex Vance",
      "email": "admin@softwarehouse.com",
      "role": "SUPER_ADMIN"
    }
  }
  ```

---

## 2. Public Contact Actions (`src/actions/contact.ts`)

### `submitContactMessageAction(data)`
- **Description**: Submits a project inquiry message from the public contact form.
- **Authentication**: Not Required
- **Validation**: `contactMessageSchema` (Zod)
- **Input Payload**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@company.com",
    "company": "Acme Corp",
    "phone": "+15550000000",
    "service": "Full-Stack Web Platforms",
    "budget": "$10k - $25k",
    "message": "We need a custom enterprise platform built with Next.js."
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Thank you! Your message has been sent successfully...",
    "contactId": "65c..."
  }
  ```

---

## 3. Portfolio Management Actions (`src/actions/portfolio.ts`)

### `createPortfolioAction(data)`
- **Authentication**: Required (`SUPER_ADMIN`, `ADMIN`)
- **Revalidates**: `/admin/portfolio`, `/portfolio`, `/`

### `updatePortfolioAction(id, data)`
- **Authentication**: Required (`SUPER_ADMIN`, `ADMIN`)

### `deletePortfolioAction(id)`
- **Authentication**: Required (`SUPER_ADMIN`, `ADMIN`)

---

## 4. API HTTP Endpoints (`src/app/api/`)

### `GET /api/seed`
- **Description**: Seeds database with initial site settings, admin user, services, technologies, and portfolio case studies.
- **Authentication**: None
- **Response**: `{ "success": true, "message": "Database seeded successfully with professional data." }`
