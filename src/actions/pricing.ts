"use server";

import connectDB from "@/lib/db";
import PricingPlan from "@/models/PricingPlan";
import { requireAuth } from "@/lib/auth";
import { pricingPlanSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getPricingPlansAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const plans = await PricingPlan.find(query).sort({ order: 1 }).lean();
    return { success: true, pricingPlans: JSON.parse(JSON.stringify(plans)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createPricingPlanAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = pricingPlanSchema.parse(data);

    await connectDB();
    const plan = await PricingPlan.create(validated);

    revalidatePath("/");
    revalidatePath("/admin/pricing");
    return { success: true, pricingPlan: JSON.parse(JSON.stringify(plan)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updatePricingPlanAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = pricingPlanSchema.parse(data);

    await connectDB();
    const plan = await PricingPlan.findByIdAndUpdate(id, validated, { new: true });
    if (!plan) return { success: false, error: "Plan not found" };

    revalidatePath("/");
    revalidatePath("/admin/pricing");
    return { success: true, pricingPlan: JSON.parse(JSON.stringify(plan)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deletePricingPlanAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await PricingPlan.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
