"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getPricingPlansAction, createPricingPlanAction, updatePricingPlanAction, deletePricingPlanAction } from "@/actions/pricing";
import { IPricingPlan } from "@/types";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<IPricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<IPricingPlan>>({
    name: "",
    description: "",
    price: "$10,000",
    billing: "per project",
    features: [],
    highlighted: false,
    cta: "Get Started",
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadData = async () => {
    const res = await getPricingPlansAction();
    if (res.success && res.pricingPlans) {
      setPlans(res.pricingPlans);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getPricingPlansAction().then((res) => {
      if (isMounted && res.success && res.pricingPlans) {
        setPlans(res.pricingPlans);
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
      await updatePricingPlanAction(editId, form);
    } else {
      await createPricingPlanAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: IPricingPlan) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deletePricingPlanAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      description: "",
      price: "$10,000",
      billing: "per project",
      features: [],
      highlighted: false,
      cta: "Get Started",
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Pricing Plans CMS</h2>
          <p className="text-xs text-zinc-400">Manage development packages, pricing tiers, and feature deliverables.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Pricing Tier
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading pricing plans...
              </TableCell>
            </TableRow>
          ) : (
            plans.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold text-white">
                  {item.name} {item.highlighted && <Badge variant="glow" className="ml-2 text-[9px]">Popular</Badge>}
                </TableCell>
                <TableCell className="font-mono text-emerald-400 font-bold">{item.price}</TableCell>
                <TableCell className="text-xs text-zinc-400 font-mono">/ {item.billing}</TableCell>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit Tier" : "Add Tier"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Plan Name *</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Price *</label>
              <Input required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Description *</label>
            <Textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.highlighted}
                onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
              />
              Highlight as Popular
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save Plan
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Pricing Tier"
      />
    </div>
  );
}
