"use server";

import connectDB from "@/lib/db";
import Media from "@/models/Media";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getMediaFilesAction() {
  try {
    await connectDB();
    const mediaFiles = await Media.find().sort({ createdAt: -1 }).lean();
    return { success: true, mediaFiles: JSON.parse(JSON.stringify(mediaFiles)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createMediaItemAction(data: {
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  provider?: string;
}) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    await connectDB();

    const media = await Media.create({
      filename: data.filename,
      url: data.url,
      mimeType: data.mimeType,
      size: data.size,
      provider: data.provider || "url",
    });

    revalidatePath("/admin/media");
    return { success: true, media: JSON.parse(JSON.stringify(media)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteMediaAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await Media.findByIdAndDelete(id);
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
