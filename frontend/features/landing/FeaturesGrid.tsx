import React from "react";
import { ShieldCheck, Share2, ScanText, Cpu, MapPin, FileCheck, Layers, Key } from "lucide-react";

const FEATURES = [
  {
    icon: Share2,
    title: "Criminal Network Graph",
    description: "Interactive link analysis mapping complex relationships between suspects, shell organizations, IP addresses, and financial transactions.",
    color: "text-cyber-cyan",
    bg: "bg-cyber-cyan/10 border-cyber-cyan/30"
  },
  {
    icon: ScanText,
    title: "Multi-Engine OCR & Vision",
    description: "Plug-and-play OCR architecture supporting Google Vision, Azure, Tesseract, and OpenAI Vision to extract structured text from scanned evidence.",
    color: "text-cyber-blue",
    bg: "bg-cyber-blue/10 border-cyber-blue/30"
  },
  {
    icon: Cpu,
    title: "Agnostic AI Provider Layer",
    description: "Switch seamlessly between OpenAI, Gemini, Claude 3.5, DeepSeek R1, Llama 3.3, and local sovereign LLMs without altering codebase logic.",
    color: "text-cyber-purple",
    bg: "bg-cyber-purple/10 border-cyber-purple/30"
  },
  {
    icon: ShieldCheck,
    title: "Cryptographic Chain of Custody",
    description: "SHA-256 evidence hashing and immutable audit trails ensuring legal admissibility in court proceedings.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30"
  },
  {
    icon: MapPin,
    title: "Geo Intelligence & GPS Routing",
    description: "Map-based hotspot visualization mapping physical crime scenes, server command nodes, and movement trajectories.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30"
  },
  {
    icon: FileCheck,
    title: "Automated Report Generator",
    description: "Generate court-ready executive briefings and forensic case audit reports formatted to federal evidentiary standards.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/30"
  }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-20 relative border-t border-cyber-border/60 bg-cyber-surface/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyber-cyan">
            ENGINEERING CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built for Mission-Critical Investigations
          </h2>
          <p className="text-sm text-cyber-muted max-w-2xl mx-auto">
            Comprehensive suite of AI tools designed specifically for digital forensics, financial crimes, and counter-threat operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl border border-cyber-border/80 hover:border-cyber-cyan/40 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl border ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-cyber-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
