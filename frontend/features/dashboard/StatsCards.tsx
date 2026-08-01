import React from "react";
import { Briefcase, FileText, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsProps {
  stats: {
    total_cases: number;
    active_cases: number;
    total_evidence: number;
    high_risk_suspects: number;
    chain_of_custody_integrity: number;
  };
}

export const StatsCards: React.FC<StatsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Active Investigations",
      value: `${stats.active_cases} / ${stats.total_cases}`,
      subtext: "Cases under active forensic review",
      icon: Briefcase,
      color: "text-cyber-cyan",
      border: "hover:border-cyber-cyan/40"
    },
    {
      title: "Evidence Vault Inventory",
      value: stats.total_evidence,
      subtext: "Files & SHA-256 hashes indexed",
      icon: FileText,
      color: "text-cyber-blue",
      border: "hover:border-cyber-blue/40"
    },
    {
      title: "High-Risk Target Suspects",
      value: stats.high_risk_suspects,
      subtext: "Flagged for immediate intervention",
      icon: ShieldAlert,
      color: "text-cyber-rose",
      border: "hover:border-cyber-rose/40"
    },
    {
      title: "Custody Integrity Score",
      value: `${stats.chain_of_custody_integrity}%`,
      subtext: "Zero hash tampered, fully compliant",
      icon: CheckCircle2,
      color: "text-emerald-400",
      border: "hover:border-emerald-500/40"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <Card key={i} className={card.border}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-cyber-muted">{card.title}</span>
              <Icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold text-white font-mono mt-2">{card.value}</div>
            <div className="text-[11px] text-cyber-muted mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>{card.subtext}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
