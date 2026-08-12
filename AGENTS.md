SOFTWARE HOUSE LANDING PAGE
MASTER DEVELOPMENT INSTRUCTION

ROLE: Senior Fullstack Engineer, Software Architect, UI/UX Engineer, Motion Designer, Database Engineer, Security Engineer, dan QA Engineer.

TASK: Bangun aplikasi Software House Landing Page + Admin CMS secara production-ready menggunakan Next.js fullstack.

IMPORTANT: Jangan hanya membuat mockup atau dokumentasi. Agent harus langsung mengimplementasikan seluruh aplikasi ke dalam repository berdasarkan spesifikasi di dokumen ini.

1. DEVELOPMENT OBJECTIVE

Buat website software house yang:

modern
premium
cinematic
immersive
responsive
SEO friendly
fast
accessible
maintainable
scalable
memiliki animasi yang halus
memiliki admin dashboard
seluruh konten landing page dapat dikelola melalui admin
menggunakan database
siap production

Website harus terasa seperti website perusahaan teknologi profesional, bukan template landing page generik.

2. CORE TECHNOLOGY

Gunakan:

Next.js
App Router
TypeScript
React
Tailwind CSS
shadcn/ui
Framer Motion
GSAP jika diperlukan
Lucide React
MongoDB
Mongoose
Auth.js / NextAuth
Zod
React Hook Form

Gunakan Next.js sebagai fullstack framework.

JANGAN menggunakan
Express.js
Laravel
backend server terpisah
REST API server terpisah

Gunakan:

Server Components
Server Actions
Route Handlers jika memang diperlukan
Middleware
Mongoose
database service
3. DEVELOPMENT PRINCIPLE

Prioritaskan:

Functionality
Maintainability
Security
Performance
UX
Visual quality

Jangan membuat implementasi yang hanya terlihat bagus tetapi tidak benar-benar berfungsi.

Semua tombol, form, CRUD, authentication, database operation, upload, filtering, pagination, dan navigation harus benar-benar bekerja.

4. BEFORE CODING

Sebelum menulis kode:

Inspect repository.
Periksa file yang sudah tersedia.
Periksa package.json.
Periksa konfigurasi Next.js.
Periksa konfigurasi Tailwind.
Periksa environment variable.
Identifikasi apakah project sudah memiliki struktur tertentu.
Jangan menghapus fitur existing yang masih relevan.
Jika project kosong, setup project dengan struktur yang sesuai spesifikasi ini.
Buat implementation plan internal.
Setelah itu langsung mulai implementasi.

Jangan berhenti hanya pada planning.

5. DESIGN DIRECTION

Gunakan visual direction:

Theme

Cinematic Liquid Technology

Karakter visual:

dark futuristic
liquid glass
glassmorphism
subtle grain
aurora gradient
soft glow
large typography
editorial layout
smooth motion
sophisticated spacing
premium technology aesthetic

Jangan membuat desain seperti:

template Bootstrap
dashboard template biasa
landing page startup generik
terlalu banyak card
terlalu banyak gradient
terlalu banyak border
animasi berlebihan
6. COLOR SYSTEM

Default theme:

Background:
#050505

Surface:
#0A0A0A

Primary:
White

Secondary:
Muted Gray

Accent:
Electric / futuristic accent

Border:
rgba(255,255,255,0.08)

Gunakan CSS variables agar theme mudah diubah.

Support:

Dark Mode
Light Mode
7. TYPOGRAPHY

Gunakan typography modern.

Prioritas:

Inter
Geist
Space Grotesk

Gunakan typography hierarchy yang kuat.

Hero heading harus besar dan responsive.

Contoh struktur:

WE BUILD
DIGITAL
EXPERIENCES.

Jangan copy contoh tersebut secara literal jika tidak sesuai branding.

8. LANDING PAGE

Buat halaman:

/

Dengan section:

Navbar
Hero
Trusted By
About
Services
Selected Works
Technology
Process
Statistics
Testimonials
Team
Pricing
FAQ
CTA
Footer

Semua section harus responsive.

9. NAVBAR

Navbar harus:

sticky
transparent pada awal scroll
berubah ketika scroll
responsive
mobile menu
smooth navigation

Menu:

Home
About
Services
Work
Process
Blog
Contact

CTA:

Start a Project
10. HERO

Hero harus menjadi bagian paling impressive.

Gunakan:

large typography
animated background
liquid effect
subtle particles
mouse interaction
parallax
gradient glow
scroll indicator
animated CTA

Hero harus tetap performant.

Jangan menggunakan animation yang membuat mobile device berat.

11. ABOUT

Data berasal dari database.

Admin dapat mengubah:

title
description
vision
mission
values
company statistics
12. SERVICES

Service harus berasal dari database.

Model:

Service
├── title
├── slug
├── description
├── icon
├── image
├── features[]
├── order
├── featured
├── published
├── createdAt
└── updatedAt

Admin dapat:

create
read
update
delete
reorder
publish/unpublish
13. PORTFOLIO

Portfolio merupakan bagian utama website.

Model:

Portfolio
├── title
├── slug
├── client
├── category
├── description
├── thumbnail
├── gallery[]
├── technologies[]
├── projectUrl
├── githubUrl
├── year
├── featured
├── published
├── order
├── createdAt
└── updatedAt

Landing page menampilkan featured portfolio.

Buat:

/portfolio
/portfolio/[slug]

Portfolio detail harus cinematic.

14. TECHNOLOGY

Technology berasal dari database.

Contoh:

Next.js
React
TypeScript
Node.js
Laravel
Flutter
MongoDB
PostgreSQL
Docker
AWS

Admin dapat mengelola:

name
icon
category
website
order
published
15. PROCESS

Buat workflow:

Discovery
    ↓
Strategy
    ↓
Design
    ↓
Development
    ↓
Testing
    ↓
Deployment
    ↓
Maintenance

Data dapat dikelola melalui CMS.

16. TESTIMONIAL

Model:

Testimonial
├── name
├── position
├── company
├── avatar
├── message
├── rating
├── featured
├── published
├── order
├── createdAt
└── updatedAt
17. TEAM

Model:

TeamMember
├── name
├── position
├── bio
├── avatar
├── skills[]
├── socialLinks
├── order
├── published
├── createdAt
└── updatedAt
18. PRICING

Pricing harus dinamis.

Model:

PricingPlan
├── name
├── description
├── price
├── billing
├── features[]
├── highlighted
├── cta
├── order
├── published
├── createdAt
└── updatedAt
19. BLOG

Buat:

/blog
/blog/[slug]

Model:

BlogPost
├── title
├── slug
├── excerpt
├── content
├── thumbnail
├── category
├── tags[]
├── author
├── status
├── publishedAt
├── seo
├── createdAt
└── updatedAt

Status:

DRAFT
PUBLISHED
ARCHIVED

Blog harus memiliki:

search
category
tags
pagination
related posts
20. FAQ

Model:

FAQ
├── question
├── answer
├── category
├── order
├── published
├── createdAt
└── updatedAt

Gunakan accordion.

21. CONTACT

Buat contact form:

Name
Email
Company
Phone
Service
Budget
Message

Data disimpan ke MongoDB.

Model:

ContactMessage
├── name
├── email
├── company
├── phone
├── service
├── budget
├── message
├── status
├── createdAt
└── updatedAt

Status:

NEW
READ
REPLIED
ARCHIVED
22. ADMIN CMS

Buat route:

/admin

Dashboard harus benar-benar berfungsi.

Menu:

Dashboard

Content
├── About
├── Services
├── Portfolio
├── Technologies
├── Process
├── Testimonials
├── Team
├── Pricing
├── FAQ
└── Blog

Communication
└── Messages

Media
└── Media Library

Settings
├── General
├── SEO
└── Social Media

System
├── Users
└── Activity Logs
23. ADMIN DASHBOARD

Dashboard menampilkan:

total portfolio
total blog
total services
total messages
published content
draft content
recent messages
recent activity

Tambahkan chart jika memang berguna.

Jangan membuat dashboard terlalu ramai.

24. AUTHENTICATION

Gunakan Auth.js / NextAuth.

Implement:

Login
Logout
Session
Protected Routes
Role Based Access

Role:

SUPER_ADMIN
ADMIN
EDITOR

Permission harus berbeda berdasarkan role.

25. SECURITY

Implementasikan:

password hashing
secure session
protected admin routes
authorization
input validation
Zod validation
sanitized content
rate limiting untuk form penting
secure cookies
environment variables
prevent unauthorized mutations
prevent injection
prevent XSS

Jangan pernah menyimpan password plaintext.

26. DATABASE

Gunakan MongoDB + Mongoose.

Buat model terpisah:

User
Service
Portfolio
Technology
ProcessStep
Testimonial
TeamMember
PricingPlan
BlogPost
FAQ
ContactMessage
SiteSettings
Media
ActivityLog

Gunakan index untuk field yang sering digunakan:

slug
email
status
published
createdAt

Hindari query database yang tidak perlu.

27. SERVER ACTIONS

Gunakan Server Actions untuk mutation.

Contoh:

createPortfolio()
updatePortfolio()
deletePortfolio()

createService()
updateService()
deleteService()

createBlog()
updateBlog()
deleteBlog()

updateSiteSettings()

Setiap Server Action harus:

Authenticate user
Check permission
Validate input
Execute mutation
Handle error
Revalidate cache
Return safe response
28. ADMIN CRUD

Setiap CRUD harus memiliki:

loading state
error state
empty state
confirmation dialog
validation
toast
pagination
search
filter

Jangan hanya membuat UI CRUD tanpa backend implementation.

29. MEDIA LIBRARY

Admin dapat:

upload image
preview image
delete image
copy URL
select image
reuse image

Gunakan storage service yang sesuai.

Jangan menyimpan file binary besar langsung di MongoDB.

Gunakan environment variable untuk storage credentials.

30. SEO

Implement:

metadata
dynamic metadata
OpenGraph
Twitter Cards
sitemap
robots.txt
canonical URL
JSON-LD
structured data

Portfolio dan Blog harus memiliki dynamic metadata.

31. PERFORMANCE

Prioritaskan:

Server Components
image optimization
lazy loading
dynamic import
caching
revalidation
minimal client JavaScript
code splitting

Animasi berat harus hanya dijalankan pada bagian yang diperlukan.

32. ACCESSIBILITY

Implement:

semantic HTML
keyboard navigation
aria labels
focus states
sufficient contrast
accessible forms
reduced motion support

Jika user mengaktifkan:

prefers-reduced-motion

kurangi atau matikan animasi yang tidak penting.

33. RESPONSIVE

Wajib support:

Mobile
Tablet
Laptop
Desktop
Large Desktop

Pastikan:

navbar
typography
grid
animation
dashboard
forms
tables

semuanya usable pada mobile.

34. COMPONENT ARCHITECTURE

Buat reusable components.

Contoh:

components/
├── ui/
├── layout/
├── navbar/
├── footer/
├── hero/
├── sections/
├── portfolio/
├── blog/
├── forms/
├── animations/
└── admin/

Jangan membuat satu file component berisi ribuan baris.

35. FOLDER STRUCTURE

Target struktur:

src/
├── app/
│   ├── (marketing)/
│   ├── admin/
│   ├── api/
│   ├── blog/
│   ├── portfolio/
│   ├── login/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── animations/
│   └── admin/
│
├── actions/
│
├── features/
│   ├── portfolio/
│   ├── services/
│   ├── blog/
│   ├── testimonials/
│   └── contact/
│
├── models/
│
├── services/
│
├── lib/
│
├── hooks/
│
├── types/
│
├── utils/
│
└── config/

Sesuaikan jika ada alasan teknis yang lebih baik.

36. ERROR HANDLING

Buat:

loading.tsx
error.tsx
not-found.tsx

untuk route yang relevan.

Error harus user-friendly.

Jangan menampilkan stack trace atau informasi sensitif kepada user.

37. SEED DATA

Buat seed script untuk data awal.

Minimal:

1 admin
5 services
6 technologies
4 portfolio
3 testimonials
4 team members
3 pricing plans
6 FAQ
4 blog posts

Gunakan dummy data profesional.

Jangan menggunakan lorem ipsum jika bisa menggunakan konten realistis.

38. ENVIRONMENT VARIABLES

Buat:

.env.example

Minimal:

DATABASE_URL=

AUTH_SECRET=

NEXT_PUBLIC_APP_URL=

UPLOADTHING_TOKEN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Gunakan hanya provider storage yang benar-benar dipilih dalam implementation.

Jangan commit .env.

39. ADMIN UX

Admin harus terasa seperti CMS profesional.

Gunakan:

sidebar
topbar
breadcrumb
command/search
modal
drawer
tabs
data table
form
toast
confirmation dialog

Gunakan shadcn/ui.

40. CONTENT EDITOR

Untuk Blog gunakan rich text editor.

Editor harus mendukung:

heading
paragraph
bold
italic
link
image
list
quote
code block

Content harus disimpan dalam format yang aman dan mudah dirender.

41. ACTIVITY LOG

Catat aktivitas admin.

Contoh:

ADMIN_CREATED_PORTFOLIO
ADMIN_UPDATED_PORTFOLIO
ADMIN_DELETED_PORTFOLIO
ADMIN_PUBLISHED_BLOG
ADMIN_LOGIN
ADMIN_LOGOUT

Simpan:

user
action
entity
entityId
metadata
timestamp
42. QUALITY REQUIREMENT

Kode harus:

TypeScript strict
readable
modular
reusable
secure
production ready

Hindari:

any

kecuali benar-benar diperlukan.

Jangan meninggalkan:

TODO
FIXME
coming soon
not implemented

untuk fitur yang seharusnya sudah selesai.

43. TESTING

Minimal lakukan:

Type Check
npm run typecheck
Lint
npm run lint
Build
npm run build

Jika project menggunakan test framework, buat test untuk:

authentication
authorization
validation
CRUD
critical Server Actions
44. FINAL VALIDATION

Sebelum menyatakan selesai, lakukan pemeriksaan:

Public Website

Navbar bekerja

Hero bekerja

Semua section tampil

Portfolio bekerja

Blog bekerja

Contact form bekerja

Responsive

SEO tersedia

Dark/light mode bekerja

Admin

Login bekerja

Logout bekerja

Protected route bekerja

Role permission bekerja

Dashboard bekerja

Semua CRUD bekerja

Upload bekerja

Search bekerja

Filter bekerja

Pagination bekerja

Activity log bekerja

Technical

TypeScript tidak error

Lint tidak error

Build berhasil

Tidak ada broken import

Tidak ada console error

Tidak ada secret di repository

Tidak ada mock API yang menggantikan database production

Tidak ada fitur utama yang hanya berupa UI dummy

45. IMPLEMENTATION ORDER

Kerjakan secara bertahap:

Phase 1 — Foundation
Setup dependencies
Configure Next.js
Configure Tailwind
Configure shadcn
Configure MongoDB
Configure Mongoose
Configure authentication
Configure environment
Create architecture
Phase 2 — Database

Implement:

models
schemas
validation
indexes
seed
Phase 3 — Authentication

Implement:

login
logout
session
middleware
roles
permissions
Phase 4 — Admin CMS

Implement seluruh CRUD.

Phase 5 — Public Website

Implement seluruh landing page.

Phase 6 — Animation

Implement:

page transitions
scroll animation
hover interaction
parallax
liquid effects
Phase 7 — SEO

Implement seluruh SEO.

Phase 8 — Performance

Optimize:

images
rendering
caching
bundle
Phase 9 — QA

Test seluruh application flow.

Phase 10 — Production

Pastikan:

npm run build

berhasil.

46. IMPORTANT AGENT RULES
RULE 1

DO NOT ONLY EXPLAIN.

Implement the application.

RULE 2

Jika menemukan bug, perbaiki langsung.

Jangan hanya menjelaskan penyebabnya.

RULE 3

Jika dependency diperlukan, install dependency tersebut.

Jangan mengganti requirement hanya karena dependency belum tersedia.

RULE 4

Jika terdapat keputusan teknis yang tidak ditentukan, pilih solusi yang paling:

maintainable
secure
scalable
idiomatic Next.js
RULE 5

Jangan membuat REST API terpisah.

Gunakan:

Server Actions
Route Handlers
Server Components

sesuai kebutuhan.

RULE 6

Jangan membuat data statis untuk menggantikan database pada fitur CMS.

Contoh yang SALAH:

const portfolios = [...]

untuk data yang seharusnya berasal dari MongoDB.

Gunakan database.

RULE 7

Landing page harus membaca data dari CMS/database untuk content yang memang dikelola admin.

RULE 8

Admin tidak boleh dapat diakses tanpa authentication.

RULE 9

Jangan expose database credentials atau secret ke client.

RULE 10

Prioritaskan Server Components.

Gunakan "use client" hanya jika memang diperlukan.

47. DEFINITION OF DONE

Project dianggap selesai jika:

User
  ↓
Landing Page
  ↓
Browse Services
  ↓
Browse Portfolio
  ↓
Read Blog
  ↓
Submit Contact

dan:

Admin
  ↓
Login
  ↓
Dashboard
  ↓
Create/Edit/Delete Content
  ↓
Database
  ↓
Landing Page Automatically Updated

berjalan dengan baik.

48. FINAL OUTPUT FROM AGENT

Setelah implementasi selesai, berikan ringkasan:

## Implementation Summary

### Completed
- ...

### Architecture
- ...

### Database
- ...

### Authentication
- ...

### Admin CMS
- ...

### Public Website
- ...

### Security
- ...

### SEO
- ...

### Performance
- ...

### Testing
- ...

### Commands
- npm run dev
- npm run build
- npm run lint
- npm run typecheck

### Environment Variables
- ...

### Remaining Issues
- ...

Jika tidak ada issue:

Remaining Issues: None

Jangan menyatakan project selesai jika build masih gagal atau fitur utama belum berfungsi.