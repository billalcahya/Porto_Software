"use server";

import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { requireAuth } from "@/lib/auth";
import { testimonialSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getTestimonialsAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const list = await Testimonial.find(query).sort({ order: 1, createdAt: -1 }).lean();
    return { success: true, testimonials: JSON.parse(JSON.stringify(list)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createTestimonialAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = testimonialSchema.parse(data);

    await connectDB();
    const item = await Testimonial.create(validated);

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, testimonial: JSON.parse(JSON.stringify(item)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateTestimonialAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = testimonialSchema.parse(data);

    await connectDB();
    const item = await Testimonial.findByIdAndUpdate(id, validated, { new: true });
    if (!item) return { success: false, error: "Testimonial not found" };

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, testimonial: JSON.parse(JSON.stringify(item)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
