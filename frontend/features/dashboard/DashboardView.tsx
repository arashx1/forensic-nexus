"use client";
import React, { useState, useEffect } from "react";
import { StatsCards } from "./StatsCards";
import { RecentCasesTable } from "./RecentCasesTable";
import { AIInsightsCard } from "./AIInsightsCard";
import { RiskOverview } from "./RiskOverview";
import { ActivityFeed } from "./ActivityFeed";
import { QuickActions } from "./QuickActions";
import { apiService } from "@/services/api";
import { Case } from "@/types/case";
import { AuditLog } from "@/types/audit";
import { CaseModal } from "@/features/cases/CaseModal";
import { EvidenceUploader } from "@/features/evidence/EvidenceUploader";

export const DashboardView: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState({
    total_cases: 4,
    active_cases: 3,
    total_evidence: 24,
    high_risk_suspects: 8,
    chain_of_custody_integrity: 99.8
  });
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const fetchedCases = await apiService.getCases();
    const fetchedLogs = await apiService.getAuditLogs();
    const fetchedStats = await apiService.getDashboardStats();
    setCases(fetchedCases);
    setLogs(fetchedLogs);
    setStats(fetchedStats);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Forensic Intelligence Dashboard
          </h1>
          <p className="text-xs text-cyber-muted">Real-time threat telemetry, active cases, and AI lead generation</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">ENCLAVE SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <QuickActions
        onNewCase={() => setIsCaseModalOpen(true)}
        onUploadEvidence={() => setIsUploadModalOpen(true)}
      />

      {/* Stats Cards Row */}
      <StatsCards stats={stats} />

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentCasesTable cases={cases} />
          <AIInsightsCard />
        </div>
        <div className="space-y-6">
          <RiskOverview />
          <ActivityFeed logs={logs} />
        </div>
      </div>

      {/* Create Case Modal */}
      <CaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        onCreated={() => {
          setIsCaseModalOpen(false);
          loadDashboardData();
        }}
      />

      {/* Evidence Uploader Modal */}
      {isUploadModalOpen && (
        <EvidenceUploader
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          cases={cases}
          onUploaded={() => {
            setIsUploadModalOpen(false);
            loadDashboardData();
          }}
        />
      )}
    </div>
  );
};
