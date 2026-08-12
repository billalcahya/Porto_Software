"use server";

import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { requireAuth } from "@/lib/auth";
import { portfolioSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/activity";

export async function getPortfoliosAction(onlyPublished = false, category?: string) {
  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (onlyPublished) query.published = true;
    if (category && category !== "All") query.category = category;

    const portfolios = await Portfolio.find(query).sort({ order: 1, year: -1, createdAt: -1 }).lean();
    return { success: true, portfolios: JSON.parse(JSON.stringify(portfolios)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function getPortfolioBySlugAction(slug: string) {
  try {
    await connectDB();
    const portfolio = await Portfolio.findOne({ slug }).lean();
    if (!portfolio) return { success: false, error: "Portfolio not found" };
    return { success: true, portfolio: JSON.parse(JSON.stringify(portfolio)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createPortfolioAction(data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const validated = portfolioSchema.parse(data);

    await connectDB();
    const portfolio = await Portfolio.create(validated);

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_CREATED_PORTFOLIO",
      entity: "Portfolio",
      entityId: portfolio._id.toString(),
    });

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true, portfolio: JSON.parse(JSON.stringify(portfolio)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updatePortfolioAction(id: string, data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = portfolioSchema.parse(data);

    await connectDB();
    const portfolio = await Portfolio.findByIdAndUpdate(id, validated, { new: true });
    if (!portfolio) return { success: false, error: "Portfolio not found" };

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_UPDATED_PORTFOLIO",
      entity: "Portfolio",
      entityId: id,
    });

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${portfolio.slug}`);
    revalidatePath("/admin/portfolio");
    return { success: true, portfolio: JSON.parse(JSON.stringify(portfolio)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deletePortfolioAction(id: string) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    const portfolio = await Portfolio.findByIdAndDelete(id);
    if (!portfolio) return { success: false, error: "Portfolio not found" };

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_DELETED_PORTFOLIO",
      entity: "Portfolio",
      entityId: id,
    });

    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
