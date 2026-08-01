import React from "react";
import { History, ShieldCheck, UploadCloud, FileSearch, UserCheck } from "lucide-react";
import { AuditLog } from "@/types/audit";
import { formatDate } from "@/lib/utils";

interface ActivityFeedProps {
  logs: AuditLog[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ logs }) => {
  const getIcon = (action: string) => {
    if (action.includes("EVIDENCE")) return UploadCloud;
    if (action.includes("OCR")) return FileSearch;
    if (action.includes("LOGIN") || action.includes("USER")) return UserCheck;
    return ShieldCheck;
  };

  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-cyber-blue" /> Real-Time Audit Feed
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          LIVE STREAM
        </span>
      </div>

      <div className="space-y-3">
        {logs.slice(0, 4).map((log) => {
          const Icon = getIcon(log.action);
          return (
            <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cyber-surface/40 transition-colors">
              <div className="p-2 rounded-lg bg-cyber-surface border border-cyber-border/80 text-cyber-cyan shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">{log.action}</div>
                <div className="text-[11px] text-cyber-muted truncate">
                  {log.details?.file || log.details?.email || log.details?.reason || log.entity_type}
                </div>
                <div className="text-[10px] text-cyber-muted/70 font-mono mt-0.5">
                  {formatDate(log.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
