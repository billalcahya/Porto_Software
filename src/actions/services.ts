"use server";

import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { requireAuth } from "@/lib/auth";
import { serviceSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/activity";

export async function getServicesAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const services = await Service.find(query).sort({ order: 1, createdAt: -1 }).lean();
    return { success: true, services: JSON.parse(JSON.stringify(services)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createServiceAction(data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = serviceSchema.parse(data);

    await connectDB();
    const service = await Service.create(validated);

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_CREATED_SERVICE",
      entity: "Service",
      entityId: service._id.toString(),
    });

    revalidatePath("/");
    revalidatePath("/admin/services");
    return { success: true, service: JSON.parse(JSON.stringify(service)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateServiceAction(id: string, data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = serviceSchema.parse(data);

    await connectDB();
    const service = await Service.findByIdAndUpdate(id, validated, { new: true });
    if (!service) return { success: false, error: "Service not found" };

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_UPDATED_SERVICE",
      entity: "Service",
      entityId: id,
    });

    revalidatePath("/");
    revalidatePath("/admin/services");
    return { success: true, service: JSON.parse(JSON.stringify(service)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteServiceAction(id: string) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    const service = await Service.findByIdAndDelete(id);
    if (!service) return { success: false, error: "Service not found" };

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_DELETED_SERVICE",
      entity: "Service",
      entityId: id,
    });

    revalidatePath("/");
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
