import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageLoader } from "@/components/animations/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS | Bright Cinematic Digital Atelier",
  description:
    "We build high-performance web applications, mobile platforms, enterprise cloud systems, and AI LLM solutions with bright cinematic aesthetics.",
  keywords: [
    "Software House",
    "Creative Technology Atelier",
    "Next.js Development",
    "WebGL Three.js Studio",
    "Enterprise AI",
    "Cloud Architecture",
    "UI UX Motion",
  ],
  authors: [{ name: "NEXUS Atelier" }],
  openGraph: {
    title: "NEXUS | Bright Cinematic Digital Atelier",
    description: "Bespoke web applications, AI agents, and high-performance digital products.",
    type: "website",
    url: "https://nexuslabs.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS | Bright Cinematic Digital Atelier",
    description: "Bespoke web applications, AI agents, and high-performance digital products.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
        <PageLoader />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

