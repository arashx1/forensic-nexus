import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api import deps
from backend.models import Suspect, AuditLog, User
from pydantic import BaseModel

router = APIRouter()

class SuspectSchema(BaseModel):
    id: uuid.UUID
    case_id: uuid.UUID
    full_name: str
    risk_level: str
    biography: str = None
    class Config:
        from_attributes = True

@router.get("", response_model=List[SuspectSchema])
def list_suspects(case_id: uuid.UUID = None, db: Session = Depends(deps.get_db)):
    query = db.query(Suspect)
    if case_id:
        query = query.filter(Suspect.case_id == case_id)
    return query.all()
