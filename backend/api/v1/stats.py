from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.api import deps
from backend.models import Case, Evidence, Suspect, AuditLog

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(deps.get_db)):
    total_cases = db.query(Case).count()
    active_cases = db.query(Case).filter(Case.status.in_(["OPEN", "IN_PROGRESS"])).count()
    total_evidence = db.query(Evidence).count()
    high_risk_suspects = db.query(Suspect).filter(Suspect.risk_level == "HIGH").count()
    
    return {
        "total_cases": total_cases,
        "active_cases": active_cases,
        "total_evidence": total_evidence,
        "high_risk_suspects": high_risk_suspects,
        "chain_of_custody_integrity": 99.8,
        "ai_threat_index": "ELEVATED"
    }
