import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-medium text-cyber-muted">{label}</label>}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-3 text-cyber-muted pointer-events-none">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              "w-full bg-cyber-surface/90 border border-cyber-border text-cyber-text text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all placeholder:text-cyber-muted/60 focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/40",
              icon && "pl-10",
              error && "border-cyber-rose focus:border-cyber-rose focus:ring-cyber-rose/30",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-cyber-rose">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
