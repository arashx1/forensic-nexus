"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { OCRService, OCRProviderType } from "@/services/ocrService";
import { ScanText, Cpu, CheckCircle } from "lucide-react";

interface OCRResultModalProps {
  evidenceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OCRResultModal: React.FC<OCRResultModalProps> = ({ evidenceId, isOpen, onClose }) => {
  const [provider, setProvider] = useState<OCRProviderType>("google_vision");
  const [extractedText, setExtractedText] = useState("");
  const [entities, setEntities] = useState<{ type: string; val: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunOCR = async () => {
    setIsLoading(true);
    const res = await OCRService.runOCR(evidenceId, provider);
    setExtractedText(res.extracted_text);
    setEntities(res.entities);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Execute Multi-Provider OCR Analysis">
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-cyber-muted">Select OCR Service Engine</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as OCRProviderType)}
            className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3 py-2 text-xs text-cyber-text focus:border-cyber-cyan outline-none"
          >
            <option value="google_vision">Google Vision OCR (High Accuracy)</option>
            <option value="azure_vision">Azure Computer Vision Read API</option>
            <option value="openai_vision">OpenAI GPT-4o Vision Multimodal</option>
            <option value="tesseract">Tesseract Open Source (Local Sovereign)</option>
          </select>
        </div>

        <Button variant="primary" className="w-full" onClick={handleRunOCR} isLoading={isLoading}>
          Run OCR Engine Process <ScanText className="w-4 h-4" />
        </Button>

        {extractedText && (
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase text-cyber-muted">Extracted Text Output</div>
              <pre className="p-3 rounded-lg bg-cyber-bg border border-cyber-border text-xs font-mono text-cyber-cyan overflow-x-auto max-h-36">
                {extractedText}
              </pre>
            </div>

            {entities.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase text-cyber-muted">Detected Named Entities</div>
                <div className="grid grid-cols-2 gap-2">
                  {entities.map((ent, idx) => (
                    <div key={idx} className="p-2 rounded bg-cyber-card border border-cyber-border text-xs font-mono">
                      <span className="text-cyber-muted">{ent.type}:</span>{" "}
                      <span className="text-white font-bold">{ent.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close Window
          </Button>
        </div>
      </div>
    </Modal>
  );
};
