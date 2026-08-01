"use client";
import React, { useState } from "react";
import { Plus, Briefcase, FileText } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";
import { CaseClassification, CasePriority } from "@/types/case";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState<CaseClassification>("CYBERCRIME");
  const [priority, setPriority] = useState<CasePriority>("HIGH");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await apiService.createCase({
      title,
      classification,
      priority,
      description,
    });

    setIsLoading(false);
    onCreated();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Open New Investigation Case">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Case Title / Code Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          icon={<Briefcase className="w-4 h-4" />}
          placeholder="Operation Apex Phantom"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-cyber-muted">Classification</label>
            <select
              value={classification}
              onChange={(e) => setClassification(e.target.value as CaseClassification)}
              className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3 py-2 text-xs text-cyber-text focus:border-cyber-cyan outline-none"
            >
              <option value="CYBERCRIME">CYBERCRIME</option>
              <option value="FINANCIAL">FINANCIAL</option>
              <option value="COUNTER_TERRORISM">COUNTER_TERRORISM</option>
              <option value="ORGANIZED_CRIME">ORGANIZED_CRIME</option>
              <option value="FORENSIC_PHYSICAL">FORENSIC_PHYSICAL</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-cyber-muted">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as CasePriority)}
              className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3 py-2 text-xs text-cyber-text focus:border-cyber-cyan outline-none"
            >
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-cyber-muted">Case Briefing / Initial Findings</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of initial breach vector, target assets, or intelligence sources..."
            className="w-full bg-cyber-surface border border-cyber-border rounded-lg p-3 text-xs text-cyber-text focus:border-cyber-cyan focus:outline-none placeholder:text-cyber-muted/60"
            required
          />
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Initialize Case <Plus className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Modal>
  );
};
