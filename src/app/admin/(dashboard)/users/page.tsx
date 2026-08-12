"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getUsersAction, createUserAction, updateUserAction, deleteUserAction } from "@/actions/users";
import { IUser, UserRole } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<IUser>>({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    status: "ACTIVE",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    const res = await getUsersAction();
    if (res.success && res.users) {
      setUsers(res.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getUsersAction().then((res) => {
      if (isMounted && res.success && res.users) {
        setUsers(res.users);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    let res;
    if (editId) {
      res = await updateUserAction(editId, form);
    } else {
      res = await createUserAction(form);
    }

    if (res.success) {
      setIsModalOpen(false);
      resetForm();
      loadData();
    } else {
      setErrorMsg(res.error || "Failed to save user.");
    }
  };

  const handleEdit = (item: IUser) => {
    setEditId(item._id || null);
    setForm({ ...item, password: "" });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteUserAction(deleteId);
    setDeleteId(null);
    if (!res.success) {
      alert(res.error || "Could not delete user.");
    }
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setErrorMsg("");
    setForm({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
      status: "ACTIVE",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Users & RBAC</h2>
          <p className="text-xs text-zinc-400">Manage admin access, password updates, and role permissions (SUPER_ADMIN, ADMIN, EDITOR).</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Create User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading users...
              </TableCell>
            </TableRow>
          ) : (
            users.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold text-white">{item.name}</TableCell>
                <TableCell className="text-xs font-mono text-zinc-300">{item.email}</TableCell>
                <TableCell>
                  <Badge variant={item.role === "SUPER_ADMIN" ? "glow" : "secondary"}>{item.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "ACTIVE" ? "success" : "secondary"}>{item.status}</Badge>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit User" : "Create User"}>
        <form onSubmit={handleSave} className="space-y-4">
          {errorMsg && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{errorMsg}</div>}

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
            <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address *</label>
            <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              {editId ? "New Password (Leave blank to keep unchanged)" : "Password *"}
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              required={!editId}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Role *</label>
              <select
                className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="ADMIN">ADMIN</option>
                <option value="EDITOR">EDITOR</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Status *</label>
              <select
                className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "ACTIVE" | "INACTIVE" })}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save User
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete User Account"
      />
    </div>
  );
}
