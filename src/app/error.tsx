"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 text-center">
      <div className="max-w-md glass-card p-8 rounded-3xl border-zinc-800 bg-zinc-950/80 space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            An unexpected application state occurred. Please try refreshing or return to homepage.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="glow" onClick={() => reset()} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
