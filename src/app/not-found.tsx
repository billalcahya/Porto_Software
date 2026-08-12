import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 text-center">
      <div className="max-w-md glass-card p-8 rounded-3xl border-zinc-800 bg-zinc-950/80 space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
          <FileQuestion className="w-6 h-6" />
        </div>
        <div>
          <span className="text-4xl font-extrabold font-mono text-blue-400">404</span>
          <h2 className="text-xl font-bold text-white mt-1">Page Not Found</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            The requested route or case study resource does not exist or has been relocated.
          </p>
        </div>
        <Link href="/" className="inline-block">
          <Button variant="glow" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
