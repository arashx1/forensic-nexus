import React from "react";
import { Shield, BarChart3 } from "lucide-react";

export const RiskOverview: React.FC = () => {
  return (
    <div className="glass-card rounded-xl p-5 border border-cyber-border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyber-purple" /> Risk Severity Distribution
        </h3>
        <span className="text-xs font-mono text-cyber-muted">EVALUATED REAL-TIME</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-cyber-rose font-medium">Critical Threat (Score 90-100)</span>
            <span className="font-mono text-white">4 Cases</span>
          </div>
          <div className="h-2 w-full bg-cyber-surface rounded-full overflow-hidden">
            <div className="h-full bg-cyber-rose rounded-full" style={{ width: "45%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-amber-400 font-medium">High Threat (Score 70-89)</span>
            <span className="font-mono text-white">6 Cases</span>
          </div>
          <div className="h-2 w-full bg-cyber-surface rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: "65%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-blue-400 font-medium">Medium / Low Threat (&lt; 70)</span>
            <span className="font-mono text-white">4 Cases</span>
          </div>
          <div className="h-2 w-full bg-cyber-surface rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: "30%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
