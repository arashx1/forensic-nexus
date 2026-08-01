"use client";
import React from "react";
import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-cyber-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="w-full relative z-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
