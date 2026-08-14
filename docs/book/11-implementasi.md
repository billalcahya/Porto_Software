# Bab 11 — Panduan Implementasi Kode

Bab ini menjelaskan tutorial praktis bagi pengembang untuk menambahkan modul data baru ke dalam aplikasi **DIGITAL THREE**.

## 11.1 Tahap 1: Membuat Skema Mongoose Model Baru

Buat file model baru di direktori `src/models/` (misalnya `src/models/Partner.ts`):

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IPartner extends Document {
  name: string;
  logo: string;
  website?: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PartnerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    website: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);
```

## 11.2 Tahap 2: Membuat Validasi Skema Zod

Tambahkan Zod Schema di file `src/lib/zod-schemas.ts`:

```typescript
export const partnerSchema = z.object({
  name: z.string().min(2, "Partner name is required."),
  logo: z.string().min(1, "Logo URL is required."),
  website: z.string().optional().default(""),
  order: z.number().default(0),
  published: z.boolean().default(true),
});
```

## 11.3 Tahap 3: Membuat Server Action Backend

Buat file Server Action baru di `src/actions/partners.ts`:

```typescript
"use server";

import connectDB from "@/lib/db";
import Partner from "@/models/Partner";
import { partnerSchema } from "@/lib/zod-schemas";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createPartnerAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = partnerSchema.parse(data);

    await connectDB();
    const partner = await Partner.create(validated);

    revalidatePath("/admin/partners");
    revalidatePath("/");

    return { success: true, partner: JSON.parse(JSON.stringify(partner)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
```

## 11.4 Tahap 4: Mengintegrasikan ke Halaman Dashboard & UI Publik

1. Buat halaman admin baru di `src/app/admin/(dashboard)/partners/page.tsx` menggunakan komponen UI shadcn/ui.
2. Panggil data dari Server Component publik (misalnya di `src/app/(marketing)/page.tsx`):
   ```typescript
   const partners = await Partner.find({ published: true }).sort({ order: 1 }).lean();
   ```
3. Uji tampilan antarmuka dan jalankan `npm run lint` serta `npx tsc --noEmit` untuk memastikan tipe data valid.
