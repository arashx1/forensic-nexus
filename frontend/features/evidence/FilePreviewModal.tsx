"use client";
import React from "react";
import { EvidenceItem } from "@/types/evidence";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBytes, formatDate } from "@/lib/utils";
import { FileText, ShieldCheck, Hash, HardDrive } from "lucide-react";

interface FilePreviewModalProps {
  evidence: EvidenceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ evidence, isOpen, onClose }) => {
  if (!evidence) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`File Inspector • ${evidence.file_name}`}>
      <div className="space-y-6">
        {/* Metadata Card */}
        <div className="glass-card p-4 rounded-xl border border-cyber-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <FileText className="w-4 h-4 text-cyber-cyan" /> {evidence.file_name}
            </div>
            <Badge variant="cyan">{evidence.file_type}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-cyber-border/60">
            <div>
              <span className="text-cyber-muted">Size:</span> <span className="text-white">{formatBytes(evidence.file_size)}</span>
            </div>
            <div>
              <span className="text-cyber-muted">Uploaded:</span> <span className="text-white">{formatDate(evidence.uploaded_at)}</span>
            </div>
          </div>
        </div>

        {/* Cryptographic SHA-256 Hash */}
        <div className="p-3 rounded-xl bg-cyber-surface border border-cyber-border space-y-1">
          <div className="text-[11px] font-mono text-cyber-cyan flex items-center gap-1.5 font-bold">
            <Hash className="w-3.5 h-3.5" /> SHA-256 FORENSIC CHECKSUM
          </div>
          <div className="text-xs font-mono text-white break-all bg-cyber-bg p-2 rounded border border-cyber-border/60">
            {evidence.file_hash_sha256}
          </div>
        </div>

        {/* OCR Transcript Output */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-cyber-muted">OCR Extracted Transcript Text</div>
          <pre className="p-4 rounded-xl bg-cyber-bg border border-cyber-border text-xs text-cyber-cyan font-mono overflow-x-auto max-h-48 leading-relaxed">
            {evidence.ocr_extracted_text || "No OCR transcript available for binary file."}
          </pre>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close Inspection
          </Button>
        </div>
      </div>
    </Modal>
  );
};
