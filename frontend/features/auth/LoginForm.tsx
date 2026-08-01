"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("agent.vance@forensicnexus.gov");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate JWT auth token storage
      localStorage.setItem("forensic_nexus_token", "mock_jwt_token_agent_vance_2026");
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch {
      setError("Invalid credential clearance. Authentication failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl border border-cyber-border/80 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple mx-auto flex items-center justify-center shadow-cyan-glow mb-3">
          <ShieldAlert className="w-6 h-6 text-cyber-bg" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Agent Authentication</h1>
        <p className="text-xs text-cyber-muted">Enter authorized credentials to access Forensic Nexus Enclave</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-cyber-rose/15 border border-cyber-rose/30 text-xs text-cyber-rose text-center">
          {error}
        </div>
      )}

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

        <Input
          label="Passcode / Security Token"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-4 h-4" />}
          placeholder="••••••••••••"
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-cyber-muted cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded bg-cyber-surface border-cyber-border text-cyber-cyan" />
            Remember Clearance
          </label>
          <Link href="/forgot-password" className="text-cyber-cyan hover:underline">
            Forgot Keycard?
          </Link>
        </div>

        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          Authenticate & Access <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="pt-4 border-t border-cyber-border text-center text-xs text-cyber-muted">
        Need agency onboarding?{" "}
        <Link href="/signup" className="text-cyber-cyan hover:underline font-semibold">
          Request Clearance
        </Link>
      </div>
    </div>
  );
};
