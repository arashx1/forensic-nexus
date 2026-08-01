"use client";
import React, { useState } from "react";
import { Share2, ZoomIn, ZoomOut, RefreshCw, Filter, Layers, Zap } from "lucide-react";
import { MOCK_GRAPH_NODES, MOCK_GRAPH_EDGES } from "@/lib/mockData";
import { GraphNode } from "@/types/graph";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const GraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(MOCK_GRAPH_NODES[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyber-cyan" /> Criminal Network Graph & Link Analysis
          </h1>
          <p className="text-xs text-cyber-muted">Multi-entity relationship engine powered by React Flow & D3.js topology</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <ZoomIn className="w-4 h-4" /> Zoom In
          </Button>
          <Button variant="secondary" size="sm">
            <ZoomOut className="w-4 h-4" /> Zoom Out
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" /> Reset Layout
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-cyber-border/80 p-6 min-h-[500px] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-cyber-muted z-10">
            <div className="flex items-center gap-2 bg-cyber-card/80 px-3 py-1.5 rounded-lg border border-cyber-border">
              <Layers className="w-3.5 h-3.5 text-cyber-cyan" /> Active Cluster: <span className="text-white font-bold">Operation DarkHydra</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
              <span>D3 Interactive Renderer Active</span>
            </div>
          </div>

          {/* Graphical Link Simulation */}
          <div className="my-auto py-12 relative flex flex-wrap items-center justify-center gap-8">
            {MOCK_GRAPH_NODES.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl glass-card border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? "border-cyber-cyan shadow-cyan-glow bg-cyber-surface/90"
                      : "border-cyber-border hover:border-cyber-cyan/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30">
                      {node.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-400">{node.riskScore}%</span>
                  </div>
                  <div className="text-sm font-bold text-white">{node.label}</div>
                  <div className="text-[11px] text-cyber-muted mt-1">{node.details}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-cyber-muted z-10 pt-4 border-t border-cyber-border/60">
            <div>Nodes: 6 • Edges: 5 Relationships</div>
            <div className="flex gap-2">
              <Badge variant="critical">Suspect</Badge>
              <Badge variant="cyan">Bank Account</Badge>
              <Badge variant="purple">IP Address</Badge>
            </div>
          </div>
        </div>

        {/* Selected Entity Sidebar */}
        <div className="glass-card rounded-2xl border border-cyber-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyber-cyan" /> Entity Intelligence
          </h3>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-cyber-card border border-cyber-border space-y-1">
                <div className="text-xs text-cyber-muted font-mono">{selectedNode.type}</div>
                <div className="text-base font-bold text-white">{selectedNode.label}</div>
                <div className="text-xs text-cyber-cyan font-mono">Risk Index: {selectedNode.riskScore}%</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-cyber-muted">Top Connections</div>
                <div className="space-y-1.5 text-xs font-mono text-cyber-text">
                  <div className="p-2 rounded bg-cyber-surface border border-cyber-border/60">
                    -&gt; Hydra Holdings (Belize) [<span className="text-cyber-cyan">CONTROLS</span>]
                  </div>
                  <div className="p-2 rounded bg-cyber-surface border border-cyber-border/60">
                    -&gt; 185.220.101.4 [<span className="text-cyber-cyan">OPERATES</span>]
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full" size="sm">
                Run Deep AI Entity Search
              </Button>
            </div>
          ) : (
            <div className="text-xs text-cyber-muted text-center py-8">Select a node to inspect entity attributes</div>
          )}
        </div>
      </div>
    </div>
  );
};
