"use client";

import React, { useState, useEffect } from "react";
import { Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSiteSettingsAction, updateSiteSettingsAction } from "@/actions/settings";
import { ISiteSettings } from "@/types";

export default function AdminAboutPage() {
  const [settings, setSettings] = useState<ISiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    getSiteSettingsAction().then((res) => {
      if (isMounted && res.success && res.settings) {
        setSettings(res.settings);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setStatusMsg(null);
    const res = await updateSiteSettingsAction(settings);
    setSaving(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: "About & Company information updated successfully!" });
    } else {
      setStatusMsg({ type: "error", text: res.error || "Failed to update about section." });
    }
  };

  if (loading || !settings) {
    return <div className="p-8 text-center text-zinc-400 font-mono">Loading About CMS...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">About & Vision CMS</h2>
          <p className="text-xs text-zinc-400">Manage company vision, mission statement, values, and stats.</p>
        </div>
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

      <form onSubmit={handleSave} className="glass-card p-8 rounded-3xl border-zinc-800 bg-zinc-950/80 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2">Company Vision *</label>
          <Textarea
            required
            rows={3}
            value={settings.vision}
            onChange={(e) => setSettings({ ...settings, vision: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2">Company Mission *</label>
          <Textarea
            required
            rows={3}
            value={settings.mission}
            onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-2">Core Engineering Values (Comma separated)</label>
          <Input
            value={settings.values?.join(", ")}
            onChange={(e) =>
              setSettings({
                ...settings,
                values: e.target.value.split(",").map((v) => v.trim()).filter(Boolean),
              })
            }
          />
        </div>

        <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Projects Completed</label>
            <Input
              type="number"
              value={settings.stats?.projectsCompleted}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, projectsCompleted: parseInt(e.target.value) || 0 },
                })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Satisfied Clients</label>
            <Input
              type="number"
              value={settings.stats?.satisfiedClients}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, satisfiedClients: parseInt(e.target.value) || 0 },
                })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Senior Engineers</label>
            <Input
              type="number"
              value={settings.stats?.teamExperts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, teamExperts: parseInt(e.target.value) || 0 },
                })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Years Experience</label>
            <Input
              type="number"
              value={settings.stats?.yearsExperience}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, yearsExperience: parseInt(e.target.value) || 0 },
                })
              }
            />
          </div>
        </div>

        <Button type="submit" variant="glow" disabled={saving} className="px-8 py-5 gap-2 font-bold">
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save About Settings"}
        </Button>
      </form>
    </div>
  );
}
