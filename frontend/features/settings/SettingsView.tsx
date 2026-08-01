"use client";
import React from "react";
import { Settings, Cpu, Shield, Key, Database, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-cyber-border/80 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyber-cyan" /> System & AI Provider Settings
        </h1>
        <p className="text-xs text-cyber-muted">Configure AI provider API keys, OCR default engines, and database connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* AI Provider Config */}
        <div className="glass-card rounded-2xl border border-cyber-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyber-purple" /> AI Model Abstraction Keys
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-cyber-muted mb-1 font-mono">OpenAI API Key (GPT-4o)</label>
              <input type="password" value="sk-proj-••••••••••••••••••••" readOnly className="w-full bg-cyber-surface border border-cyber-border rounded p-2 text-white font-mono" />
            </div>

            <div>
              <label className="block text-cyber-muted mb-1 font-mono">Anthropic API Key (Claude 3.5)</label>
              <input type="password" value="sk-ant-••••••••••••••••••••" readOnly className="w-full bg-cyber-surface border border-cyber-border rounded p-2 text-white font-mono" />
            </div>

            <div>
              <label className="block text-cyber-muted mb-1 font-mono">Google Gemini API Key</label>
              <input type="password" value="AIzaSy••••••••••••••••••••" readOnly className="w-full bg-cyber-surface border border-cyber-border rounded p-2 text-white font-mono" />
            </div>
          </div>
        </div>

        {/* OCR Engine Config */}
        <div className="glass-card rounded-2xl border border-cyber-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-cyber-cyan" /> OCR Service Architecture
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-cyber-muted mb-1">Primary OCR Engine</label>
              <select className="w-full bg-cyber-surface border border-cyber-border rounded p-2 text-white">
                <option>Google Vision OCR</option>
                <option>Azure Computer Vision Read API</option>
                <option>Tesseract OCR (Local Sovereign)</option>
              </select>
            </div>

            <div className="p-3 rounded-lg bg-cyber-card border border-cyber-border text-cyber-muted">
              Status: <span className="text-emerald-400 font-mono font-bold">ALL OCR ADAPTERS READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
