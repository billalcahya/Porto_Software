/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getTestimonialsAction, createTestimonialAction, updateTestimonialAction, deleteTestimonialAction } from "@/actions/testimonials";
import { ITestimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<ITestimonial>>({
    name: "",
    position: "",
    company: "",
    avatar: "",
    message: "",
    rating: 5,
    featured: true,
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadData = async () => {
    const res = await getTestimonialsAction();
    if (res.success && res.testimonials) {
      setTestimonials(res.testimonials);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getTestimonialsAction().then((res) => {
      if (isMounted && res.success && res.testimonials) {
        setTestimonials(res.testimonials);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateTestimonialAction(editId, form);
    } else {
      await createTestimonialAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: ITestimonial) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteTestimonialAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      position: "",
      company: "",
      avatar: "",
      message: "",
      rating: 5,
      featured: true,
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Testimonials CMS</h2>
          <p className="text-xs text-zinc-400">Manage client endorsements, ratings, and executive quotes.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Position & Company</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading testimonials...
              </TableCell>
            </TableRow>
          ) : (
            testimonials.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold text-white">{item.name}</TableCell>
                <TableCell className="text-xs text-zinc-300">
                  {item.position}, <span className="text-zinc-400">{item.company}</span>
                </TableCell>
                <TableCell className="text-xs text-amber-400 font-mono">★ {item.rating}/5</TableCell>
                <TableCell>
                  <Badge variant={item.published ? "success" : "secondary"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit Testimonial" : "Add Testimonial"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Name *</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Position *</label>
              <Input required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Company *</label>
              <Input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Avatar Image URL</label>
              <Input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Testimonial Quote *</label>
            <Textarea
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
      />
    </div>
  );
}
