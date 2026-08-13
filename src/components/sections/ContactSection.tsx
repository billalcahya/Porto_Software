"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { submitContactMessageAction } from "@/actions/contact";
import { ISiteSettings } from "@/types";

interface ContactProps {
  settings?: ISiteSettings;
}

export function ContactSection({ settings }: ContactProps) {
  const { t } = useLanguage();

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
    <section id="contact" className="py-28 bg-[#f0f7ff] text-slate-900 relative border-t border-sky-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-sky-300 text-slate-900 font-bold">
              {t("contact.badge", "INITIATE PROJECT DISCOVERY")}
            </Badge>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.02] text-slate-950 font-sans">
              <GsapTextReveal text={t("contact.heading", "LET'S BUILD SOMETHING EXTRAORDINARY.")} />
            </h2>
            <p className="mt-6 text-base sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
              {t("contact.subheading", "Fill out the inquiry form below and our senior software architect will reach out within 24 hours.")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Contact Details Column */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-sky-200/80 shadow-xs space-y-8">
              <div>
                <h3 className="text-2xl font-bold uppercase text-slate-950 mb-2">{t("contact.direct", "Direct Contact")}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Have an urgent requirement or enterprise RFP? Contact us directly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">{t("contact.email_us", "Email Us")}</h4>
                    <p className="text-sm font-bold text-slate-950 mt-0.5 break-all">{settings?.contactEmail || "hello@nexuslabs.dev"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-lime-50 border border-lime-200 text-lime-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">{t("contact.call_us", "Call Direct")}</h4>
                    <p className="text-sm font-bold text-slate-950 mt-0.5">{settings?.contactPhone || "+1 (800) 458-9210"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">{t("contact.hq", "Headquarters")}</h4>
                    <p className="text-sm font-bold text-slate-950 mt-0.5">{settings?.address || "San Francisco, CA 94105"}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Column */}
          <ScrollReveal direction="right" delay={0.3} className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-sky-200/80 shadow-xs">
              {statusMsg && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium ${
                    statusMsg.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {statusMsg.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_name", "Full Name *")}</label>
                    <Input
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-sky-50/50 border-sky-200 text-slate-900 focus:ring-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_email", "Email Address *")}</label>
                    <Input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-sky-50/50 border-sky-200 text-slate-900 focus:ring-sky-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_company", "Company / Organization")}</label>
                    <Input
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-sky-50/50 border-sky-200 text-slate-900 focus:ring-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_phone", "Phone Number")}</label>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-sky-50/50 border-sky-200 text-slate-900 focus:ring-sky-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_service", "Primary Service Needed")}</label>
                    <select
                      className="w-full h-11 rounded-xl border border-sky-200 bg-sky-50/50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
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
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_budget", "Estimated Budget")}</label>
                    <select
                      className="w-full h-11 rounded-xl border border-sky-200 bg-sky-50/50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
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
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">{t("contact.form_message", "Project Brief / Message *")}</label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project goals, scope requirements, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-sky-50/50 border-sky-200 text-slate-900 focus:ring-sky-600"
                  />
                </div>

                <MagneticButton strength={0.2} className="w-full sm:w-auto">
                  <Button type="submit" disabled={loading} className="w-full sm:w-auto px-10 py-7 text-sm font-bold uppercase tracking-wider bg-lime-400 text-slate-950 hover:bg-lime-300 rounded-full gap-3 shadow-xl glow-lime border-none">
                    {loading ? t("contact.form_submitting", "Transmitting...") : t("contact.form_submit", "Send Inquiry")}
                    <Send className="w-4 h-4" />
                  </Button>
                </MagneticButton>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
