"use server";

import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import { requireAuth } from "@/lib/auth";
import { blogPostSchema } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/activity";

export async function getBlogPostsAction(onlyPublished = false, category?: string, search?: string) {
  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (onlyPublished) query.status = "PUBLISHED";
    if (category && category !== "All") query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await BlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return { success: true, posts: JSON.parse(JSON.stringify(posts)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function getBlogPostBySlugAction(slug: string) {
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) return { success: false, error: "Blog post not found" };
    return { success: true, post: JSON.parse(JSON.stringify(post)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function createBlogPostAction(data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = blogPostSchema.parse(data);

    await connectDB();
    const post = await BlogPost.create({
      ...validated,
      publishedAt: validated.status === "PUBLISHED" ? new Date() : undefined,
    });

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_PUBLISHED_BLOG",
      entity: "BlogPost",
      entityId: post._id.toString(),
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, post: JSON.parse(JSON.stringify(post)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function updateBlogPostAction(id: string, data: unknown) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
    const validated = blogPostSchema.parse(data);

    await connectDB();
    const post = await BlogPost.findByIdAndUpdate(id, validated, { new: true });
    if (!post) return { success: false, error: "Blog post not found" };

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_UPDATED_BLOG",
      entity: "BlogPost",
      entityId: id,
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");
    return { success: true, post: JSON.parse(JSON.stringify(post)) };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}

export async function deleteBlogPostAction(id: string) {
  try {
    const user = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await connectDB();

    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) return { success: false, error: "Blog post not found" };

    await logActivity({
      userId: user.id,
      userName: user.name,
      action: "ADMIN_DELETED_BLOG",
      entity: "BlogPost",
      entityId: id,
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, error: err.message };
  }
}
