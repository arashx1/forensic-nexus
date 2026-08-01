import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forensic Nexus | Enterprise AI Forensic Intelligence Platform",
  description: "Production-ready enterprise AI-powered forensic intelligence platform for law enforcement, defense, and incident response teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cyber-bg text-cyber-text antialiased selection:bg-cyber-cyan selection:text-cyber-bg">
        {children}
      </body>
    </html>
  );
}
