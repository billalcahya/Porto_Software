"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, User, Shield, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  userName?: string;
  userRole?: string;
  title?: string;
  onToggleMobileMenu?: () => void;
}

export function AdminHeader({
  userName = "Administrator",
  userRole = "SUPER_ADMIN",
  title,
  onToggleMobileMenu,
}: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-45 sm:max-w-none">
          {title || "Dashboard Overview"}
        </h1>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 px-2.5 sm:px-3 py-1.5 rounded-lg"
        >
          <span className="hidden sm:inline">View Live Website</span>
          <span className="sm:hidden">Live</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-white">{userName}</span>
            <Badge variant="glow" className="text-[9px] py-0 px-1.5 font-mono">
              <Shield className="w-2.5 h-2.5 mr-1 inline" />
              {userRole}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}

