export type NodeType = 'SUSPECT' | 'ORGANISATION' | 'BANK_ACCOUNT' | 'IP_ADDRESS' | 'VEHICLE' | 'PHONE';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  riskScore: number;
  details: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  confidence: number;
}
