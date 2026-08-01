"use client";
import React from "react";
import Link from "next/link";
import { ShieldAlert, Terminal, ArrowRight } from "lucide-react";
import { HeroSection } from "@/features/landing/HeroSection";
import { FeaturesGrid } from "@/features/landing/FeaturesGrid";
import { ProductPreview } from "@/features/landing/ProductPreview";
import { PricingSection } from "@/features/landing/PricingSection";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text flex flex-col justify-between selection:bg-cyber-cyan selection:text-cyber-bg">
      {/* Top Navbar */}
      <header className="h-20 border-b border-cyber-border/60 bg-cyber-bg/80 backdrop-blur-xl sticky top-0 z-50 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple flex items-center justify-center shadow-cyan-glow group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-6 h-6 text-cyber-bg font-bold" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white block leading-tight">
              FORENSIC<span className="text-cyber-cyan">NEXUS</span>
            </span>
            <span className="text-[10px] text-cyber-muted font-mono tracking-widest uppercase">
              Enterprise AI Intelligence
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-cyber-muted">
          <a href="#features" className="hover:text-cyber-cyan transition-colors">CAPABILITIES</a>
          <a href="#preview" className="hover:text-cyber-cyan transition-colors">SYSTEM PREVIEW</a>
          <a href="#pricing" className="hover:text-cyber-cyan transition-colors">CLEARANCE TIERS</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Agent Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="shadow-cyan-glow">
              Launch Enclave <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <div id="features"><FeaturesGrid /></div>
        <div id="preview"><ProductPreview /></div>
        <div id="pricing"><PricingSection /></div>
      </main>

      {/* Enterprise Footer */}
      <footer className="border-t border-cyber-border/80 bg-cyber-surface/90 py-12 px-6 sm:px-12 text-xs text-cyber-muted font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-cyber-cyan" />
            <span>FORENSIC NEXUS ENTERPRISE PLATFORM • ALL RIGHTS RESERVED 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <span>FIPS 140-3 COMPLIANT</span>
            <span>ZERO-TRUST ENCLAVE</span>
            <span>SHA-256 CUSTODY compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
