"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getTechnologiesAction, createTechnologyAction, updateTechnologyAction, deleteTechnologyAction } from "@/actions/technologies";
import { ITechnology } from "@/types";

export default function AdminTechnologiesPage() {
  const [techs, setTechs] = useState<ITechnology[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<ITechnology>>({
    name: "",
    icon: "Boxes",
    category: "Frontend",
    website: "",
    order: 1,
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadData = async () => {
    const res = await getTechnologiesAction();
    if (res.success && res.technologies) {
      setTechs(res.technologies);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getTechnologiesAction().then((res) => {
      if (isMounted && res.success && res.technologies) {
        setTechs(res.technologies);
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
      await updateTechnologyAction(editId, form);
    } else {
      await createTechnologyAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: ITechnology) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteTechnologyAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      icon: "Boxes",
      category: "Frontend",
      website: "",
      order: 1,
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Technology Stack CMS</h2>
          <p className="text-xs text-zinc-400">Manage tech stack icons, categories, and reference links.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Technology
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading technology stack...
              </TableCell>
            </TableRow>
          ) : (
            techs.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold text-white">{item.name}</TableCell>
                <TableCell className="text-xs text-zinc-300">{item.category}</TableCell>
                <TableCell className="text-xs font-mono text-blue-400">{item.icon}</TableCell>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit Tech" : "Add Tech"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Technology Name *</label>
            <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Category *</label>
            <Input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Icon Identifier (e.g. Boxes, Database, Code) *</label>
            <Input required value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Official Website URL</label>
            <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          </div>
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save Technology
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Technology"
      />
    </div>
  );
}
