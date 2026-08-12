"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getFAQsAction, createFAQAction, updateFAQAction, deleteFAQAction } from "@/actions/faq";
import { IFAQ } from "@/types";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<IFAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<IFAQ>>({
    question: "",
    answer: "",
    category: "General",
    order: 1,
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadData = async () => {
    const res = await getFAQsAction();
    if (res.success && res.faqs) {
      setFaqs(res.faqs);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getFAQsAction().then((res) => {
      if (isMounted && res.success && res.faqs) {
        setFaqs(res.faqs);
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
      await updateFAQAction(editId, form);
    } else {
      await createFAQAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: IFAQ) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteFAQAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      question: "",
      answer: "",
      category: "General",
      order: 1,
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">FAQ CMS</h2>
          <p className="text-xs text-zinc-400">Manage accordion question and answer items.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add FAQ Item
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                Loading FAQs...
              </TableCell>
            </TableRow>
          ) : (
            faqs.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold text-white max-w-md truncate">{item.question}</TableCell>
                <TableCell className="text-xs text-zinc-300">{item.category}</TableCell>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit FAQ" : "Add FAQ"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Question *</label>
            <Input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Answer *</label>
            <Textarea
              required
              rows={4}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
            />
          </div>
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save FAQ
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete FAQ"
      />
    </div>
  );
}
