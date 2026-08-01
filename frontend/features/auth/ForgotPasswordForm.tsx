"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, KeyRound, CheckCircle2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl border border-cyber-border/80 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple mx-auto flex items-center justify-center shadow-cyan-glow mb-3">
          <KeyRound className="w-6 h-6 text-cyber-bg" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Reset Credentials</h1>
        <p className="text-xs text-cyber-muted">Dispatch secure token reset instructions to agency email</p>
      </div>

      {isSubmitted ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <div className="text-sm font-semibold text-emerald-400">Reset Token Dispatched</div>
          <p className="text-xs text-cyber-muted">
            Check your secure agency inbox <span className="text-cyber-text font-mono">{email}</span> for authorization link.
          </p>
          <Link href="/login" className="inline-block mt-2 text-xs text-cyber-cyan hover:underline font-medium">
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Agency Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            placeholder="agent@forensicnexus.gov"
            required
          />

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Send Reset Instructions
          </Button>
        </form>
      )}

      <div className="pt-4 border-t border-cyber-border text-center">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-cyber-muted hover:text-cyber-text transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Authentication
        </Link>
      </div>
    </div>
  );
};
