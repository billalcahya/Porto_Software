"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyPassword, setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";
import { loginSchema } from "@/lib/zod-schemas";
import { logActivity } from "@/actions/activity";

export async function loginAction(formData: unknown) {
  try {
    const validated = loginSchema.parse(formData);
    await connectDB();

    const user = await User.findOne({ email: validated.email.toLowerCase() });
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    if (user.status !== "ACTIVE") {
      return { success: false, error: "Account is inactive. Please contact administrator." };
    }

    if (!user.password) {
      return { success: false, error: "Invalid email or password." };
    }

    const isValidPassword = await verifyPassword(validated.password, user.password);
    if (!isValidPassword) {
      return { success: false, error: "Invalid email or password." };
    }

    const sessionUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    await setSessionCookie(sessionUser);

    await logActivity({
      userId: sessionUser.id,
      userName: sessionUser.name,
      action: "ADMIN_LOGIN",
      entity: "User",
      entityId: sessionUser.id,
    });

    return { success: true, user: sessionUser };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message || "An unexpected login error occurred." };
  }
}

export async function logoutAction() {
  const session = await getSession();
  if (session) {
    await logActivity({
      userId: session.id,
      userName: session.name,
      action: "ADMIN_LOGOUT",
      entity: "User",
      entityId: session.id,
    });
  }
  await clearSessionCookie();
  return { success: true };
}

export async function getSessionUserAction() {
  const session = await getSession();
  return session;
}
