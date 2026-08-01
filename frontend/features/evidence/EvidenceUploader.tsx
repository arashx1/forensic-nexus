"use client";
import React, { useState } from "react";
import { UploadCloud, File, CheckCircle2, Shield, ScanText } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { apiService } from "@/services/api";
import { Case } from "@/types/case";

interface EvidenceUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  cases: Case[];
  onUploaded: () => void;
}

export const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  isOpen,
  onClose,
  cases,
  onUploaded
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || "");
  const [dragActive, setDragActive] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleStartUpload = async () => {
    if (!uploadFile || !selectedCaseId) return;
    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(async () => {
      clearInterval(interval);
      await apiService.uploadEvidence(selectedCaseId, uploadFile);
      setUploadProgress(100);
      setIsUploading(false);
      setIsComplete(true);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Digital Evidence File">
      <div className="space-y-6">
        {isComplete ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Evidence Uploaded & Cryptographically Signed</h3>
            <p className="text-xs text-cyber-muted max-w-md mx-auto">
              File <span className="text-white font-mono">{uploadFile?.name}</span> indexed. SHA-256 checksum generated and registered in chain of custody audit log.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="primary" onClick={() => { onUploaded(); onClose(); }}>
                Done & View Vault
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-cyber-muted">Target Investigation Case</label>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3 py-2 text-xs text-cyber-text focus:border-cyber-cyan outline-none"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.case_number} • {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                dragActive
                  ? "border-cyber-cyan bg-cyber-cyan/10"
                  : "border-cyber-border/80 bg-cyber-surface/40 hover:border-cyber-cyan/40"
              }`}
            >
              <input
                type="file"
                id="evidence-file-input"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.png,.jpg,.jpeg,.mp4,.mp3,.csv,.raw,.pcap"
              />
              <label htmlFor="evidence-file-input" className="cursor-pointer space-y-3 block">
                <UploadCloud className="w-12 h-12 text-cyber-cyan mx-auto animate-bounce" />
                <div className="text-sm font-semibold text-white">
                  {uploadFile ? uploadFile.name : "Drag & Drop forensic file here or click to browse"}
                </div>
                <div className="text-xs text-cyber-muted">
                  Supports PDF, DOCX, PNG, JPG, MP4, MP3, CSV, PCAP, RAW memory dumps
                </div>
              </label>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-cyber-cyan">
                  <span>Uploading & Calculating SHA-256 Checksum...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <Shield className="w-3.5 h-3.5" /> Chain of Custody Auto-Enforced
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleStartUpload}
                  disabled={!uploadFile || isUploading}
                  isLoading={isUploading}
                >
                  Start Upload & OCR <ScanText className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
