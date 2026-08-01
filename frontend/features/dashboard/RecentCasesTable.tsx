import React from "react";
import Link from "next/link";
import { Case } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FolderOpen } from "lucide-react";

interface RecentCasesProps {
  cases: Case[];
}

export const RecentCasesTable: React.FC<RecentCasesProps> = ({ cases }) => {
  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-cyber-cyan" /> Active Priority Cases
        </h3>
        <Link href="/cases">
          <Button variant="ghost" size="sm" className="text-xs">
            View All Cases <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-cyber-muted uppercase font-mono border-b border-cyber-border bg-cyber-surface/60">
            <tr>
              <th className="py-2.5 px-3">Case ID</th>
              <th className="py-2.5 px-3">Title</th>
              <th className="py-2.5 px-3">Priority</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Risk Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border/60">
            {cases.slice(0, 4).map((c) => (
              <tr key={c.id} className="hover:bg-cyber-surface/40 transition-colors">
                <td className="py-3 px-3 font-mono font-medium text-cyber-cyan">{c.case_number}</td>
                <td className="py-3 px-3 font-medium text-white max-w-[200px] truncate">{c.title}</td>
                <td className="py-3 px-3">
                  <Badge variant={c.priority === "CRITICAL" ? "critical" : c.priority === "HIGH" ? "high" : "medium"}>
                    {c.priority}
                  </Badge>
                </td>
                <td className="py-3 px-3">
                  <Badge variant={c.status === "OPEN" ? "open" : c.status === "IN_PROGRESS" ? "progress" : "closed"}>
                    {c.status}
                  </Badge>
                </td>
                <td className="py-3 px-3 font-mono font-bold text-white">
                  <span className={c.risk_score > 80 ? "text-cyber-rose" : "text-amber-400"}>
                    {c.risk_score}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
