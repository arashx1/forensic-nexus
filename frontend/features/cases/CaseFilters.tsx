import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CaseFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  priorityFilter: string;
  onPriorityChange: (val: string) => void;
}

export const CaseFilters: React.FC<CaseFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange
}) => {
  return (
    <div className="glass-card p-4 rounded-xl border border-cyber-border flex flex-col md:flex-row items-center gap-4">
      <div className="flex-1 w-full">
        <Input
          placeholder="Search by case ID, title, or briefing text..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search className="w-4 h-4 text-cyber-muted" />}
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-cyber-muted shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-cyber-surface border border-cyber-border rounded-lg px-3 py-2 text-xs text-cyber-text focus:border-cyber-cyan outline-none"
        >
          <option value="">All Statuses</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="PENDING_REVIEW">PENDING_REVIEW</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="bg-cyber-surface border border-cyber-border rounded-lg px-3 py-2 text-xs text-cyber-text focus:border-cyber-cyan outline-none"
        >
          <option value="">All Priorities</option>
          <option value="CRITICAL">CRITICAL</option>
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>
      </div>
    </div>
  );
};
