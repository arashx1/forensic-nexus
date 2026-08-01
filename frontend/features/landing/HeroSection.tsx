"use client";
import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, Sparkles, Terminal, Activity, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Background Cyber Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyber-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-8">
        {/* Top Intelligence Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan shadow-cyan-glow animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FORENSIC NEXUS v2.4 ENTERPRISE RELEASE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Next-Gen AI Cyber Forensic <br />
          <span className="bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            Intelligence Platform
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-cyber-muted max-w-3xl mx-auto leading-relaxed">
          Empowering federal law enforcement, intelligence agencies, and corporate Incident Response teams with autonomous multi-modal evidence parsing, graph link analysis, and cryptographically verified chain of custody.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <Button size="lg" variant="primary" className="shadow-cyan-glow">
              Launch Intelligence Terminal <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              <Terminal className="w-5 h-5 text-cyber-cyan" /> Agent Login
            </Button>
          </Link>
        </div>

        {/* Enterprise Metrics Bar */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
          <div className="glass-card p-5 rounded-2xl border border-cyber-border/80">
            <div className="text-2xl font-bold text-cyber-cyan font-mono">99.98%</div>
            <div className="text-xs text-cyber-muted mt-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Custody Verification
            </div>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-cyber-border/80">
            <div className="text-2xl font-bold text-cyber-blue font-mono">&lt; 120ms</div>
            <div className="text-xs text-cyber-muted mt-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyber-cyan" /> Multimodal Parsing Speed
            </div>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-cyber-border/80">
            <div className="text-2xl font-bold text-cyber-purple font-mono">10M+</div>
            <div className="text-xs text-cyber-muted mt-1">Graph Entity Relationships</div>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-cyber-border/80">
            <div className="text-2xl font-bold text-emerald-400 font-mono">Zero-Trust</div>
            <div className="text-xs text-cyber-muted mt-1">Sovereign Air-Gapped Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
