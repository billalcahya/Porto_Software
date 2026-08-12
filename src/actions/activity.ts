"use server";

import connectDB from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";
import { getSession } from "@/lib/auth";

export async function logActivity(params: {
  userId?: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    await connectDB();
    await ActivityLog.create({
      userId: params.userId || "",
      userName: params.userName,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId || "",
      metadata: params.metadata || {},
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}

export async function getActivityLogsAction() {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    await connectDB();
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(50).lean();
    return {
      success: true,
      logs: JSON.parse(JSON.stringify(logs)),
    };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
