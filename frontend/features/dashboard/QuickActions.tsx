"use client";
import React from "react";
import { Plus, UploadCloud, Cpu, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onNewCase: () => void;
  onUploadEvidence: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNewCase, onUploadEvidence }) => {
  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border space-y-3">
      <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
        Quick Operational Actions
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button variant="primary" size="sm" onClick={onNewCase} className="w-full">
          <Plus className="w-4 h-4" /> Create New Case
        </Button>

        <Button variant="secondary" size="sm" onClick={onUploadEvidence} className="w-full">
          <UploadCloud className="w-4 h-4 text-cyber-cyan" /> Upload Evidence
        </Button>

        <Button variant="secondary" size="sm" onClick={() => window.location.href = '/assistant'} className="w-full">
          <Cpu className="w-4 h-4 text-cyber-purple" /> Run AI Threat Scan
        </Button>

        <Button variant="secondary" size="sm" onClick={() => window.location.href = '/reports'} className="w-full">
          <FileSearch className="w-4 h-4 text-cyber-blue" /> Generate Audit Report
        </Button>
      </div>
    </div>
  );
};
