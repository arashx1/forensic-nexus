import hashlib
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from backend.api import deps
from backend.models import Evidence, Case, AuditLog, User
from backend.schemas import EvidenceResponse
from backend.services.ocr_service import OCRServiceFactory

router = APIRouter()

@router.get("", response_model=List[EvidenceResponse])
def list_evidence(case_id: uuid.UUID = None, db: Session = Depends(deps.get_db)):
    query = db.query(Evidence)
    if case_id:
        query = query.filter(Evidence.case_id == case_id)
    return query.order_by(Evidence.uploaded_at.desc()).all()

@router.post("/upload", response_model=EvidenceResponse)
async def upload_evidence(
    case_id: uuid.UUID = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    content = await file.read()
    file_size = len(content)
    file_hash = hashlib.sha256(content).hexdigest()
    storage_path = f"/uploads/{case_id}/{file.filename}"

    # Default OCR extraction for document/image types
    ocr_status = "PENDING"
    extracted_text = None
    if file.content_type in ["application/pdf", "image/jpeg", "image/png", "text/csv"]:
        ocr_service = OCRServiceFactory.get_service("mock")
        ocr_res = ocr_service.extract_text(uuid.uuid4(), storage_path, file.content_type)
        ocr_status = ocr_res.status
        extracted_text = ocr_res.extracted_text

    evidence = Evidence(
        case_id=case_id,
        file_name=file.filename,
        file_type=file.content_type or "application/octet-stream",
        file_size=file_size,
        file_hash_sha256=file_hash,
        storage_path=storage_path,
        ocr_status=ocr_status,
        ocr_extracted_text=extracted_text,
        uploaded_by_id=current_user.id,
        metadata_json={
            "mime_type": file.content_type,
            "sha256": file_hash,
            "simulated_location": {"lat": 38.8951, "lng": -77.0364, "name": "Washington DC HQ"}
        }
    )
    db.add(evidence)
    db.commit()
    db.refresh(evidence)

    audit = AuditLog(
        user_id=current_user.id,
        action="EVIDENCE_UPLOADED",
        entity_type="EVIDENCE",
        entity_id=str(evidence.id),
        details={"file_name": evidence.file_name, "hash": file_hash, "size": file_size}
    )
    db.add(audit)
    db.commit()

    return evidence

@router.get("/{evidence_id}", response_model=EvidenceResponse)
def get_evidence(evidence_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    ev = db.query(Evidence).filter(Evidence.id == evidence_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return ev
