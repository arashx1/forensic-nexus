import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "critical" | "high" | "medium" | "low" | "open" | "progress" | "closed" | "cyan" | "purple";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "cyan", className }) => {
  const styles = {
    critical: "bg-red-500/15 border-red-500/30 text-red-400",
    high: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    medium: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    low: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    open: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    progress: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
    closed: "bg-slate-500/15 border-slate-500/30 text-slate-400",
    cyan: "bg-cyber-cyan/15 border-cyber-cyan/30 text-cyber-cyan",
    purple: "bg-purple-500/15 border-purple-500/30 text-purple-400",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide uppercase font-mono", styles[variant], className)}>
      {children}
    </span>
  );
};
