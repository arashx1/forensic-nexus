from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

# USER SCHEMAS
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "ANALYST"
    badge_number: Optional[str] = None
    agency: str = "Federal Bureau of Investigation"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# CASE SCHEMAS
class CaseBase(BaseModel):
    title: str
    classification: str = "CYBERCRIME"
    status: str = "OPEN"
    priority: str = "HIGH"
    description: Optional[str] = None
    risk_score: int = 50

class CaseCreate(CaseBase):
    case_number: Optional[str] = None
    lead_officer_id: Optional[UUID] = None

class CaseUpdate(BaseModel):
    title: Optional[str] = None
    classification: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    description: Optional[str] = None
    risk_score: Optional[int] = None
    lead_officer_id: Optional[UUID] = None

class CaseResponse(CaseBase):
    id: UUID
    case_number: str
    lead_officer_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime
    evidence_count: int = 0
    suspect_count: int = 0
    class Config:
        from_attributes = True

# EVIDENCE SCHEMAS
class EvidenceBase(BaseModel):
    file_name: str
    file_type: str
    file_size: int

class EvidenceCreate(EvidenceBase):
    case_id: UUID
    file_hash_sha256: str
    storage_path: str
    ocr_extracted_text: Optional[str] = None
    metadata_json: Optional[Dict[str, Any]] = {}

class EvidenceResponse(EvidenceBase):
    id: UUID
    case_id: UUID
    file_hash_sha256: str
    ocr_status: str
    ocr_extracted_text: Optional[str] = None
    chain_of_custody_status: str
    uploaded_at: datetime
    metadata_json: Optional[Dict[str, Any]] = {}
    class Config:
        from_attributes = True

# AUDIT SCHEMAS
class AuditLogResponse(BaseModel):
    id: UUID
    user_id: Optional[UUID]
    action: str
    entity_type: str
    entity_id: Optional[str]
    details: Optional[Dict[str, Any]]
    timestamp: datetime
    class Config:
        from_attributes = True

# AI PROVIDER ABSTRACTION SCHEMAS
class AICompletionRequest(BaseModel):
    provider: str = "mock" # openai, gemini, claude, deepseek, llama, local, mock
    prompt: str
    system_prompt: Optional[str] = "You are Forensic Nexus AI Assistant, an elite cyber intelligence analyst."
    max_tokens: int = 1000
    temperature: float = 0.2

class AICompletionResponse(BaseModel):
    provider: str
    model: str
    content: str
    confidence_score: float = 0.98
    tokens_used: int = 240

# OCR PROVIDER ABSTRACTION SCHEMAS
class OCRRequest(BaseModel):
    provider: str = "mock" # google_vision, azure_vision, tesseract, openai_vision, mock
    evidence_id: UUID

class OCRResponse(BaseModel):
    provider: str
    evidence_id: UUID
    status: str
    extracted_text: str
    entities_detected: List[Dict[str, str]] = []
    confidence: float = 0.95
