"use client";

import React, { useState, useEffect } from "react";
import { Mail, Trash2, CheckCircle2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getContactMessagesAction, updateMessageStatusAction, deleteContactMessageAction } from "@/actions/contact";
import { IContactMessage } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeMessage, setActiveMessage] = useState<IContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadData = async () => {
    const res = await getContactMessagesAction();
    if (res.success && res.messages) {
      setMessages(res.messages);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getContactMessagesAction().then((res) => {
      if (isMounted && res.success && res.messages) {
        setMessages(res.messages);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenMessage = async (item: IContactMessage) => {
    setActiveMessage(item);
    if (item.status === "NEW" && item._id) {
      await updateMessageStatusAction(item._id, "READ");
      loadData();
    }
  };

  const handleUpdateStatus = async (id: string, status: "NEW" | "READ" | "REPLIED" | "ARCHIVED") => {
    await updateMessageStatusAction(id, status);
    if (activeMessage && activeMessage._id === id) {
      setActiveMessage({ ...activeMessage, status });
    }
    loadData();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteContactMessageAction(deleteId);
    setDeleteId(null);
    if (activeMessage && activeMessage._id === deleteId) {
      setActiveMessage(null);
    }
    loadData();
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Client Inquiries & Messages</h2>
          <p className="text-xs text-zinc-400">Review project discovery forms submitted from the landing page.</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search messages by name, email, company..."
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
            <TableHead>Sender Info</TableHead>
            <TableHead>Service & Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Received Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading messages...
              </TableCell>
            </TableRow>
          ) : filteredMessages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                No messages found.
              </TableCell>
            </TableRow>
          ) : (
            filteredMessages.map((item) => (
              <TableRow key={item._id} className="cursor-pointer hover:bg-zinc-900/60" onClick={() => handleOpenMessage(item)}>
                <TableCell>
                  <div className="font-bold text-white flex items-center gap-2">
                    {item.name}
                    {item.company && <span className="text-xs font-normal text-zinc-400">({item.company})</span>}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono">{item.email}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-zinc-300 font-semibold">{item.service || "General"}</div>
                  <div className="text-[11px] font-mono text-blue-400 mt-0.5">{item.budget}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "NEW" ? "glow" : item.status === "REPLIED" ? "success" : "secondary"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-mono text-zinc-400">
                  {formatDate(item.createdAt || new Date())}
                </TableCell>
                <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(item._id || null)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Message Modal */}
      {activeMessage && (
        <Modal
          isOpen={Boolean(activeMessage)}
          onClose={() => setActiveMessage(null)}
          title={`Inquiry from ${activeMessage.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-zinc-300">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div>
                <span className="text-zinc-500 font-mono">Email:</span> <span className="text-white font-semibold">{activeMessage.email}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono">Phone:</span> <span className="text-white">{activeMessage.phone || "N/A"}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono">Service:</span> <span className="text-blue-400">{activeMessage.service || "N/A"}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono">Budget:</span> <span className="text-emerald-400">{activeMessage.budget || "N/A"}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase font-mono mb-2">Message Body:</h4>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(activeMessage._id!, "REPLIED")}
                >
                  Mark as Replied
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUpdateStatus(activeMessage._id!, "ARCHIVED")}
                >
                  Archive
                </Button>
              </div>
              <a
                href={`mailto:${activeMessage.email}?subject=Re: Inquiry from ${activeMessage.name}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="glow" size="sm" className="gap-2">
                  <Mail className="w-3.5 h-3.5" /> Reply Email
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
      />
    </div>
  );
}
