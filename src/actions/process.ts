"use server";

import connectDB from "@/lib/db";
import ProcessStep from "@/models/ProcessStep";
import { requireAuth } from "@/lib/auth";
import { processStepSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getProcessStepsAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const steps = await ProcessStep.find(query).sort({ stepNumber: 1, order: 1 }).lean();
    return { success: true, processSteps: JSON.parse(JSON.stringify(steps)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createProcessStepAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = processStepSchema.parse(data);

    await connectDB();
    const step = await ProcessStep.create(validated);

    revalidatePath("/");
    revalidatePath("/admin/process");
    return { success: true, processStep: JSON.parse(JSON.stringify(step)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateProcessStepAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = processStepSchema.parse(data);

    await connectDB();
    const step = await ProcessStep.findByIdAndUpdate(id, validated, { new: true });
    if (!step) return { success: false, error: "Step not found" };

    revalidatePath("/");
    revalidatePath("/admin/process");
    return { success: true, processStep: JSON.parse(JSON.stringify(step)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteProcessStepAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await ProcessStep.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/process");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
