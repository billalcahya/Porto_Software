"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getPortfoliosAction, createPortfolioAction, updatePortfolioAction, deletePortfolioAction } from "@/actions/portfolio";
import { IPortfolio } from "@/types";
import { slugify } from "@/lib/utils";

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<IPortfolio>>({
    title: "",
    slug: "",
    client: "",
    category: "Fullstack",
    description: "",
    fullDescription: "",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    technologies: [],
    features: [],
    year: 2025,
    featured: true,
    published: true,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  const loadData = async () => {
    const res = await getPortfoliosAction();
    if (res.success && res.portfolios) {
      setPortfolios(res.portfolios);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getPortfoliosAction().then((res) => {
      if (isMounted && res.success && res.portfolios) {
        setPortfolios(res.portfolios);
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
      await updatePortfolioAction(editId, form);
    } else {
      await createPortfolioAction(form);
    }
    setIsModalOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item: IPortfolio) => {
    setEditId(item._id || null);
    setForm({
      ...item,
      fullDescription: item.fullDescription || "",
      gallery: item.gallery || [],
      features: item.features || [],
      technologies: item.technologies || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deletePortfolioAction(deleteId);
    setDeleteId(null);
    loadData();
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      slug: "",
      client: "",
      category: "Fullstack",
      description: "",
      fullDescription: "",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      gallery: [],
      technologies: [],
      features: [],
      year: 2025,
      featured: true,
      published: true,
    });
    setTechInput("");
    setFeatureInput("");
    setGalleryInput("");
  };

  const filteredPortfolios = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Portfolio & Case Studies</h2>
          <p className="text-xs text-zinc-400">Manage client projects, technical stacks, gallery images, and live demo links.</p>
        </div>

        <Button
          variant="glow"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Case Study
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search portfolios by title, client, or category..."
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
            <TableHead>Project Title</TableHead>
            <TableHead>Client & Category</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                Loading portfolio data...
              </TableCell>
            </TableRow>
          ) : filteredPortfolios.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                No portfolio items found.
              </TableCell>
            </TableRow>
          ) : (
            filteredPortfolios.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="font-bold text-white">{item.title}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">/{item.slug}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-zinc-200 font-semibold">{item.client}</div>
                  <Badge variant="glow" className="text-[10px] mt-1">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-mono text-zinc-400">{item.year}</TableCell>
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
        title={editId ? "Edit Case Study" : "Create Case Study"}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Project Title *</label>
              <Input required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Slug *</label>
              <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Client Name *</label>
              <Input required value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Category *</label>
              <Input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Year *</label>
              <Input
                required
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2025 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Thumbnail Image URL *</label>
            <Input
              required
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            />
          </div>

          {/* Gallery Images Manager */}
          <div className="space-y-3 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-zinc-200 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-lime-400" />
                Project Gallery Screenshots ({form.gallery?.length || 0})
              </label>
              {form.gallery && form.gallery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gallery: [] })}
                  className="text-[11px] font-mono text-red-400 hover:text-red-300 underline"
                >
                  Clear All ({form.gallery.length})
                </button>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Add multiple gallery screenshot URLs at once by separating URLs with commas or newlines.
            </p>
            <div className="flex gap-2">
              <Textarea
                rows={2}
                placeholder="Paste Image URLs here (separated by commas or line breaks for batch adding)..."
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                className="text-xs font-mono bg-zinc-900 border-zinc-800"
              />
              <Button
                type="button"
                className="shrink-0 self-end bg-lime-400 text-slate-950 hover:bg-lime-300 font-bold text-xs px-4"
                onClick={() => {
                  if (galleryInput.trim()) {
                    const urls = galleryInput
                      .split(/[\n,]+/)
                      .map((u) => u.trim())
                      .filter((u) => u.length > 0);
                    if (urls.length > 0) {
                      setForm({ ...form, gallery: [...(form.gallery || []), ...urls] });
                      setGalleryInput("");
                    }
                  }
                }}
              >
                + Add Images
              </Button>
            </div>

            {/* Gallery Thumbnail Preview Grid */}
            {form.gallery && form.gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-2">
                {form.gallery.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    className="relative group aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xs"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery screenshot ${gIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/80 text-[9px] font-mono px-1.5 py-0.5 rounded text-white">
                      #{gIdx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          gallery: form.gallery?.filter((_, i) => i !== gIdx),
                        })
                      }
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white opacity-90 group-hover:opacity-100 transition-opacity shadow-xs"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Short Summary Description *</label>
            <Textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Full Case Study In-Depth Story (Long-form Description)
            </label>
            <Textarea
              rows={6}
              placeholder="Write the full architectural story, challenge, solution, and results for the dedicated case study page..."
              value={form.fullDescription || ""}
              onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Key Features / Deliverables</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add feature (e.g. Real-time Telemetry, AI Triage)..."
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
            <div className="flex flex-wrap gap-2 mb-4">
              {form.features?.map((feat, fIdx) => (
                <span
                  key={fIdx}
                  onClick={() =>
                    setForm({ ...form, features: form.features?.filter((_, i) => i !== fIdx) })
                  }
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-lime-500/10 border border-lime-500/30 text-lime-400 cursor-pointer hover:border-red-500 hover:text-red-400"
                >
                  ✓ {feat} ×
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Technologies Used (Tags)</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tech (e.g. Next.js, Docker)..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (techInput.trim()) {
                    setForm({ ...form, technologies: [...(form.technologies || []), techInput.trim()] });
                    setTechInput("");
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.technologies?.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  onClick={() =>
                    setForm({ ...form, technologies: form.technologies?.filter((_, i) => i !== tIdx) })
                  }
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 cursor-pointer hover:border-red-500 hover:text-red-400"
                >
                  {tech} ×
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Live Project URL</label>
              <Input
                placeholder="https://example.com"
                value={form.projectUrl}
                onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">GitHub Repo URL</label>
              <Input
                placeholder="https://github.com/org/repo"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
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
              Featured Case Study
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
              Save Case Study
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Portfolio Item"
        message="Are you sure you want to delete this portfolio item?"
      />
    </div>
  );
}
