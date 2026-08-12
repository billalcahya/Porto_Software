import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS | Premium Software Engineering & AI Studio",
  description:
    "We build high-performance web applications, mobile platforms, enterprise cloud systems, and AI LLM solutions with cinematic liquid UI design.",
  keywords: [
    "Software House",
    "Next.js Development",
    "React Studio",
    "Enterprise AI",
    "Cloud Architecture",
    "UI UX Motion",
  ],
  authors: [{ name: "NEXUS Engineering" }],
  openGraph: {
    title: "NEXUS | Premium Software Engineering & AI Studio",
    description: "Bespoke web applications, AI agents, and high-performance digital products.",
    type: "website",
    url: "https://nexuslabs.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS | Premium Software Engineering Studio",
    description: "Bespoke web applications, AI agents, and high-performance digital products.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
