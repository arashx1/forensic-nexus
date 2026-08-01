import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barColor?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  barColor = "bg-gradient-to-r from-cyber-cyan to-cyber-blue"
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full bg-cyber-surface border border-cyber-border/60 rounded-full h-2 overflow-hidden", className)}>
      <div
        className={cn("h-full transition-all duration-500 rounded-full", barColor)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
