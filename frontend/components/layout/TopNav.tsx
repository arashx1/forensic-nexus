"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Shield, User, LogOut, Cpu, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopNav: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 border-b border-cyber-border/80 bg-cyber-surface/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Global Command & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-cyber-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Global Intelligence Search (Cases, SHA-256, Suspects, IP Addresses...)"
            className="w-full bg-cyber-card/90 border border-cyber-border/80 rounded-xl pl-10 pr-12 py-2 text-xs text-cyber-text placeholder:text-cyber-muted/60 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/40 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-cyber-muted bg-cyber-surface border border-cyber-border px-1.5 py-0.5 rounded">
            <Command className="w-3 h-3" /> K
          </div>
        </div>
      </div>

      {/* Action Controls & User Profile */}
      <div className="flex items-center gap-4">
        {/* Active Model Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border/80 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="text-cyber-muted">Model:</span>
          <span className="text-cyber-cyan font-medium">GPT-4o / Claude 3.5</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-cyber-card border border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-cyan/40 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyber-cyan/40 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyber-cyan to-cyber-blue flex items-center justify-center text-cyber-bg font-bold text-xs">
              SV
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-medium text-cyber-text">Special Agent Vance</div>
              <div className="text-[10px] text-cyber-muted font-mono">FX-9942 • FBI</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-cyber-border p-2 shadow-2xl z-50">
              <div className="px-3 py-2 border-b border-cyber-border/60 mb-1">
                <div className="text-xs font-semibold text-white">Special Agent Vance</div>
                <div className="text-[10px] text-cyber-cyan font-mono">Lead Cyber Forensic Analyst</div>
              </div>
              <Link
                href="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-cyber-muted hover:text-cyber-text hover:bg-cyber-card rounded-lg transition-colors"
              >
                <User className="w-3.5 h-3.5" /> Profile & Security Settings
              </Link>
              <Link
                href="/login"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-cyber-rose hover:bg-cyber-rose/10 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
