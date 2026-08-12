"use server";

import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { requireAuth } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getTeamMembersAction(onlyPublished = false) {
  try {
    await connectDB();
    const query = onlyPublished ? { published: true } : {};
    const team = await TeamMember.find(query).sort({ order: 1 }).lean();
    return { success: true, teamMembers: JSON.parse(JSON.stringify(team)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createTeamMemberAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = teamMemberSchema.parse(data);

    await connectDB();
    const member = await TeamMember.create(validated);

    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true, teamMember: JSON.parse(JSON.stringify(member)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateTeamMemberAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = teamMemberSchema.parse(data);

    await connectDB();
    const member = await TeamMember.findByIdAndUpdate(id, validated, { new: true });
    if (!member) return { success: false, error: "Team member not found" };

    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true, teamMember: JSON.parse(JSON.stringify(member)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteTeamMemberAction(id: string) {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    await TeamMember.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
