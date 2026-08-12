"use server";

import connectDB from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { contactMessageSchema } from "@/lib/zod-schemas";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitContactMessageAction(data: unknown) {
  try {
    const validated = contactMessageSchema.parse(data);
    await connectDB();

    const contact = await ContactMessage.create({
      ...validated,
      status: "NEW",
    });

    revalidatePath("/admin/messages");
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. Our team will contact you shortly.",
      contactId: contact._id.toString(),
    };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message || "Failed to send message." };
  }
}

export async function getContactMessagesAction() {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    await connectDB();

    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return { success: true, messages: JSON.parse(JSON.stringify(messages)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateMessageStatusAction(id: string, status: "NEW" | "READ" | "REPLIED" | "ARCHIVED") {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    await connectDB();

    const message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    if (!message) return { success: false, error: "Message not found" };

    revalidatePath("/admin/messages");
    return { success: true, message: JSON.parse(JSON.stringify(message)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteContactMessageAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await ContactMessage.findByIdAndDelete(id);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
