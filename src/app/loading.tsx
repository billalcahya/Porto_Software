import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/logo.PNG"
          alt="DIGITAL THREE Logo"
          width={56}
          height={56}
          className="object-contain animate-pulse drop-shadow-xl"
        />
        <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase">LOADING DIGITAL THREE PLATFORM...</p>
      </div>
    </div>
  );
}
