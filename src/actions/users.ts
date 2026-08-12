"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { requireAuth, hashPassword } from "@/lib/auth";
import { userSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function getUsersAction() {
  try {
    await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
    return { success: true, users: JSON.parse(JSON.stringify(users)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createUserAction(data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN"]);
    const validated = userSchema.parse(data);

    if (!validated.password) {
      return { success: false, error: "Password is required for new user creation." };
    }

    await connectDB();
    const existing = await User.findOne({ email: validated.email.toLowerCase() });
    if (existing) return { success: false, error: "User with this email already exists." };

    const hashedPassword = await hashPassword(validated.password);
    const newUser = await User.create({
      ...validated,
      email: validated.email.toLowerCase(),
      password: hashedPassword,
    });

    revalidatePath("/admin/users");
    return { success: true, user: JSON.parse(JSON.stringify(newUser)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateUserAction(id: string, data: unknown) {
  try {
    await requireAuth(["SUPER_ADMIN"]);
    const validated = userSchema.parse(data);

    await connectDB();
    const user = await User.findById(id);
    if (!user) return { success: false, error: "User not found" };

    user.name = validated.name;
    user.email = validated.email.toLowerCase();
    user.role = validated.role;
    user.status = validated.status;
    if (validated.avatar) user.avatar = validated.avatar;

    if (validated.password && validated.password.length >= 6) {
      user.password = await hashPassword(validated.password);
    }

    await user.save();

    revalidatePath("/admin/users");
    return { success: true, user: JSON.parse(JSON.stringify(user)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteUserAction(id: string) {
  try {
    const session = await requireAuth(["SUPER_ADMIN"]);
    if (session.id === id) {
      return { success: false, error: "You cannot delete your own account." };
    }

    await connectDB();
    await User.findByIdAndDelete(id);

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
