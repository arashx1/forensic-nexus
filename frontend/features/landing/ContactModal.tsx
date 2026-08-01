"use client";
import React, { useState } from "react";
import { Mail, Building, User, Send, CheckCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [message, setMessage] = useState("");
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
    <Modal isOpen={isOpen} onClose={onClose} title="Request Enterprise Demonstration / Clearance">
      {isSubmitted ? (
        <div className="py-8 text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
          <p className="text-xs text-cyber-muted max-w-md mx-auto">
            A Senior Cyber Intelligence Architect has been assigned to your request. We will initiate clearance verification via <span className="text-cyber-cyan font-mono">{email}</span> within 4 business hours.
          </p>
          <Button onClick={onClose} variant="primary" className="mt-4">
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {initialPlan && (
            <div className="p-3 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-xs text-cyber-cyan font-mono">
              Selected Tier: <span className="font-bold">{initialPlan}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Official Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-4 h-4" />}
              placeholder="Special Agent Vance"
              required
            />
            <Input
              label="Official Agency Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              placeholder="agent@fbi.gov"
              required
            />
          </div>

          <Input
            label="Agency / Defense Department"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            icon={<Building className="w-4 h-4" />}
            placeholder="Federal Bureau of Investigation / DoD"
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-cyber-muted">Operational Scope / Inquiries</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Specify unit requirements, air-gapped constraints, or estimated user seats..."
              className="w-full bg-cyber-surface border border-cyber-border rounded-lg p-3 text-xs text-cyber-text focus:border-cyber-cyan focus:outline-none placeholder:text-cyber-muted/60"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Submit Inquiry <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
