import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  let settings;
  try {
    await connectDB();
    const settingsDoc = await SiteSettings.findOne().lean();
    settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : undefined;
  } catch (err) {
    console.warn("Marketing Layout DB connection offline:", err);
  }

  return (
    <>
      <Navbar siteName={settings?.siteName} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
