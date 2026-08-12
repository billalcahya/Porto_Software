import React from "react";
import { Cpu } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-pulse">
          <Cpu className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-xs font-mono text-zinc-400 tracking-wider">LOADING NEXUS DIGITAL PLATFORM...</p>
      </div>
    </div>
  );
}
