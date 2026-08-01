-- Forensic Nexus Enterprise SQL Schema
-- Compatible with PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ANALYST', -- ADMIN, LEAD_INVESTIGATOR, ANALYST, AUDITOR
    badge_number VARCHAR(100),
    agency VARCHAR(255) NOT NULL DEFAULT 'Federal Bureau of Investigation',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CASES TABLE
CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    classification VARCHAR(100) NOT NULL DEFAULT 'CYBERCRIME', -- CYBERCRIME, FINANCIAL, COUNTER_TERRORISM, ORGANIZED_CRIME, FORENSIC_PHYSICAL
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, PENDING_REVIEW, CLOSED, ARCHIVED
    priority VARCHAR(50) NOT NULL DEFAULT 'HIGH', -- CRITICAL, HIGH, MEDIUM, LOW
    description TEXT,
    lead_officer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    risk_score INT NOT NULL DEFAULT 50, -- 0-100
    tags VARCHAR(255)[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. EVIDENCE TABLE
CREATE TABLE IF NOT EXISTS evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_hash_sha256 VARCHAR(64) NOT NULL,
    storage_path TEXT NOT NULL,
    ocr_status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, PROCESSING, COMPLETED, FAILED
    ocr_extracted_text TEXT,
    chain_of_custody_status VARCHAR(100) NOT NULL DEFAULT 'VERIFIED',
    uploaded_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SUSPECTS TABLE
CREATE TABLE IF NOT EXISTS suspects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    aliases VARCHAR(255)[],
    date_of_birth DATE,
    risk_level VARCHAR(50) NOT NULL DEFAULT 'HIGH', -- CRITICAL, HIGH, MEDIUM, LOW
    dna_profile_id VARCHAR(100),
    fingerprint_hash VARCHAR(128),
    biography TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. VICTIMS TABLE
CREATE TABLE IF NOT EXISTS victims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255),
    statement_summary TEXT,
    status VARCHAR(50) DEFAULT 'PROTECTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- CASE_CREATED, EVIDENCE_UPLOADED, OCR_RUN, USER_LOGIN, RISK_EVALUATED
    entity_type VARCHAR(100) NOT NULL, -- CASE, EVIDENCE, USER, SUSPECT
    entity_id VARCHAR(255),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. GRAPH NODES & EDGES (PREPARATION FOR CRIMINAL NETWORK MODULE)
CREATE TABLE IF NOT EXISTS graph_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    node_type VARCHAR(50) NOT NULL, -- SUSPECT, ORGANISATION, BANK_ACCOUNT, IP_ADDRESS, VEHICLE, PHONE
    label VARCHAR(255) NOT NULL,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS graph_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    source_node_id UUID REFERENCES graph_nodes(id) ON DELETE CASCADE,
    target_node_id UUID REFERENCES graph_nodes(id) ON DELETE CASCADE,
    relation_type VARCHAR(100) NOT NULL, -- FINANCED, ASSOCIATED_WITH, COMMUNICATED_WITH, OWNED_BY
    confidence_score FLOAT DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR HIGH-PERFORMANCE QUERYING
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_priority ON cases(priority);
CREATE INDEX IF NOT EXISTS idx_evidence_case_id ON evidence(case_id);
CREATE INDEX IF NOT EXISTS idx_suspects_case_id ON suspects(case_id);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);

-- SEED DEMO DATA
INSERT INTO users (id, email, hashed_password, full_name, role, badge_number, agency)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'agent.vance@forensicnexus.gov',
    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', -- password123
    'Special Agent Vance',
    'LEAD_INVESTIGATOR',
    'FX-9942',
    'Federal Cyber Taskforce'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO cases (id, case_number, title, classification, status, priority, description, risk_score)
VALUES (
    'c1111111-1111-1111-1111-111111111111',
    'CASE-2026-8801',
    'Operation DarkHydra Cyber Heist',
    'CYBERCRIME',
    'IN_PROGRESS',
    'CRITICAL',
    'Multinational ransom campaign targeting financial infrastructure using zero-day exploits.',
    94
), (
    'c2222222-2222-2222-2222-222222222222',
    'CASE-2026-4092',
    'Vanguard Defense Asset Exfiltration',
    'COUNTER_TERRORISM',
    'OPEN',
    'HIGH',
    'Unlawful extraction of classified aerospace schematics detected via encrypted channels.',
    82
) ON CONFLICT (case_number) DO NOTHING;
