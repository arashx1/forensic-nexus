import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from backend.api import deps
from backend.models import Case, Evidence, Suspect, AuditLog, User
from backend.schemas import CaseCreate, CaseUpdate, CaseResponse

router = APIRouter()

@router.get("", response_model=List[CaseResponse])
def list_cases(
    status_filter: Optional[str] = Query(None, alias="status"),
    priority_filter: Optional[str] = Query(None, alias="priority"),
    classification_filter: Optional[str] = Query(None, alias="classification"),
    search: Optional[str] = Query(None),
    db: Session = Depends(deps.get_db)
):
    query = db.query(Case)
    if status_filter:
        query = query.filter(Case.status == status_filter)
    if priority_filter:
        query = query.filter(Case.priority == priority_filter)
    if classification_filter:
        query = query.filter(Case.classification == classification_filter)
    if search:
        query = query.filter(
            (Case.title.ilike(f"%{search}%")) | 
            (Case.case_number.ilike(f"%{search}%")) |
            (Case.description.ilike(f"%{search}%"))
        )
    cases = query.order_by(Case.created_at.desc()).all()
    
    results = []
    for c in cases:
        ev_count = db.query(Evidence).filter(Evidence.case_id == c.id).count()
        sp_count = db.query(Suspect).filter(Suspect.case_id == c.id).count()
        res = CaseResponse.from_orm(c)
        res.evidence_count = ev_count
        res.suspect_count = sp_count
        results.append(res)
    return results

@router.post("", response_model=CaseResponse)
def create_case(
    case_in: CaseCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    case_no = case_in.case_number or f"CASE-2026-{uuid.uuid4().hex[:4].upper()}"
    new_case = Case(
        case_number=case_no,
        title=case_in.title,
        classification=case_in.classification,
        status=case_in.status,
        priority=case_in.priority,
        description=case_in.description,
        risk_score=case_in.risk_score,
        lead_officer_id=case_in.lead_officer_id or current_user.id
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    # Audit
    audit = AuditLog(
        user_id=current_user.id,
        action="CASE_CREATED",
        entity_type="CASE",
        entity_id=str(new_case.id),
        details={"case_number": new_case.case_number, "title": new_case.title}
    )
    db.add(audit)
    db.commit()

    res = CaseResponse.from_orm(new_case)
    res.evidence_count = 0
    res.suspect_count = 0
    return res

@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    ev_count = db.query(Evidence).filter(Evidence.case_id == case.id).count()
    sp_count = db.query(Suspect).filter(Suspect.case_id == case.id).count()
    res = CaseResponse.from_orm(case)
    res.evidence_count = ev_count
    res.suspect_count = sp_count
    return res

@router.put("/{case_id}", response_model=CaseResponse)
def update_case(
    case_id: uuid.UUID,
    case_in: CaseUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    update_data = case_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(case, field, value)

    db.commit()
    db.refresh(case)

    audit = AuditLog(
        user_id=current_user.id,
        action="CASE_UPDATED",
        entity_type="CASE",
        entity_id=str(case.id),
        details=update_data
    )
    db.add(audit)
    db.commit()

    res = CaseResponse.from_orm(case)
    res.evidence_count = db.query(Evidence).filter(Evidence.case_id == case.id).count()
    res.suspect_count = db.query(Suspect).filter(Suspect.case_id == case.id).count()
    return res

@router.delete("/{case_id}")
def delete_case(
    case_id: uuid.UUID,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    db.delete(case)
    db.commit()

    audit = AuditLog(
        user_id=current_user.id,
        action="CASE_DELETED",
        entity_type="CASE",
        entity_id=str(case_id),
        details={"case_number": case.case_number}
    )
    db.add(audit)
    db.commit()

    return {"message": "Case deleted successfully", "id": str(case_id)}
