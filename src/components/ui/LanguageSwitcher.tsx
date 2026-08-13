"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-white/90 border border-sky-200 shadow-xs">
      <button
        onClick={() => setLocale("en")}
        title="English"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase transition-all duration-300 ${
          locale === "en"
            ? "bg-slate-950 text-white shadow-xs"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        <span className="text-xs">🇺🇸</span>
        <span>EN</span>
      </button>

      <button
        onClick={() => setLocale("id")}
        title="Bahasa Indonesia"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase transition-all duration-300 ${
          locale === "id"
            ? "bg-lime-400 text-slate-950 font-black shadow-xs glow-lime"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        <span className="text-xs">🇮🇩</span>
        <span>ID</span>
      </button>
    </div>
  );
}
