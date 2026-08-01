"use client";
import React from "react";
import { Clock, AlertTriangle, ShieldCheck, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TimelineView: React.FC = () => {
  const events = [
    { time: "2026-08-01 09:42:10 UTC", title: "Memory Dump Evidence Uploaded", desc: "MemoryDump_C2_Server.raw registered into Vault with verified SHA-256 hash.", type: "EVIDENCE" },
    { time: "2026-08-01 09:15:00 UTC", title: "Automated OCR Extraction", desc: "4 Named Entities extracted via OpenAI Vision provider engine.", type: "OCR" },
    { time: "2026-08-01 08:30:00 UTC", title: "Risk Severity Index Update", desc: "Operation DarkHydra threat score escalated to 94 (CRITICAL).", type: "RISK" },
    { time: "2026-07-31 18:40:00 UTC", title: "Geo Relay Node Mapped", desc: "Satellite relay detected at London UK command point.", type: "GEO" }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-cyber-border/80 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-cyber-cyan" /> Timeline Intelligence Sequence
        </h1>
        <p className="text-xs text-cyber-muted">Chronological event reconstruction across evidence files and suspect telemetry</p>
      </div>

      <div className="glass-panel rounded-2xl border border-cyber-border p-6 space-y-6">
        {events.map((evt, i) => (
          <div key={i} className="flex items-start gap-4 relative">
            <div className="w-3 h-3 rounded-full bg-cyber-cyan shadow-cyan-glow mt-1 shrink-0" />
            <div className="glass-card p-4 rounded-xl border border-cyber-border flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyber-cyan">{evt.title}</span>
                <span className="text-[10px] font-mono text-cyber-muted">{evt.time}</span>
              </div>
              <p className="text-xs text-cyber-muted">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
