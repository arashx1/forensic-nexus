import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from sqlalchemy.orm import relationship
from backend.database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="ANALYST")
    badge_number = Column(String(100), nullable=True)
    agency = Column(String(255), nullable=False, default="Federal Bureau of Investigation")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

class Case(Base):
    __tablename__ = "cases"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    case_number = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    classification = Column(String(100), nullable=False, default="CYBERCRIME")
    status = Column(String(50), nullable=False, default="OPEN")
    priority = Column(String(50), nullable=False, default="HIGH")
    description = Column(Text, nullable=True)
    lead_officer_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    risk_score = Column(Integer, default=50)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    evidence_items = relationship("Evidence", back_populates="case", cascade="all, delete-orphan")
    suspects = relationship("Suspect", back_populates="case", cascade="all, delete-orphan")
    victims = relationship("Victim", back_populates="case", cascade="all, delete-orphan")

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    case_id = Column(UUID(as_uuid=True), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(100), nullable=False)
    file_size = Column(Integer, nullable=False)
    file_hash_sha256 = Column(String(64), nullable=False)
    storage_path = Column(Text, nullable=False)
    ocr_status = Column(String(50), default="PENDING")
    ocr_extracted_text = Column(Text, nullable=True)
    chain_of_custody_status = Column(String(100), default="VERIFIED")
    uploaded_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    metadata_json = Column(JSON, default={})
    uploaded_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    case = relationship("Case", back_populates="evidence_items")

class Suspect(Base):
    __tablename__ = "suspects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    case_id = Column(UUID(as_uuid=True), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False)
    full_name = Column(String(255), nullable=False)
    risk_level = Column(String(50), default="HIGH")
    dna_profile_id = Column(String(100), nullable=True)
    biography = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    case = relationship("Case", back_populates="suspects")

class Victim(Base):
    __tablename__ = "victims"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    case_id = Column(UUID(as_uuid=True), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False)
    full_name = Column(String(255), nullable=False)
    contact_info = Column(String(255), nullable=True)
    statement_summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    case = relationship("Case", back_populates="victims")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(String(255), nullable=True)
    details = Column(JSON, default={})
    ip_address = Column(String(45), nullable=True)
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow)
