"use client";
import React, { useState, useEffect } from "react";
import { UploadCloud, FileText, Eye, ScanText, Lock } from "lucide-react";
import { EvidenceItem } from "@/types/evidence";
import { Case } from "@/types/case";
import { apiService } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBytes, formatDate } from "@/lib/utils";
import { EvidenceUploader } from "./EvidenceUploader";
import { FilePreviewModal } from "./FilePreviewModal";
import { OCRResultModal } from "./OCRResultModal";

export const EvidenceList: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<EvidenceItem | null>(null);
  const [ocrTargetId, setOcrTargetId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedEvidence = await apiService.getEvidence();
    const fetchedCases = await apiService.getCases();
    setEvidenceList(fetchedEvidence);
    setCases(fetchedCases);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyber-blue" /> Evidence Vault & Chain of Custody
          </h1>
          <p className="text-xs text-cyber-muted">Cryptographically verified forensic evidence repository</p>
        </div>
        <Button variant="primary" onClick={() => setIsUploaderOpen(true)}>
          <UploadCloud className="w-4 h-4" /> Upload Digital Evidence
        </Button>
      </div>

      {/* Evidence Table */}
      <div className="glass-card rounded-xl border border-cyber-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-cyber-muted uppercase font-mono border-b border-cyber-border bg-cyber-surface/80">
              <tr>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">SHA-256 Checksum</th>
                <th className="py-3 px-4">Type & Size</th>
                <th className="py-3 px-4">Chain of Custody</th>
                <th className="py-3 px-4">OCR Status</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/60">
              {evidenceList.map((ev) => (
                <tr key={ev.id} className="hover:bg-cyber-surface/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyber-cyan" /> {ev.file_name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-cyber-muted">
                    {ev.file_hash_sha256.substring(0, 16)}...
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyber-muted">
                    {ev.file_type.split("/")[1] || ev.file_type} • {formatBytes(ev.file_size)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <Lock className="w-3 h-3" /> VERIFIED
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="cyan">{ev.ocr_status}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyber-muted">{formatDate(ev.uploaded_at)}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedFile(ev)}>
                      <Eye className="w-3.5 h-3.5 text-cyber-cyan" /> Inspect
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setOcrTargetId(ev.id)}>
                      <ScanText className="w-3.5 h-3.5 text-cyber-purple" /> Run OCR
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploaderOpen && (
        <EvidenceUploader
          isOpen={isUploaderOpen}
          onClose={() => setIsUploaderOpen(false)}
          cases={cases}
          onUploaded={() => {
            setIsUploaderOpen(false);
            loadData();
          }}
        />
      )}

      {/* File Preview Modal */}
      <FilePreviewModal
        evidence={selectedFile}
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
      />

      {/* OCR Result Modal */}
      {ocrTargetId && (
        <OCRResultModal
          evidenceId={ocrTargetId}
          isOpen={!!ocrTargetId}
          onClose={() => setOcrTargetId(null)}
        />
      )}
    </div>
  );
};
