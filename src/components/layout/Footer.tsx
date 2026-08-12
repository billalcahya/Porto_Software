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
    <footer className="bg-[#F7F7F5] border-t border-black/8 text-zinc-600 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-16 border-b border-zinc-200/80">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-950 p-px shadow-xs">
                <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-zinc-950 font-mono">
                {settings?.siteName || "NEXUS"}
                <span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {settings?.description ||
                "Architects of next-generation software platforms, custom AI systems, and high-performance digital experiences."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings?.socialLinks?.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 transition-all shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 transition-all shadow-xs"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 transition-all shadow-xs"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 transition-all shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-zinc-950 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#hero" className="hover:text-zinc-950 transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-zinc-950 transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-zinc-950 transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-zinc-950 transition-colors">Portfolio Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-zinc-950 transition-colors">Blog & Insights</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-mono font-bold text-zinc-950 uppercase tracking-widest mb-4">Expertise</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-zinc-950 transition-colors">Next.js Web Applications</span></li>
              <li><span className="hover:text-zinc-950 transition-colors">Mobile App Ecosystems</span></li>
              <li><span className="hover:text-zinc-950 transition-colors">Enterprise AI & RAG Agents</span></li>
              <li><span className="hover:text-zinc-950 transition-colors">Cloud DevOps Architecture</span></li>
              <li><span className="hover:text-zinc-950 transition-colors">UI/UX & Motion Systems</span></li>
            </ul>
          </div>

          {/* Admin & Contact Info */}
          <div>
            <h4 className="text-xs font-mono font-bold text-zinc-950 uppercase tracking-widest mb-4">Client Portal</h4>
            <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
              Access the administrative dashboard to manage content and view message inquiries.
            </p>
            <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors">
              Admin Login Portal
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <p>© {currentYear} {settings?.siteName || "NEXUS ATELIER"}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
