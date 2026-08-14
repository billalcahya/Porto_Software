"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
<<<<<<< Updated upstream
=======
import Image from "next/image";
>>>>>>> Stashed changes
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

import Image from "next/image";

interface NavbarProps {
  siteName?: string;
}

export function Navbar({ siteName = "DIGITAL THREE" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home", "Home"), href: "/#hero" },
    { name: t("nav.about", "About"), href: "/#about" },
    { name: t("nav.services", "Services"), href: "/#services" },
    { name: t("nav.work", "Work"), href: "/portfolio" },
    { name: t("nav.process", "Process"), href: "/#process" },
    { name: t("nav.blog", "Blog"), href: "/blog" },
    { name: t("nav.contact", "Contact"), href: "/#contact" },
  ];

  return (
    <header
<<<<<<< Updated upstream
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-sky-200/80 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
=======
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? "bg-white/85 backdrop-blur-xl border-b border-black/8 py-3 shadow-xs"
        : "bg-transparent py-5"
        }`}
>>>>>>> Stashed changes
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
<<<<<<< Updated upstream
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.PNG"
              alt="DIGITAL THREE Logo"
              width={42}
              height={42}
              priority
              className="object-contain shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            />
            <span className="text-xl font-extrabold tracking-wider text-sky-950 font-mono uppercase">
              {siteName}
              <span className="text-lime-500">.</span>
            </span>
=======
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 sm:w-16 sm:h-20 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                {/* 
                  Make sure you have a logo.png in your public folder! 
                  Alternatively, change "/logo.png" to "/logo.svg" or whatever your filename is.
                */}
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
>>>>>>> Stashed changes
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden md:flex items-center gap-8 px-6 py-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-white/80 backdrop-blur-md border border-zinc-200/80 shadow-xs"
                : "bg-transparent border border-transparent shadow-none"
            }`}
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-sky-600 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-lime-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <MagneticButton strength={0.2}>
              <Link href="/#contact">
                <Button className="bg-lime-400 text-slate-950 hover:bg-lime-300 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider gap-2 group shadow-md glow-lime border-none">
                  {t("nav.start_project", "Start a Project")}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white border border-sky-200 text-slate-800 hover:text-sky-950 shadow-xs"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-sky-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 animate-fadeIn max-h-[calc(100vh-5rem)] overflow-y-auto shadow-xl">
          <div className="flex items-center justify-between py-2 border-b border-sky-100">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">Language / Bahasa</span>
            <LanguageSwitcher />
          </div>

          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-bold text-slate-800 hover:text-sky-700 py-2 border-b border-sky-100"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full justify-center gap-2 py-5 text-sm bg-lime-400 text-slate-950 font-bold uppercase tracking-wider rounded-xl shadow-md glow-lime">
                {t("nav.start_project", "Start a Project")}
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
