"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/MagneticButton";

interface NavbarProps {
  siteName?: string;
}

export function Navbar({ siteName = "NEXUS" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/portfolio" },
    { name: "Process", href: "/#process" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/8 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 p-px shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-wider text-zinc-950 font-mono">
              {siteName}
              <span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full border border-black/8 shadow-xs">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-zinc-950 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton strength={0.2}>
              <Link href="/#contact" data-cursor="LET'S TALK">
                <Button variant="default" className="bg-zinc-950 text-white hover:bg-zinc-800 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider gap-2 group shadow-md">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 hover:text-zinc-950"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-3 animate-fadeIn max-h-[calc(100vh-5rem)] overflow-y-auto shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-zinc-800 hover:text-blue-600 py-2 border-b border-zinc-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="default" className="w-full justify-center gap-2 py-5 text-sm bg-zinc-950 text-white rounded-xl font-bold uppercase tracking-wider">
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

