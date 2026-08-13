"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminShellProps {
  userName?: string;
  userRole?: string;
  children: React.ReactNode;
}

export function AdminShell({ userName, userRole, children }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex relative">
      {/* Admin Sidebar */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          userName={userName}
          userRole={userRole}
          onToggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-zinc-950">{children}</main>
      </div>
    </div>
  );
}
