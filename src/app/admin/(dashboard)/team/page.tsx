"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getTeamMembersAction, createTeamMemberAction, updateTeamMemberAction, deleteTeamMemberAction } from "@/actions/team";
import { ITeamMember } from "@/types";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<ITeamMember>>({
    name: "",
    position: "",
    bio: "",
    avatar: "",
    skills: [],
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const loadData = async () => {
    const res = await getTeamMembersAction();
    if (res.success && res.teamMembers) {
      setTeam(res.teamMembers);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getTeamMembersAction().then((res) => {
      if (isMounted && res.success && res.teamMembers) {
        setTeam(res.teamMembers);
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
      await updateTeamMemberAction(editId, form);
    } else {
      await createTeamMemberAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: ITeamMember) => {
    setEditId(item._id || null);
    setForm(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteTeamMemberAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      position: "",
      bio: "",
      avatar: "",
      skills: [],
      published: true,
    });
    setSkillInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Team Members CMS</h2>
          <p className="text-xs text-zinc-400">Manage engineering team profiles, roles, and skills.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member Name</TableHead>
            <TableHead>Position / Title</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading team members...
              </TableCell>
            </TableRow>
          ) : (
            team.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold text-white">{item.name}</TableCell>
                <TableCell className="text-xs text-blue-400 font-semibold">{item.position}</TableCell>
                <TableCell className="text-xs text-zinc-400">{item.skills?.join(", ")}</TableCell>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit Member" : "Add Member"}>
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

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Avatar Image URL</label>
            <Input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Bio *</label>
            <Textarea required rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Save Member
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Team Member"
      />
    </div>
  );
}
