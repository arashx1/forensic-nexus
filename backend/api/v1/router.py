from fastapi import APIRouter
from backend.api.v1 import auth, cases, evidence, suspects, victims, audit, stats, ai, ocr

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(cases.router, prefix="/cases", tags=["Cases"])
api_router.include_router(evidence.router, prefix="/evidence", tags=["Evidence"])
api_router.include_router(suspects.router, prefix="/suspects", tags=["Suspects"])
api_router.include_router(victims.router, prefix="/victims", tags=["Victims"])
api_router.include_router(audit.router, prefix="/audit-logs", tags=["Audit Logs"])
api_router.include_router(stats.router, prefix="/stats", tags=["Statistics"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Provider Abstraction"])
api_router.include_router(ocr.router, prefix="/ocr", tags=["OCR Provider Abstraction"])
