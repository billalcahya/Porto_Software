"use client";

import React from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  return <div className={`inline-block hover:scale-105 transition-transform duration-300 ${className}`}>{children}</div>;
}
