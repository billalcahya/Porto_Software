"use client";

import React from "react";

// Native scrolling restored for 100% instant, lightweight scrolling performance without Lenis lag
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
