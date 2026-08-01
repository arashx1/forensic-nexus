"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserIcon, Mail, Lock, Shield, BadgeCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [agency, setAgency] = useState("Federal Cyber Taskforce");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("forensic_nexus_token", "mock_jwt_token_new_user");
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl border border-cyber-border/80 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyber-cyan to-cyber-blue mx-auto flex items-center justify-center shadow-cyan-glow mb-3">
          <BadgeCheck className="w-6 h-6 text-cyber-bg" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Agency Onboarding</h1>
        <p className="text-xs text-cyber-muted">Register official personnel credential clearance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Legal Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          icon={<UserIcon className="w-4 h-4" />}
          placeholder="Special Agent Jane Doe"
          required
        />

        <Input
          label="Official Agency Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-4 h-4" />}
          placeholder="j.doe@fbi.gov"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Badge / ID Number"
            type="text"
            value={badgeNumber}
            onChange={(e) => setBadgeNumber(e.target.value)}
            icon={<Shield className="w-4 h-4" />}
            placeholder="FX-8812"
            required
          />

          <Input
            label="Agency Department"
            type="text"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            placeholder="Cyber Taskforce"
            required
          />
        </div>

        <Input
          label="Security Keycard Passcode"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-4 h-4" />}
          placeholder="••••••••••••"
          required
        />

        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          Submit Clearance Request <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="pt-4 border-t border-cyber-border text-center text-xs text-cyber-muted">
        Already authenticated?{" "}
        <Link href="/login" className="text-cyber-cyan hover:underline font-semibold">
          Return to Sign In
        </Link>
      </div>
    </div>
  );
};
