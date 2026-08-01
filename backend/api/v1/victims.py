import uuid
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.api import deps
from backend.models import Victim
from pydantic import BaseModel

router = APIRouter()

class VictimSchema(BaseModel):
    id: uuid.UUID
    case_id: uuid.UUID
    full_name: str
    contact_info: str = None
    statement_summary: str = None
    class Config:
        from_attributes = True

@router.get("", response_model=List[VictimSchema])
def list_victims(case_id: uuid.UUID = None, db: Session = Depends(deps.get_db)):
    query = db.query(Victim)
    if case_id:
        query = query.filter(Victim.case_id == case_id)
    return query.all()
