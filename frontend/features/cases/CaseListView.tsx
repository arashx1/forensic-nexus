"use client";
import React, { useState, useEffect } from "react";
import { Plus, Briefcase, Eye, Trash2, ArrowUpDown } from "lucide-react";
import { Case } from "@/types/case";
import { apiService } from "@/services/api";
import { CaseFilters } from "./CaseFilters";
import { CaseModal } from "./CaseModal";
import { CaseDetailDrawer } from "./CaseDetailDrawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CaseListView: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    loadCases();
  }, [search, statusFilter, priorityFilter]);

  const loadCases = async () => {
    const data = await apiService.getCases({
      search,
      status: statusFilter,
      priority: priorityFilter
    });
    setCases(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyber-cyan" /> Case Management System
          </h1>
          <p className="text-xs text-cyber-muted">Active law enforcement case directory & status management</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> Open New Case
        </Button>
      </div>

      {/* Filters Bar */}
      <CaseFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      {/* Cases Table */}
      <div className="glass-card rounded-xl border border-cyber-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-cyber-muted uppercase font-mono border-b border-cyber-border bg-cyber-surface/80">
              <tr>
                <th className="py-3 px-4">Case Number</th>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Risk Index</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/60">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-cyber-surface/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-cyber-cyan">{c.case_number}</td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-white truncate">{c.title}</div>
                    <div className="text-[11px] text-cyber-muted truncate">{c.description}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyber-muted">{c.classification}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={c.priority === "CRITICAL" ? "critical" : c.priority === "HIGH" ? "high" : "medium"}>
                      {c.priority}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={c.status === "OPEN" ? "open" : c.status === "IN_PROGRESS" ? "progress" : "closed"}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={c.risk_score > 80 ? "text-cyber-rose" : "text-amber-400"}>
                      {c.risk_score}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCase(c)}>
                      <Eye className="w-4 h-4 text-cyber-cyan" /> Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Case Modal */}
      <CaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => {
          setIsModalOpen(false);
          loadCases();
        }}
      />

      {/* Case Detail Drawer */}
      <CaseDetailDrawer
        caseData={selectedCase}
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        onDeleted={() => {
          setSelectedCase(null);
          loadCases();
        }}
      />
    </div>
  );
};
