import React from "react";
import { Sparkles, Bot, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AIInsightsCard: React.FC = () => {
  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-cyan/40 bg-gradient-to-br from-cyber-card via-cyber-surface to-cyber-card relative overflow-hidden space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyber-cyan font-bold text-sm">
          <Sparkles className="w-4 h-4" /> AI FORENSIC INSIGHTS
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30">
          CLAUDE 3.5 SONNET
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3.5 rounded-lg bg-cyber-bg/80 border border-cyber-border text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" /> High Risk Anomaly Correlation
          </div>
          <p className="text-cyber-muted leading-relaxed">
            Identified matching SHA-256 binary hash across <span className="text-white font-mono">CASE-8801</span> and <span className="text-white font-mono">CASE-4092</span>. Zero-day memory payload confirms joint C2 origin at IP <span className="text-cyber-cyan font-mono">185.220.101.4</span>.
          </p>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between">
        <span className="text-[11px] text-cyber-muted font-mono">Confidence Score: 98.4%</span>
        <Link href="/assistant">
          <Button variant="outline" size="sm" className="text-xs">
            Ask AI Copilot <Bot className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
