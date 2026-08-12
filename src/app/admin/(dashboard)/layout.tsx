import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSession } from "@/lib/auth";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <AdminShell userName={session?.name} userRole={session?.role}>
      {children}
    </AdminShell>
  );
}

