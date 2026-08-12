"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getBlogPostsAction, createBlogPostAction, updateBlogPostAction, deleteBlogPostAction } from "@/actions/blog";
import { IBlogPost } from "@/types";
import { slugify, formatDate } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<IBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: "Engineering",
    tags: ["Next.js", "React"],
    author: "Alex Vance",
    status: "PUBLISHED",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  const loadData = async () => {
    const res = await getBlogPostsAction();
    if (res.success && res.posts) {
      setPosts(res.posts);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getBlogPostsAction().then((res) => {
      if (isMounted && res.success && res.posts) {
        setPosts(res.posts);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleTitleChange = (val: string) => {
    setForm({
      ...form,
      title: val,
      slug: editId ? form.slug : slugify(val),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateBlogPostAction(editId, form);
    } else {
      await createBlogPostAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: IBlogPost) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteBlogPostAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      category: "Engineering",
      tags: ["Next.js", "React"],
      author: "Alex Vance",
      status: "PUBLISHED",
    });
    setTagInput("");
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Blog & Insights CMS</h2>
          <p className="text-xs text-zinc-400">Publish articles, technical tutorials, and engineering case studies with rich editor support.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Create Article
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Article Title</TableHead>
            <TableHead>Category & Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading blog posts...
              </TableCell>
            </TableRow>
          ) : filteredPosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                No blog posts found.
              </TableCell>
            </TableRow>
          ) : (
            filteredPosts.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="font-bold text-white">{item.title}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">/{item.slug}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="glow" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <div className="text-xs text-zinc-400 mt-1">{item.author}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "PUBLISHED"
                        ? "success"
                        : item.status === "DRAFT"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-mono text-zinc-400">
                  {formatDate(item.createdAt || new Date())}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                    <Edit2 className="w-4 h-4 text-blue-400" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(item._id || null)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Article" : "Create Article"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Title *</label>
              <Input required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Slug *</label>
              <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Category *</label>
              <Input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Author *</label>
              <Input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Status *</label>
              <select
                className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED" })}
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Thumbnail Image URL *</label>
            <Input required value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Short Excerpt *</label>
            <Textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Article Body Content (Rich Markdown) *</label>
            <RichTextEditor
              value={form.content || ""}
              onChange={(val) => setForm({ ...form, content: val })}
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save Article
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this article?"
      />
    </div>
  );
}
