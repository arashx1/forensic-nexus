"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Share2, 
  Globe, 
  Bot, 
  Clock, 
  FileSearch, 
  Settings, 
  History,
  Lock,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Case Management", href: "/cases", icon: Briefcase },
  { name: "Evidence Vault", href: "/evidence", icon: FileText },
  { name: "Network Graph", href: "/graph", icon: Share2, badge: "AI" },
  { name: "Geo Intelligence", href: "/maps", icon: Globe },
  { name: "AI Assistant", href: "/assistant", icon: Bot, badge: "Live" },
  { name: "Timeline", href: "/timeline", icon: Clock },
  { name: "Reports", href: "/reports", icon: FileSearch },
  { name: "Audit Logs", href: "/audit-logs", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-cyber-surface/95 border-r border-cyber-border/80 flex flex-col justify-between h-screen sticky top-0 z-40 select-none backdrop-blur-xl">
      <div>
        {/* Brand Logo */}
        <div className="p-5 border-b border-cyber-border/80 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple flex items-center justify-center shadow-cyan-glow group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-cyber-bg font-bold" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-tight">
                FORENSIC<span className="text-cyber-cyan">NEXUS</span>
              </span>
              <span className="text-[10px] text-cyber-muted font-mono tracking-widest uppercase">
                Enterprise AI Intel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/10 text-cyber-cyan border border-cyber-cyan/30 shadow-cyan-glow font-semibold"
                    : "text-cyber-muted hover:text-cyber-text hover:bg-cyber-card"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-cyber-cyan" : "group-hover:text-cyber-cyan")} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Security Status Box */}
      <div className="p-4 border-t border-cyber-border/80 bg-cyber-card/40">
        <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">ENCLAVE SECURED</div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Chain of Custody Active
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
