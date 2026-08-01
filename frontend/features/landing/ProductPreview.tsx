"use client";
import React, { useState } from "react";
import { LayoutDashboard, Share2, FileText, Globe, Bot, ShieldAlert, Cpu } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="py-20 relative bg-cyber-bg border-t border-cyber-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-cyber-cyan">
            LIVE SYSTEM PREVIEW
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Experience the Forensic Nexus Interface
          </h2>
          <p className="text-sm text-cyber-muted max-w-2xl mx-auto">
            Explore interactive modules engineered for maximum clarity under high-pressure tactical scenarios.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <Tabs
            tabs={[
              { id: "dashboard", label: "Executive Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: "cases", label: "Case Manager", icon: <FileText className="w-4 h-4" /> },
              { id: "graph", label: "Link Graph", icon: <Share2 className="w-4 h-4" /> },
              { id: "maps", label: "Geo Intelligence", icon: <Globe className="w-4 h-4" /> },
              { id: "assistant", label: "AI Copilot", icon: <Bot className="w-4 h-4" /> }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Mock Interface Display */}
        <div className="glass-panel rounded-2xl border border-cyber-cyan/40 p-4 sm:p-6 shadow-cyan-glow overflow-hidden relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyber-border/80 text-xs font-mono text-cyber-muted">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyber-rose/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-cyber-cyan font-bold">forensic-nexus.gov/enclave/{activeTab}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" /> Status: Enclave Online
            </div>
          </div>

          <div className="bg-cyber-bg/90 rounded-xl p-6 min-h-[350px] flex items-center justify-center text-center">
            {activeTab === "dashboard" && (
              <div className="w-full space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-cyber-cyan/30">
                    <div className="text-xs text-cyber-muted">Active Cases</div>
                    <div className="text-2xl font-bold text-white font-mono mt-1">14 Cases</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-cyber-blue/30">
                    <div className="text-xs text-cyber-muted">Evidence Files Processed</div>
                    <div className="text-2xl font-bold text-cyber-cyan font-mono mt-1">1,482 Files</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-cyber-purple/30">
                    <div className="text-xs text-cyber-muted">Threat Severity Index</div>
                    <div className="text-2xl font-bold text-rose-400 font-mono mt-1">CRITICAL 94%</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border/80 text-xs font-mono text-cyber-muted space-y-2">
                  <div className="text-cyber-cyan font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> RECENT SYSTEM LOGS
                  </div>
                  <div>[09:42:10 UTC] Evidence uploaded: MemoryDump_C2_Server.raw (SHA-256 Verified)</div>
                  <div>[09:15:00 UTC] OCR Service: 4 Entities extracted via OpenAI Vision provider</div>
                  <div>[08:30:00 UTC] Risk Engine: Operation DarkHydra risk score updated to 94</div>
                </div>
              </div>
            )}

            {activeTab === "cases" && (
              <div className="w-full space-y-3 text-left">
                <div className="p-4 rounded-xl glass-card border border-cyber-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">CASE-2026-8801 • Operation DarkHydra</div>
                    <div className="text-xs text-cyber-muted">Cybercrime • Critical Priority • 14 Evidence Files</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-rose-500/20 text-rose-400 border border-rose-500/40">
                    CRITICAL 94%
                  </span>
                </div>
                <div className="p-4 rounded-xl glass-card border border-cyber-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">CASE-2026-4092 • Vanguard Aerospace Exfiltration</div>
                    <div className="text-xs text-cyber-muted">Counter Terrorism • High Priority • 8 Evidence Files</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    HIGH 82%
                  </span>
                </div>
              </div>
            )}

            {activeTab === "graph" && (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <Share2 className="w-12 h-12 text-cyber-cyan animate-pulse" />
                <div className="text-sm text-cyber-text font-mono">Criminal Link Graph Renderer Ready</div>
                <div className="text-xs text-cyber-muted max-w-md">
                  Mapping 6 Node Cluster (Viktor Reznov -&gt; Hydra Holdings -&gt; SWIFT #8849-B)
                </div>
              </div>
            )}

            {activeTab === "maps" && (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <Globe className="w-12 h-12 text-cyber-blue animate-spin" />
                <div className="text-sm text-cyber-text font-mono">Mapbox Geo Spatial Engine Initialized</div>
                <div className="text-xs text-cyber-muted">4 Active Command Points mapped across Washington, London, and Belize.</div>
              </div>
            )}

            {activeTab === "assistant" && (
              <div className="w-full space-y-3 text-left">
                <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border text-xs text-cyber-muted">
                  <span className="text-cyber-cyan font-bold">User:</span> Summarize threat vector for Case #8801.
                </div>
                <div className="p-3 rounded-xl bg-cyber-surface border border-cyber-cyan/30 text-xs text-cyber-text font-mono space-y-1">
                  <span className="text-cyber-purple font-bold">Copilot (Claude 3.5):</span> Identified memory payload injecting into svchost.exe. C2 node located at 185.220.101.4.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
