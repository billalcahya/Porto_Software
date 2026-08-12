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
    <div className={cn("border border-zinc-800/80 rounded-2xl bg-zinc-950/60 overflow-hidden mb-3 transition-all duration-300", className)}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left text-base font-medium text-white hover:text-blue-400 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-zinc-400 transition-transform duration-300",
            isOpen && "transform rotate-180 text-blue-400"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm text-zinc-400 border-t border-zinc-800/40 pt-4 leading-relaxed animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
