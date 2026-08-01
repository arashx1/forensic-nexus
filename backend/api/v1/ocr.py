from fastapi import APIRouter
from backend.schemas import OCRRequest, OCRResponse
from backend.services.ocr_service import OCRServiceFactory

router = APIRouter()

@router.post("/process", response_model=OCRResponse)
def process_ocr(req: OCRRequest):
    service = OCRServiceFactory.get_service(req.provider)
    return service.extract_text(req.evidence_id, "simulated_evidence_file.pdf", "application/pdf")
