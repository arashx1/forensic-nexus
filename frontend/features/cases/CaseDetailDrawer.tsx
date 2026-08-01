"use client";
import React from "react";
import { Case } from "@/types/case";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Briefcase, ShieldAlert, FileText, User, Trash2 } from "lucide-react";
import { apiService } from "@/services/api";

interface CaseDetailDrawerProps {
  caseData: Case | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export const CaseDetailDrawer: React.FC<CaseDetailDrawerProps> = ({
  caseData,
  isOpen,
  onClose,
  onDeleted
}) => {
  if (!caseData) return null;

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete case ${caseData.case_number}?`)) {
      await apiService.deleteCase(caseData.id);
      onDeleted();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Case Details • ${caseData.case_number}`}>
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-cyber-cyan">{caseData.classification}</span>
              <h3 className="text-lg font-bold text-white">{caseData.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={caseData.priority === "CRITICAL" ? "critical" : "high"}>
                {caseData.priority}
              </Badge>
              <Badge variant={caseData.status === "OPEN" ? "open" : "progress"}>
                {caseData.status}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-cyber-muted flex flex-wrap gap-4 pt-2 border-t border-cyber-border/60">
            <div>Created: <span className="text-white font-mono">{formatDate(caseData.created_at)}</span></div>
            <div>Lead Officer: <span className="text-cyber-cyan">Special Agent Vance</span></div>
            <div>Risk Score: <span className="text-rose-400 font-bold font-mono">{caseData.risk_score}%</span></div>
          </div>
        </div>

        {/* Case Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-cyber-muted">Case Briefing & Intelligence Summary</h4>
          <div className="p-4 rounded-xl bg-cyber-surface border border-cyber-border text-xs text-cyber-text leading-relaxed">
            {caseData.description}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" /> Delete Case Record
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Inspection
          </Button>
        </div>
      </div>
    </Modal>
  );
};
