"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Code2, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getServicesAction, createServiceAction, updateServiceAction, deleteServiceAction } from "@/actions/services";
import { IService } from "@/types";
import { slugify } from "@/lib/utils";

export default function AdminServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<IService>>({
    title: "",
    slug: "",
    description: "",
    icon: "Code2",
    features: [],
    order: 1,
    featured: false,
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState("");

  const loadData = async () => {
    const res = await getServicesAction();
    if (res.success && res.services) {
      setServices(res.services);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getServicesAction().then((res) => {
      if (isMounted && res.success && res.services) {
        setServices(res.services);
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
      await updateServiceAction(editId, form);
    } else {
      await createServiceAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: IService) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteServiceAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      slug: "",
      description: "",
      icon: "Code2",
      features: [],
      order: 1,
      featured: false,
      published: true,
    });
    setFeatureInput("");
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Services Management</h2>
          <p className="text-xs text-zinc-400">Create, update, reorder, and publish software house capabilities.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search services..."
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
            <TableHead>Icon</TableHead>
            <TableHead>Title & Slug</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading services...
              </TableCell>
            </TableRow>
          ) : filteredServices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                No services found.
              </TableCell>
            </TableRow>
          ) : (
            filteredServices.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 w-9 h-9 flex items-center justify-center font-mono font-bold text-blue-400">
                    {item.icon.charAt(0)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-white">{item.title}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">/{item.slug}</div>
                </TableCell>
                <TableCell className="text-xs text-zinc-400">
                  {item.features?.length || 0} features listed
                </TableCell>
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Service" : "Create New Service"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Service Title *</label>
            <Input required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Slug *</label>
            <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Lucide Icon Name *</label>
            <select
              className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            >
              <option value="Code2">Code2 (Web Development)</option>
              <option value="Smartphone">Smartphone (Mobile App)</option>
              <option value="Cpu">Cpu (Artificial Intelligence)</option>
              <option value="Cloud">Cloud (Cloud & DevOps)</option>
              <option value="Layers">Layers (UI/UX Design)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Description *</label>
            <Textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Key Features List</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add feature item..."
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (featureInput.trim()) {
                    setForm({ ...form, features: [...(form.features || []), featureInput.trim()] });
                    setFeatureInput("");
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.features?.map((feat, fIdx) => (
                <span
                  key={fIdx}
                  onClick={() =>
                    setForm({ ...form, features: form.features?.filter((_, i) => i !== fIdx) })
                  }
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 cursor-pointer hover:border-red-500 hover:text-red-400"
                >
                  {feat} ×
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-zinc-800"
              />
              Featured Service
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-zinc-800"
              />
              Published
            </label>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save Service
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action is permanent."
      />
    </div>
  );
}
