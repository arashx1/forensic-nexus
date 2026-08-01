"use client";
import React, { useState } from "react";
import { Check, ShieldAlert, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "./ContactModal";

const PLANS = [
  {
    name: "Law Enforcement Agency",
    price: "$2,499",
    period: "/month /unit",
    description: "Designed for municipal police departments, state cyber taskforces, and regional forensic labs.",
    features: [
      "Up to 50 Active Cases",
      "500 GB Secure Evidence Storage",
      "Multi-Engine OCR (Google Vision & Tesseract)",
      "Standard Link Graph & Map Visualization",
      "SHA-256 Chain of Custody Audit Trail",
      "Standard Email & Phone Support"
    ],
    highlight: false,
    cta: "Request Agency Pilot"
  },
  {
    name: "Federal & Enterprise",
    price: "$7,999",
    period: "/month /agency",
    description: "Built for federal agencies, defense intelligence, and fortune 500 enterprise IR teams.",
    features: [
      "Unlimited Active Cases",
      "10 TB High-Speed Evidence Enclave",
      "All AI Providers (OpenAI, Gemini, Claude 3.5)",
      "Advanced Criminal Network Graph Clustering",
      "Full API & Webhook Integration",
      "24/7 Dedicated Cyber Engineer SLA",
      "Sovereign Air-Gapped Deployment Support"
    ],
    highlight: true,
    cta: "Deploy Federal Enclave"
  },
  {
    name: "Sovereign On-Premise",
    price: "Custom",
    period: "annual licensing",
    description: "Fully isolated, air-gapped deployment on agency sovereign GPU clusters.",
    features: [
      "100% Air-Gapped Local LLM Execution",
      "Custom Hardware Acceleration (vLLM / TensorRT)",
      "Custom Classifier Model Training",
      "Zero Egress Guarantee",
      "On-Site Deployment & Clearance Training"
    ],
    highlight: false,
    cta: "Contact Security Architect"
  }
];

export const PricingSection: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  return (
    <section className="py-20 relative bg-cyber-surface/40 border-t border-cyber-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyber-cyan">
            CLEARANCE TIERS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Enterprise Deployment Pricing
          </h2>
          <p className="text-sm text-cyber-muted max-w-2xl mx-auto">
            Transparent licensing options tailored for public safety, intelligence agencies, and corporate defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                plan.highlight
                  ? "border-cyber-cyan/60 shadow-cyan-glow bg-cyber-card/90"
                  : "border-cyber-border/80 hover:border-cyber-cyan/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-bg font-bold text-[10px] uppercase font-mono tracking-wider shadow-md">
                  MOST POPULAR FOR AGENCIES
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-cyber-muted min-h-[36px] mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-white">{plan.price}</span>
                  <span className="text-xs text-cyber-muted font-mono">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8 border-t border-cyber-border/60 pt-6">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-cyber-text">
                      <Check className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={plan.highlight ? "primary" : "secondary"}
                className="w-full mt-4"
                onClick={() => handleSelectPlan(plan.name)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialPlan={selectedPlan}
      />
    </section>
  );
};
