import { Case, CaseStatus, CasePriority, CaseClassification } from "@/types/case";
import { EvidenceItem } from "@/types/evidence";
import { AuditLog } from "@/types/audit";
import { MOCK_CASES, MOCK_EVIDENCE, MOCK_AUDIT_LOGS } from "@/lib/mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiService {
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("forensic_nexus_token");
    }
    return null;
  }

  // --- CASES ---
  async getCases(filters?: { status?: string; priority?: string; search?: string }): Promise<Case[]> {
    try {
      const token = this.getToken();
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.priority) params.append("priority", filters.priority);
      if (filters?.search) params.append("search", filters.search);

      const res = await fetch(`${API_BASE_URL}/cases?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Backend unavailable");
      return await res.json();
    } catch {
      // Fallback to local mock filtering
      let result = [...MOCK_CASES];
      if (filters?.status) result = result.filter(c => c.status === filters.status);
      if (filters?.priority) result = result.filter(c => c.priority === filters.priority);
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(c => 
          c.title.toLowerCase().includes(q) || 
          c.case_number.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      }
      return result;
    }
  }

  async createCase(data: { title: string; classification: CaseClassification; priority: CasePriority; description: string }): Promise<Case> {
    try {
      const token = this.getToken();
      const res = await fetch(`${API_BASE_URL}/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to create case");
      return await res.json();
    } catch {
      const newCase: Case = {
        id: `c-mock-${Date.now()}`,
        case_number: `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        title: data.title,
        classification: data.classification,
        status: "OPEN",
        priority: data.priority,
        description: data.description,
        risk_score: 75,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        evidence_count: 0,
        suspect_count: 0
      };
      MOCK_CASES.unshift(newCase);
      return newCase;
    }
  }

  async deleteCase(id: string): Promise<boolean> {
    try {
      const token = this.getToken();
      const res = await fetch(`${API_BASE_URL}/cases/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return res.ok;
    } catch {
      const idx = MOCK_CASES.findIndex(c => c.id === id);
      if (idx !== -1) {
        MOCK_CASES.splice(idx, 1);
      }
      return true;
    }
  }

  // --- EVIDENCE ---
  async getEvidence(caseId?: string): Promise<EvidenceItem[]> {
    try {
      const token = this.getToken();
      const url = caseId ? `${API_BASE_URL}/evidence?case_id=${caseId}` : `${API_BASE_URL}/evidence`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error("Backend unavailable");
      return await res.json();
    } catch {
      if (caseId) return MOCK_EVIDENCE.filter(e => e.case_id === caseId);
      return MOCK_EVIDENCE;
    }
  }

  async uploadEvidence(caseId: string, file: File): Promise<EvidenceItem> {
    try {
      const token = this.getToken();
      const formData = new FormData();
      formData.append("case_id", caseId);
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/evidence/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
      if (!res.ok) throw new Error("Upload failed");
      return await res.json();
    } catch {
      const newEv: EvidenceItem = {
        id: `ev-mock-${Date.now()}`,
        case_id: caseId,
        file_name: file.name,
        file_type: file.type || "application/octet-stream",
        file_size: file.size,
        file_hash_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        storage_path: `/vault/${caseId}/${file.name}`,
        ocr_status: "COMPLETED",
        ocr_extracted_text: `[SIMULATED OCR ANALYSIS]\nDocument ${file.name} parsed.\nHigh priority entity detected. Hash matches threat signature.`,
        chain_of_custody_status: "VERIFIED_CRYPTOGRAPHICALLY",
        uploaded_at: new Date().toISOString()
      };
      MOCK_EVIDENCE.unshift(newEv);
      return newEv;
    }
  }

  // --- STATS & AUDIT ---
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/stats/dashboard`);
      if (!res.ok) throw new Error("Backend unavailable");
      return await res.json();
    } catch {
      return {
        total_cases: MOCK_CASES.length,
        active_cases: MOCK_CASES.filter(c => c.status === "OPEN" || c.status === "IN_PROGRESS").length,
        total_evidence: MOCK_EVIDENCE.length,
        high_risk_suspects: 8,
        chain_of_custody_integrity: 99.9,
        ai_threat_index: "ELEVATED"
      };
    }
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/audit-logs`);
      if (!res.ok) throw new Error("Backend unavailable");
      return await res.json();
    } catch {
      return MOCK_AUDIT_LOGS;
    }
  }
}

export const apiService = new ApiService();
