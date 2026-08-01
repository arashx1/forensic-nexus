"use client";
import React from "react";
import { Globe, MapPin, Layers, Navigation, ShieldAlert } from "lucide-react";
import { MOCK_GEO_POINTS } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const MapsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyber-blue" /> Geo Intelligence & Spatial Mapping
          </h1>
          <p className="text-xs text-cyber-muted">Mapbox spatial engine for crime scene GPS points, server locations, and heatmaps</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Layers className="w-4 h-4" /> Toggle Heatmap
          </Button>
          <Button variant="primary" size="sm">
            <Navigation className="w-4 h-4" /> Recenter Map
          </Button>
        </div>
      </div>

      {/* Map Display & Point Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-cyber-border/80 p-6 min-h-[500px] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-cyber-muted z-10">
            <div className="flex items-center gap-2 bg-cyber-card/80 px-3 py-1.5 rounded-lg border border-cyber-border">
              <MapPin className="w-3.5 h-3.5 text-cyber-cyan" /> Mapbox Vector Layer: <span className="text-white font-bold">Dark Enterprise Mode</span>
            </div>
            <div className="text-emerald-400 font-bold">GPS Coordinates Lock</div>
          </div>

          {/* Interactive Map Visual Mock */}
          <div className="my-auto py-16 text-center space-y-4">
            <Globe className="w-20 h-20 text-cyber-cyan/40 mx-auto animate-pulse" />
            <div className="text-base font-bold text-white font-mono">Mapbox GL Spatial Canvas</div>
            <div className="text-xs text-cyber-muted max-w-md mx-auto">
              Rendering 4 Active Geo Nodes (Washington DC, London, Belize City, New York)
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-cyber-muted z-10 pt-4 border-t border-cyber-border/60">
            <div>Projection: WGS84 • Tiles: Vector GL</div>
            <div className="text-cyber-cyan font-bold">4 Command Hubs Mapped</div>
          </div>
        </div>

        {/* Hotspots List */}
        <div className="glass-card rounded-2xl border border-cyber-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyber-cyan" /> Mapped Geo Locations
          </h3>

          <div className="space-y-3">
            {MOCK_GEO_POINTS.map((pt) => (
              <div key={pt.id} className="p-3 rounded-xl bg-cyber-card border border-cyber-border space-y-1.5 hover:border-cyber-cyan/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{pt.title}</span>
                  <Badge variant={pt.severity === "CRITICAL" ? "critical" : "high"}>
                    {pt.severity}
                  </Badge>
                </div>
                <div className="text-xs text-cyber-muted font-mono">{pt.location_name}</div>
                <div className="text-[10px] text-cyber-cyan font-mono">{pt.lat}, {pt.lng} • {pt.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
