import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-bg font-semibold hover:shadow-cyan-glow hover:brightness-110",
    secondary: "bg-cyber-card border border-cyber-border text-cyber-text hover:bg-cyber-highlight hover:border-cyber-cyan/40",
    danger: "bg-gradient-to-r from-cyber-rose to-rose-700 text-white hover:brightness-110 shadow-lg",
    ghost: "text-cyber-muted hover:text-cyber-text hover:bg-cyber-surface",
    outline: "border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-cyan-glow"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};
