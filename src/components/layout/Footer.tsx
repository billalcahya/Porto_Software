"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { useLanguage } from "@/context/LanguageContext";
import { ISiteSettings } from "@/types";

interface FooterProps {
  settings?: ISiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#e8f2ff] border-t border-sky-200/80 text-slate-700 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-16 border-b border-sky-200/80">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.PNG"
                alt="DIGITAL THREE Logo"
                width={38}
                height={38}
                className="object-contain shrink-0 drop-shadow-sm"
              />
              <span className="text-xl font-extrabold tracking-wider text-slate-950 font-mono uppercase">
                {settings?.siteName || "DIGITAL THREE"}
                <span className="text-lime-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-700 leading-relaxed">
              {settings?.description ||
                t("footer.tagline", "Architects of next-generation software platforms, custom AI systems, and high-performance digital experiences.")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings?.socialLinks?.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-slate-950 hover:border-lime-400 transition-all shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-slate-950 hover:border-lime-400 transition-all shadow-xs"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-slate-950 hover:border-lime-400 transition-all shadow-xs"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-slate-950 hover:border-lime-400 transition-all shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-widest mb-4">{t("footer.nav_title", "Navigation")}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#hero" className="hover:text-sky-700 transition-colors">{t("nav.home", "Home")}</Link></li>
              <li><Link href="/#about" className="hover:text-sky-700 transition-colors">{t("nav.about", "About")}</Link></li>
              <li><Link href="/#services" className="hover:text-sky-700 transition-colors">{t("nav.services", "Services")}</Link></li>
              <li><Link href="/portfolio" className="hover:text-sky-700 transition-colors">{t("nav.work", "Work")}</Link></li>
              <li><Link href="/blog" className="hover:text-sky-700 transition-colors">{t("nav.blog", "Blog")}</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-widest mb-4">{t("footer.expertise_title", "Expertise")}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-sky-700 transition-colors">Next.js Web Applications</span></li>
              <li><span className="hover:text-sky-700 transition-colors">Mobile App Ecosystems</span></li>
              <li><span className="hover:text-sky-700 transition-colors">Enterprise AI & RAG Agents</span></li>
              <li><span className="hover:text-sky-700 transition-colors">Cloud DevOps Architecture</span></li>
              <li><span className="hover:text-sky-700 transition-colors">UI/UX & Motion Systems</span></li>
            </ul>
          </div>

          {/* Admin & Contact Info */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-widest mb-4">{t("footer.portal_title", "Client Portal")}</h4>
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              Access the administrative dashboard to manage content and view message inquiries.
            </p>
            <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 hover:text-sky-900 transition-colors">
              {t("footer.admin_link", "Admin Login Portal")}
              <ArrowUpRight className="w-4 h-4 text-lime-600" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 text-center sm:text-left">
          <p>© {currentYear} {settings?.siteName || "DIGITAL THREE"}. {t("footer.rights", "All rights reserved.")}</p>
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
