"use client";

import React from "react";
import { CheckCircle2, Eye, Target } from "lucide-react";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { ISiteSettings } from "@/types";

interface AboutProps {
  settings?: ISiteSettings;
}

export function AboutSection({ settings }: AboutProps) {
  const { t, locale } = useLanguage();

  const visionText = locale === "id"
    ? t("about.vision_desc", "Menjadi pelopor pengalaman digital transformatif melalui rekayasa perangkat lunak modern, kecerdasan buatan, dan desain antarmuka kelas dunia.")
    : (settings?.vision || t("about.vision_desc", "To pioneer transformative digital experiences through modern software engineering, artificial intelligence, and world-class UI motion design."));

  const missionText = locale === "id"
    ? t("about.mission_desc", "Memberdayakan bisnis secara global dengan produk digital yang skalabel, aman, dan memukau dibangun dengan teknologi terdepan.")
    : (settings?.mission || t("about.mission_desc", "Empower businesses globally with scalable, secure, and visually stunning digital products built with state-of-the-art tech."));

  const descText = locale === "id"
    ? t("about.heading_sub", "Kami menjembatani rekayasa backend enterprise yang tangguh dengan desain antarmuka interaktif yang mulus.")
    : (settings?.description || t("about.heading_sub", "We bridge the gap between heavy enterprise backend engineering and fluid, interactive frontend motion design."));

  const stats = settings?.stats || {
    projectsCompleted: 148,
    satisfiedClients: 92,
    teamExperts: 28,
    yearsExperience: 9,
  };

  const defaultValuesEn = [
    "Uncompromising Engineering Precision",
    "Cinematic User Experience",
    "Predictable & Scalable Architecture",
    "Continuous AI Integration",
  ];

  const defaultValuesId = [
    "Presisi Rekayasa Tanpa Kompromi",
    "Pengalaman Pengguna Sinematik",
    "Arsitektur Skalabel & Terprediksi",
    "Integrasi Kecerdasan Buatan (AI)",
  ];

  const values = locale === "id" ? defaultValuesId : (settings?.values || defaultValuesEn);

  return (
    <section id="about" className="py-28 bg-[#e8f2ff] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-sky-300 text-slate-900 font-bold">
              {t("about.badge", "ABOUT DIGITAL THREE ATELIER")}
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-950 uppercase font-sans">
              <GsapTextReveal text={t("about.heading", "WE BRIDGE THE GAP BETWEEN HEAVY ENTERPRISE BACKEND & FLUID MOTION DESIGN.")} />
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl">
              {descText}
            </p>
          </div>
        </ScrollReveal>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-sky-200/80 shadow-xs h-full hover:border-lime-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">{t("about.vision_title", "Our Vision")}</h3>
              <p className="text-slate-700 leading-relaxed text-base">
                {visionText}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-sky-200/80 shadow-xs h-full hover:border-lime-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-lime-100 flex items-center justify-center text-lime-700 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">{t("about.mission_title", "Our Mission")}</h3>
              <p className="text-slate-700 leading-relaxed text-base">
                {missionText}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Values & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Values List */}
          <ScrollReveal direction="up" delay={0.4} className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-sky-200/80 shadow-xs h-full">
              <h3 className="text-2xl font-bold text-slate-950 mb-8">{t("about.values_title", "Our Core Engineering Values")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4.5 rounded-2xl bg-[#f0f7ff] border border-sky-200/60">
                    <CheckCircle2 className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Summary */}
          <ScrollReveal direction="up" delay={0.5} className="lg:col-span-1">
            <div className="bg-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl h-full flex flex-col justify-between border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider font-mono">{t("about.stats_title", "By The Numbers")}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-lime-400 font-mono">{stats.projectsCompleted}+</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">{t("about.stats_shipped", "Projects Shipped")}</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">{stats.satisfiedClients}+</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">{t("about.stats_clients", "Global Clients")}</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-lime-400 font-mono">{stats.teamExperts}</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">{t("about.stats_engineers", "Senior Engineers")}</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">{stats.yearsExperience} Yrs</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">{t("about.stats_mastery", "Industry Mastery")}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
