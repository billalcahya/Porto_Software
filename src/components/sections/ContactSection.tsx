"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessageAction } from "@/actions/contact";
import { ISiteSettings } from "@/types";

interface ContactProps {
  settings?: ISiteSettings;
}

export function ContactSection({ settings }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Full-Stack Web Platforms",
    budget: "$10k - $25k",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const res = await submitContactMessageAction(formData);
    setLoading(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: res.message || "Message sent successfully!" });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "Full-Stack Web Platforms",
        budget: "$10k - $25k",
        message: "",
      });
    } else {
      setStatusMsg({ type: "error", text: res.error || "Failed to submit message." });
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 text-white relative">
      {/* Glow ambient background */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">INITIATE PROJECT DISCOVERY</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Fill out the inquiry form below and our senior software architect will reach out within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
          {/* Contact Details Column */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-1">
            <div className="glass-card p-5 sm:p-8 rounded-3xl border-zinc-800/80 bg-zinc-950/80 space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Direct Contact</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Have an urgent requirement or enterprise RFP? Contact us directly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase font-mono">Email Us</h4>
                    <p className="text-sm font-bold text-white mt-0.5 break-all">{settings?.contactEmail || "hello@nexuslabs.dev"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase font-mono">Call Direct</h4>
                    <p className="text-sm font-bold text-white mt-0.5">{settings?.contactPhone || "+1 (800) 458-9210"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase font-mono">Headquarters</h4>
                    <p className="text-sm font-bold text-white mt-0.5">{settings?.address || "San Francisco, CA 94105"}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Column */}
          <ScrollReveal direction="right" delay={0.3} className="lg:col-span-2">
            <div className="glass-card p-5 sm:p-8 lg:p-10 rounded-3xl border-zinc-800/80 bg-zinc-950/80">
              {statusMsg && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium ${
                    statusMsg.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                >
                  {statusMsg.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">Full Name *</label>
                    <Input
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">Email Address *</label>
                    <Input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">Company / Organization</label>
                    <Input
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">Phone Number</label>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">Primary Service Needed</label>
                    <select
                      className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Full-Stack Web Platforms">Full-Stack Web Platforms</option>
                      <option value="Mobile App Ecosystems">Mobile App Ecosystems</option>
                      <option value="Enterprise AI & LLM Solutions">Enterprise AI & LLM Solutions</option>
                      <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                      <option value="UI/UX & Motion Design Studio">UI/UX & Motion Design Studio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">Estimated Budget</label>
                    <select
                      className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="< $10k">&lt; $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k - $50k">$25,000 - $50,000</option>
                      <option value="$50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Project Brief / Message *</label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project goals, scope requirements, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="glow" disabled={loading} className="w-full sm:w-auto px-8 py-6 text-base font-bold gap-2">
                  {loading ? "Transmitting..." : "Send Inquiry"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
