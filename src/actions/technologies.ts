"use server";

import connectDB from "@/lib/db";
import Technology from "@/models/Technology";
import { requireAuth } from "@/lib/auth";
import { technologySchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getTechnologiesAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const techs = await Technology.find(query).sort({ order: 1 }).lean();
    return { success: true, technologies: JSON.parse(JSON.stringify(techs)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createTechnologyAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = technologySchema.parse(data);

    await connectDB();
    const tech = await Technology.create(validated);

    revalidatePath("/");
    revalidatePath("/admin/technologies");
    return { success: true, technology: JSON.parse(JSON.stringify(tech)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateTechnologyAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = technologySchema.parse(data);

    await connectDB();
    const tech = await Technology.findByIdAndUpdate(id, validated, { new: true });
    if (!tech) return { success: false, error: "Technology not found" };

    revalidatePath("/");
    revalidatePath("/admin/technologies");
    return { success: true, technology: JSON.parse(JSON.stringify(tech)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteTechnologyAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await Technology.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/technologies");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
