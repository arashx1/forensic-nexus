export type OCRStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface EvidenceItem {
  id: string;
  case_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_hash_sha256: string;
  storage_path: string;
  ocr_status: OCRStatus;
  ocr_extracted_text?: string;
  chain_of_custody_status: string;
  uploaded_at: string;
  metadata_json?: Record<string, any>;
}
