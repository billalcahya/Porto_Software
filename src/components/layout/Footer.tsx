"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { ISiteSettings } from "@/types";

interface FooterProps {
  settings?: ISiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 text-zinc-400 pt-16 pb-12 overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-zinc-800/60">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 p-px">
                <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-mono">
                {settings?.siteName || "NEXUS"}
                <span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {settings?.description ||
                "Architects of next-generation software platforms, custom AI systems, and high-performance digital experiences."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings?.socialLinks?.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#hero" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog & Insights</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Expertise</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-white transition-colors">Next.js Web Applications</span></li>
              <li><span className="hover:text-white transition-colors">Mobile App Ecosystems</span></li>
              <li><span className="hover:text-white transition-colors">Enterprise AI & RAG Agents</span></li>
              <li><span className="hover:text-white transition-colors">Cloud DevOps Architecture</span></li>
              <li><span className="hover:text-white transition-colors">UI/UX & Motion Systems</span></li>
            </ul>
          </div>

          {/* Admin & Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Client Portal</h4>
            <p className="text-sm text-zinc-400 mb-4">
              Access the administrative dashboard to manage content and view message inquiries.
            </p>
            <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Admin Login Portal
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <p>© {currentYear} {settings?.siteName || "NEXUS LABS"}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
