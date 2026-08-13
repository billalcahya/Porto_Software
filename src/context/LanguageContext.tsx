"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nexus_lang") as Locale;
    if (saved === "en" || saved === "id") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("nexus_lang", newLocale);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[locale] && translations[locale][key]) {
      return translations[locale][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if invoked outside provider
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: (key: string, fallback?: string) => fallback || key,
    };
  }
  return context;
}
