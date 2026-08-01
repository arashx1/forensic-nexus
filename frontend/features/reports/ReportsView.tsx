"use client";
import React, { useState } from "react";
import { FileSearch, Download, CheckCircle2, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReportsView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportReady(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-cyber-border/80 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <FileSearch className="w-6 h-6 text-cyber-blue" /> Court-Ready Report Generator
        </h1>
        <p className="text-xs text-cyber-muted">Generate certified evidentiary summaries and audit reports compliant with federal standards</p>
      </div>

      <div className="glass-panel rounded-2xl border border-cyber-border p-6 space-y-6 max-w-2xl">
        <h3 className="text-base font-semibold text-white">Generate Executive Case Report</h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs text-cyber-muted font-medium">Select Investigation Case</label>
            <select className="w-full bg-cyber-surface border border-cyber-border rounded-lg p-2.5 text-xs text-white">
              <option>CASE-2026-8801 • Operation DarkHydra Cyber Heist</option>
              <option>CASE-2026-4092 • Vanguard Aerospace Exfiltration</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs text-cyber-muted font-medium">Report Format Standard</label>
            <select className="w-full bg-cyber-surface border border-cyber-border rounded-lg p-2.5 text-xs text-white">
              <option>Federal Evidentiary Format (PDF + SHA-256 Signature)</option>
              <option>Executive Intelligence Briefing (DOCX)</option>
              <option>Raw Audit Log Export (JSON / CSV)</option>
            </select>
          </div>
        </div>

        <Button variant="primary" className="w-full" onClick={handleGenerate} isLoading={isGenerating}>
          Compile & Generate Report <Download className="w-4 h-4" />
        </Button>

        {reportReady && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 space-y-2">
            <div className="font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> REPORT COMPILED SUCCESSFULLY
            </div>
            <div>File: <span className="font-mono text-white">Forensic_Nexus_Report_CASE-8801.pdf</span></div>
            <div>SHA-256 Signature: <span className="font-mono text-white">e3b0c44298fc1c149afbf4c8996fb92427ae41e...</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
