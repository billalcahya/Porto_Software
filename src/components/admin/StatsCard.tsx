import React from "react";
import { LucideIcon, Briefcase, BookOpen, Code2, MessageSquare, Users, DollarSign, Activity } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  iconName?: "briefcase" | "book-open" | "code" | "message-square" | "users" | "dollar" | "activity";
  icon?: LucideIcon;
  color?: string;
}

const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "book-open": BookOpen,
  code: Code2,
  "message-square": MessageSquare,
  users: Users,
  dollar: DollarSign,
  activity: Activity,
};

export function StatsCard({ title, value, description, iconName, icon: ProvidedIcon, color = "blue" }: StatsCardProps) {
  const Icon = ProvidedIcon || (iconName ? iconMap[iconName] : undefined) || Briefcase;

  const colors: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  };

  return (
    <div className="glass-card rounded-2xl p-6 bg-zinc-950/80 border-zinc-800/80 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-zinc-400 uppercase font-mono">{title}</p>
        <h3 className="text-3xl font-extrabold text-white mt-1 font-mono">{value}</h3>
        {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
      </div>
      <div className={`p-3.5 rounded-2xl border ${colors[color] || colors.blue}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
