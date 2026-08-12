"use server";

import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { requireAuth } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/activity";

export async function getSiteSettingsAction() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      // Return default initial values if none exists
      const created = await SiteSettings.create({});
      settings = created.toObject();
    }
    return { success: true, settings: JSON.parse(JSON.stringify(settings)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateSiteSettingsAction(data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = siteSettingsSchema.parse(data);

    await connectDB();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(validated);
    } else {
      Object.assign(settings, validated);
      await settings.save();
    }

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_UPDATED_SETTINGS",
      entity: "SiteSettings",
      entityId: settings._id.toString(),
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, settings: JSON.parse(JSON.stringify(settings)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
