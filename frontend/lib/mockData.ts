import { Case, Suspect, Victim } from "@/types/case";
import { EvidenceItem } from "@/types/evidence";
import { GraphNode, GraphEdge } from "@/types/graph";
import { GeoPoint } from "@/types/maps";
import { AuditLog } from "@/types/audit";

export const MOCK_CASES: Case[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    case_number: "CASE-2026-8801",
    title: "Operation DarkHydra Cyber Heist",
    classification: "CYBERCRIME",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    description: "Multinational ransom campaign targeting state financial clearinghouses using zero-day memory exploits.",
    risk_score: 94,
    created_at: "2026-07-25T14:32:00Z",
    updated_at: "2026-08-01T09:15:00Z",
    evidence_count: 14,
    suspect_count: 5
  },
  {
    id: "c2222222-2222-2222-2222-222222222222",
    case_number: "CASE-2026-4092",
    title: "Vanguard Aerospace Schematic Exfiltration",
    classification: "COUNTER_TERRORISM",
    status: "OPEN",
    priority: "HIGH",
    description: "Unlawful extraction of stealth drone telemetry and propulsion blueprints detected via encrypted outbound HTTPS tunnels.",
    risk_score: 82,
    created_at: "2026-07-28T08:10:00Z",
    updated_at: "2026-07-31T16:45:00Z",
    evidence_count: 8,
    suspect_count: 3
  },
  {
    id: "c3333333-3333-3333-3333-333333333333",
    case_number: "CASE-2026-1104",
    title: "Project BlackGold Offshore Money Laundering",
    classification: "FINANCIAL",
    status: "PENDING_REVIEW",
    priority: "MEDIUM",
    description: "Complex shell company network funneling $42M in illicit proceeds across 6 offshore jurisdictions.",
    risk_score: 65,
    created_at: "2026-07-15T11:20:00Z",
    updated_at: "2026-07-30T12:00:00Z",
    evidence_count: 22,
    suspect_count: 7
  },
  {
    id: "c4444444-4444-4444-4444-444444444444",
    case_number: "CASE-2026-9921",
    title: "RedMatrix Tactical Signal Jamming Network",
    classification: "ORGANIZED_CRIME",
    status: "CLOSED",
    priority: "LOW",
    description: "Illegal frequency interception array operating near federal maritime port facilities.",
    risk_score: 38,
    created_at: "2026-06-10T09:00:00Z",
    updated_at: "2026-07-20T18:30:00Z",
    evidence_count: 5,
    suspect_count: 2
  }
];

export const MOCK_EVIDENCE: EvidenceItem[] = [
  {
    id: "ev-101",
    case_id: "c1111111-1111-1111-1111-111111111111",
    file_name: "SWIFT_Transaction_Dump_2026.csv",
    file_type: "text/csv",
    file_size: 4850120,
    file_hash_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    storage_path: "/vault/c1/SWIFT_Transaction_Dump_2026.csv",
    ocr_status: "COMPLETED",
    ocr_extracted_text: "[TRANSACTION AUDIT LOG]\nTxID: #8849-B\nFrom: 192.168.1.104 (Subnet B)\nTo: SWIFT: CHASEUS33XXX\nAmount: $4,500,000.00 USD\nBeneficiary: Hydra International Holdings Ltd.",
    chain_of_custody_status: "VERIFIED_CRYPTOGRAPHICALLY",
    uploaded_at: "2026-07-29T10:14:00Z",
    metadata_json: {
      "ip_address": "192.168.1.104",
      "flagged_amount": "$4,500,000.00",
      "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  },
  {
    id: "ev-102",
    case_id: "c1111111-1111-1111-1111-111111111111",
    file_name: "MemoryDump_C2_Server.raw",
    file_type: "application/octet-stream",
    file_size: 1073741824,
    file_hash_sha256: "a94f8fe5ccb19ba61c4c0873d391e987982fbbd3",
    storage_path: "/vault/c1/MemoryDump_C2_Server.raw",
    ocr_status: "COMPLETED",
    ocr_extracted_text: "[VOLATILITY ANALYSIS RESULT]\nKernel Module Loaded: rk_stealth_v4.ko\nInjected Process: svchost.exe (PID: 4092)\nCommand Pipe: tcp://185.220.101.4:443",
    chain_of_custody_status: "VERIFIED_CRYPTOGRAPHICALLY",
    uploaded_at: "2026-07-30T16:22:00Z"
  },
  {
    id: "ev-103",
    case_id: "c2222222-2222-2222-2222-222222222222",
    file_name: "Exfiltration_Packet_Capture.pcap",
    file_type: "application/vnd.tcpdump.pcap",
    file_size: 15402900,
    file_hash_sha256: "bf82d613eb51829e17b3d368e547fae5ff6510e1",
    storage_path: "/vault/c2/Exfiltration_Packet_Capture.pcap",
    ocr_status: "COMPLETED",
    ocr_extracted_text: "[PCAP STREAM TEXT RECONSTRUCTION]\nPOST /api/v2/telemetry/upload HTTP/1.1\nHost: encrypted-nodes-dark.net\nUser-Agent: Mozilla/5.0 ForensicProbe/1.0",
    chain_of_custody_status: "VERIFIED_CRYPTOGRAPHICALLY",
    uploaded_at: "2026-07-31T11:40:00Z"
  }
];

export const MOCK_GRAPH_NODES: GraphNode[] = [
  { id: "node-1", label: "Viktor 'Cipher' Reznov", type: "SUSPECT", riskScore: 95, details: "Primary Architect of DarkHydra Botnet" },
  { id: "node-2", label: "Hydra Holdings (Belize)", type: "ORGANISATION", riskScore: 88, details: "Primary Shell Clearinghouse" },
  { id: "node-3", label: "185.220.101.4", type: "IP_ADDRESS", riskScore: 92, details: "Active Command & Control Node" },
  { id: "node-4", label: "SWIFT #8849-B", type: "BANK_ACCOUNT", riskScore: 78, details: "Offshore Wire Recipient" },
  { id: "node-5", label: "Elena Rostova", type: "SUSPECT", riskScore: 84, details: "Cryptographic Key Manager" },
  { id: "node-6", label: "+44 7700 900461", type: "PHONE", riskScore: 65, details: "Encrypted Satellite Comms" }
];

export const MOCK_GRAPH_EDGES: GraphEdge[] = [
  { id: "e-1", source: "node-1", target: "node-2", relation: "CONTROLS", confidence: 0.98 },
  { id: "e-2", source: "node-1", target: "node-3", relation: "OPERATES", confidence: 0.95 },
  { id: "e-3", source: "node-2", target: "node-4", relation: "FINANCED", confidence: 0.99 },
  { id: "e-4", source: "node-5", target: "node-1", relation: "ASSOCIATED_WITH", confidence: 0.91 },
  { id: "e-5", source: "node-5", target: "node-6", relation: "COMMUNICATED_WITH", confidence: 0.89 }
];

export const MOCK_GEO_POINTS: GeoPoint[] = [
  { id: "geo-1", title: "C2 Infrastructure Node", case_number: "CASE-2026-8801", lat: 38.8951, lng: -77.0364, severity: "CRITICAL", location_name: "Washington, D.C., USA", timestamp: "2026-08-01 02:14 UTC" },
  { id: "geo-2", title: "Encrypted Relay Server", case_number: "CASE-2026-8801", lat: 51.5074, lng: -0.1278, severity: "HIGH", location_name: "London, UK", timestamp: "2026-07-31 18:40 UTC" },
  { id: "geo-3", title: "Offshore Clearing Hub", case_number: "CASE-2026-1104", lat: 17.1899, lng: -88.4976, severity: "MEDIUM", location_name: "Belize City, Belize", timestamp: "2026-07-29 11:15 UTC" },
  { id: "geo-4", title: "Intercept Signal Tower", case_number: "CASE-2026-9921", lat: 40.7128, lng: -74.0060, severity: "HIGH", location_name: "New York, USA", timestamp: "2026-07-30 22:05 UTC" }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "aud-101", action: "EVIDENCE_UPLOADED", entity_type: "EVIDENCE", entity_id: "ev-102", details: { file: "MemoryDump_C2_Server.raw", sha256: "a94f8fe5ccb19ba61c4c0873d391e987982fbbd3" }, timestamp: "2026-08-01T09:42:10Z" },
  { id: "aud-102", action: "OCR_PROCESSING_COMPLETED", entity_type: "EVIDENCE", entity_id: "ev-101", details: { extracted_entities_count: 4, provider: "MockOCR" }, timestamp: "2026-08-01T09:15:00Z" },
  { id: "aud-103", action: "AI_RISK_EVALUATION", entity_type: "CASE", entity_id: "c1111111-1111-1111-1111-111111111111", details: { previous_score: 88, new_score: 94, reason: "Zero-day payload confirmed" }, timestamp: "2026-08-01T08:30:00Z" },
  { id: "aud-104", action: "USER_AUTHENTICATED", entity_type: "USER", entity_id: "agent.vance@forensicnexus.gov", details: { ip: "10.0.4.12", role: "LEAD_INVESTIGATOR" }, timestamp: "2026-08-01T08:00:00Z" }
];
