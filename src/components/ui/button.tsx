"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]";

    const variants = {
      primary: "bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-lg shadow-white/5",
      secondary: "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:border-zinc-800",
      outline: "border border-zinc-700/60 bg-transparent text-white hover:bg-zinc-900/60 hover:border-zinc-500 dark:border-zinc-700/60 dark:text-zinc-100 dark:hover:bg-zinc-900/60",
      ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-800/50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50",
      danger: "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/20",
      glow: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 border border-blue-400/30",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base font-semibold",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
