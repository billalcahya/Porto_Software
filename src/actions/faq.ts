"use server";

import connectDB from "@/lib/db";
import FAQ from "@/models/FAQ";
import { requireAuth } from "@/lib/auth";
import { faqSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getFAQsAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const faqs = await FAQ.find(query).sort({ order: 1 }).lean();
    return { success: true, faqs: JSON.parse(JSON.stringify(faqs)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createFAQAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = faqSchema.parse(data);

    await connectDB();
    const faq = await FAQ.create(validated);

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true, faq: JSON.parse(JSON.stringify(faq)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateFAQAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = faqSchema.parse(data);

    await connectDB();
    const faq = await FAQ.findByIdAndUpdate(id, validated, { new: true });
    if (!faq) return { success: false, error: "FAQ not found" };

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true, faq: JSON.parse(JSON.stringify(faq)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteFAQAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await FAQ.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
