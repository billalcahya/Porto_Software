"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Info,
  Code2,
  Briefcase,
  Cpu,
  GitBranch,
  Quote,
  Users,
  CreditCard,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  UserCheck,
  Activity,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navSections = [
    {
      title: "Core",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "Content Management",
      items: [
        { name: "About Company", href: "/admin/about", icon: Info },
        { name: "Services", href: "/admin/services", icon: Code2 },
        { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
        { name: "Technologies", href: "/admin/technologies", icon: Cpu },
        { name: "Process Steps", href: "/admin/process", icon: GitBranch },
        { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
        { name: "Team Members", href: "/admin/team", icon: Users },
        { name: "Pricing Plans", href: "/admin/pricing", icon: CreditCard },
        { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
        { name: "Blog Posts", href: "/admin/blog", icon: BookOpen },
      ],
    },
    {
      title: "Communication & Media",
      items: [
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
        { name: "Media Library", href: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      title: "System & Settings",
      items: [
        { name: "Site Settings", href: "/admin/settings", icon: Settings },
        { name: "User Accounts", href: "/admin/users", icon: UserCheck },
        { name: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 min-h-screen flex flex-col justify-between shrink-0">
      <div className="p-6">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md shadow-blue-500/20">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-white font-mono tracking-wider">NEXUS CMS</span>
            <span className="text-[10px] text-zinc-400">Control Panel</span>
          </div>
        </Link>

        {/* Navigation Sections */}
        <div className="space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <div className="p-4 border-t border-zinc-900">
        <button
          onClick={async () => {
            await logoutAction();
            router.push("/admin/login");
            router.refresh();
          }}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
