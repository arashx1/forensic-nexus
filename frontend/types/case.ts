export type CaseStatus = 'OPEN' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'CLOSED' | 'ARCHIVED';
export type CasePriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CaseClassification = 'CYBERCRIME' | 'FINANCIAL' | 'COUNTER_TERRORISM' | 'ORGANIZED_CRIME' | 'FORENSIC_PHYSICAL';

export interface Case {
  id: string;
  case_number: string;
  title: string;
  classification: CaseClassification;
  status: CaseStatus;
  priority: CasePriority;
  description: string;
  risk_score: number;
  lead_officer_id?: string;
  created_at: string;
  updated_at: string;
  evidence_count: number;
  suspect_count: number;
}

export interface Suspect {
  id: string;
  case_id: string;
  full_name: string;
  risk_level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  biography?: string;
  dna_profile_id?: string;
}

export interface Victim {
  id: string;
  case_id: string;
  full_name: string;
  contact_info?: string;
  statement_summary?: string;
}
