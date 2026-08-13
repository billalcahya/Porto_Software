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
    <div className={cn("border border-sky-200/80 rounded-2xl bg-white shadow-xs overflow-hidden mb-3.5 transition-all duration-300 hover:border-lime-400", className)}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-base sm:text-lg font-bold text-slate-950 hover:text-sky-700 transition-colors gap-4"
      >
        <span className="leading-snug">{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-slate-700 shrink-0 transition-transform duration-300",
            isOpen && "transform rotate-180 text-lime-600 font-bold"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-700 border-t border-sky-100 pt-4 leading-relaxed animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
