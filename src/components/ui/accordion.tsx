"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({ title, children, isOpen, onToggle, className }: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border rounded-2xl bg-white shadow-xs overflow-hidden mb-3.5 transition-all duration-300 transform-gpu",
        isOpen
          ? "border-sky-300/90 shadow-md ring-2 ring-sky-300/30"
          : "border-sky-200/80 hover:border-lime-400/80",
        className
      )}
    >
      <button
        onClick={onToggle}
        type="button"
        className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-base sm:text-lg font-bold text-slate-950 hover:text-sky-700 transition-colors gap-4 cursor-pointer select-none"
      >
        <span className="leading-snug font-sans">{title}</span>
        <div
          className={cn(
            "p-1.5 rounded-full bg-sky-50 transition-all duration-300 shrink-0",
            isOpen ? "bg-lime-100 text-lime-700 rotate-180" : "text-slate-600 hover:bg-sky-100"
          )}
        >
          <ChevronDown className="h-5 w-5 transition-transform duration-300" />
        </div>
      </button>

      {/* Smooth GPU Hardware-Accelerated CSS Grid Height Expansion Container */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-700 border-t border-sky-100/80 pt-4 leading-relaxed font-sans">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
