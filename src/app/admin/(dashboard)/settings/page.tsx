"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, AlertCircle, Settings, Share2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSiteSettingsAction, updateSiteSettingsAction } from "@/actions/settings";
import { ISiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<ISiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "social">("general");

  useEffect(() => {
    async function loadData() {
      const res = await getSiteSettingsAction();
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setStatusMsg(null);
    const res = await updateSiteSettingsAction(settings);
    setSaving(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Global Site Settings updated successfully!" });
    } else {
      setStatusMsg({ type: "error", text: res.error || "Failed to update settings." });
    }
  };

  if (loading || !settings) {
    return <div className="p-8 text-center text-zinc-400 font-mono">Loading Site Settings...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Global Site Settings</h2>
          <p className="text-xs text-zinc-400">Configure brand metadata, hero typography, SEO defaults, and social channels.</p>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "general"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          }`}
        >
          <Settings className="w-4 h-4" /> General & Hero
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "seo"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          }`}
        >
          <Search className="w-4 h-4" /> SEO & Meta
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "social"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          }`}
        >
          <Share2 className="w-4 h-4" /> Social Channels
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            statusMsg.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl space-y-6">
        {activeTab === "general" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Software House Brand Name *</label>
                <Input
                  required
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Tagline *</label>
                <Input
                  required
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Hero Large Heading *</label>
              <Input
                required
                value={settings.heroHeading}
                onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Hero Subheading *</label>
              <Textarea
                required
                rows={3}
                value={settings.heroSubheading}
                onChange={(e) => setSettings({ ...settings, heroSubheading: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Contact Email *</label>
                <Input
                  required
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Contact Phone *</label>
                <Input
                  required
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Headquarters Address *</label>
              <Input
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
          </>
        )}

        {activeTab === "seo" && (
          <>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Production Site URL</label>
              <Input
                placeholder="https://digitalthree.dev"
                value={settings.seo?.siteUrl || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, siteUrl: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Default Meta Title *</label>
              <Input
                required
                value={settings.seo?.metaTitle || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaTitle: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Default Meta Description *</label>
              <Textarea
                required
                rows={3}
                value={settings.seo?.metaDescription || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaDescription: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">SEO Keywords (Comma separated)</label>
              <Input
                value={settings.seo?.keywords?.join(", ") || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: {
                      ...settings.seo,
                      keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                    },
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Google Site Verification Token</label>
                <Input
                  placeholder="google-site-verification-token"
                  value={settings.seo?.googleSiteVerification || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, googleSiteVerification: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Default OpenGraph Image URL</label>
                <Input
                  placeholder="https://..."
                  value={settings.seo?.ogImage || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, ogImage: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">GitHub URL</label>
                <Input
                  value={settings.socialLinks?.github}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">LinkedIn URL</label>
                <Input
                  value={settings.socialLinks?.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Twitter / X URL</label>
                <Input
                  value={settings.socialLinks?.twitter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Instagram URL</label>
                <Input
                  value={settings.socialLinks?.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </>
        )}

        <Button type="submit" variant="glow" disabled={saving} className="px-8 py-5 gap-2 font-bold">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
