"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Copy, Check, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getMediaFilesAction, createMediaItemAction, deleteMediaAction } from "@/actions/media";
import { IMedia } from "@/types";

export default function AdminMediaPage() {
  const [mediaFiles, setMediaFiles] = useState<IMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");

  const loadData = async () => {
    const res = await getMediaFilesAction();
    if (res.success && res.mediaFiles) {
      setMediaFiles(res.mediaFiles);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getMediaFilesAction().then((res) => {
      if (isMounted && res.success && res.mediaFiles) {
        setMediaFiles(res.mediaFiles);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !filename) return;

    await createMediaItemAction({
      filename,
      url,
      mimeType: "image/jpeg",
      size: 1024,
    });
    setIsModalOpen(false);
    setFilename("");
    setUrl("");
    loadData();
  };

  const handleCopyUrl = (itemUrl: string, id: string) => {
    navigator.clipboard.writeText(itemUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMediaAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Media Library</h2>
          <p className="text-xs text-zinc-400">Manage, preview, copy URLs, and reuse images across the platform.</p>
        </div>

        <Button variant="glow" onClick={() => setIsModalOpen(true)} className="gap-2 font-semibold">
          <Plus className="w-4 h-4" /> Add Image URL
        </Button>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-mono">Loading media gallery...</div>
      ) : mediaFiles.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
          <p className="text-sm">No media files registered in the library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaFiles.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group relative flex flex-col justify-between"
            >
              <div className="relative h-36 w-full bg-zinc-900">
                <Image src={item.url} alt={item.filename} fill className="object-cover" />
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs font-semibold text-white truncate">{item.filename}</p>
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleCopyUrl(item.url, item._id!)}
                    className="flex items-center gap-1 text-[10px] text-blue-400 hover:underline font-mono"
                  >
                    {copiedId === item._id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedId === item._id ? "Copied" : "Copy URL"}
                  </button>
                  <button
                    onClick={() => setDeleteId(item._id || null)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Image URL">
        <form onSubmit={handleAddMedia} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Image Title / Filename *</label>
            <Input
              required
              placeholder="e.g. hero-banner.jpg"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Image URL *</label>
            <Input
              required
              placeholder="https://images.unsplash.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="glow">
              Add to Library
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Media File"
        message="Are you sure you want to remove this media file from the library?"
      />
    </div>
  );
}
