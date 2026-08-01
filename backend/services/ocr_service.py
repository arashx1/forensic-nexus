from abc import ABC, abstractmethod
from typing import Dict, Any
from uuid import UUID
from backend.schemas import OCRResponse

class BaseOCRService(ABC):
    @abstractmethod
    def extract_text(self, evidence_id: UUID, file_path: str, file_type: str) -> OCRResponse:
        pass

class MockOCRService(BaseOCRService):
    def extract_text(self, evidence_id: UUID, file_path: str, file_type: str) -> OCRResponse:
        extracted = (
            f"[OCR EXTRACTED FORENSIC TRANSCRIPT - FILE: {file_path}]\n"
            "CONFIDENTIAL DOCUMENT - CLASSIFIED LEVEL 4\n"
            "Subject: Wire Transfer Audit Trace #8849-B\n"
            "Source IP: 192.168.1.104 -> Target SWIFT: CHASEUS33XXX\n"
            "Amount: $4,500,000.00 USD\n"
            "Timestamp: 2026-07-28 14:22:01 UTC\n"
            "Beneficiary: Hydra International Holdings Ltd.\n"
            "Cryptographic Signature: SHA256-a94f8fe5ccb19ba61c4c0873d391e987982fbbd3"
        )
        entities = [
            {"type": "MONEY_AMOUNT", "val": "$4,500,000.00 USD"},
            {"type": "IP_ADDRESS", "val": "192.168.1.104"},
            {"type": "ORGANIZATION", "val": "Hydra International Holdings Ltd."},
            {"type": "SHA256_HASH", "val": "a94f8fe5ccb19ba61c4c0873d391e987982fbbd3"}
        ]
        return OCRResponse(
            provider="mock",
            evidence_id=evidence_id,
            status="COMPLETED",
            extracted_text=extracted,
            entities_detected=entities,
            confidence=0.96
        )

class GoogleVisionOCRService(BaseOCRService):
    def extract_text(self, evidence_id: UUID, file_path: str, file_type: str) -> OCRResponse:
        return OCRResponse(
            provider="google_vision",
            evidence_id=evidence_id,
            status="COMPLETED",
            extracted_text="[GOOGLE VISION OCR] Document text successfully recognized.",
            entities_detected=[],
            confidence=0.98
        )

class AzureVisionOCRService(BaseOCRService):
    def extract_text(self, evidence_id: UUID, file_path: str, file_type: str) -> OCRResponse:
        return OCRResponse(
            provider="azure_vision",
            evidence_id=evidence_id,
            status="COMPLETED",
            extracted_text="[AZURE COMPUTER VISION] Read API extraction complete.",
            entities_detected=[],
            confidence=0.97
        )

class TesseractOCRService(BaseOCRService):
    def extract_text(self, evidence_id: UUID, file_path: str, file_type: str) -> OCRResponse:
        return OCRResponse(
            provider="tesseract",
            evidence_id=evidence_id,
            status="COMPLETED",
            extracted_text="[TESSERACT OPEN SOURCE OCR] Local processing complete.",
            entities_detected=[],
            confidence=0.92
        )

class OpenAIVisionOCRService(BaseOCRService):
    def extract_text(self, evidence_id: UUID, file_path: str, file_type: str) -> OCRResponse:
        return OCRResponse(
            provider="openai_vision",
            evidence_id=evidence_id,
            status="COMPLETED",
            extracted_text="[OPENAI VISION OCR] Multimodal document parsing complete.",
            entities_detected=[],
            confidence=0.99
        )

class OCRServiceFactory:
    _services = {
        "mock": MockOCRService,
        "google_vision": GoogleVisionOCRService,
        "azure_vision": AzureVisionOCRService,
        "tesseract": TesseractOCRService,
        "openai_vision": OpenAIVisionOCRService
    }

    @classmethod
    def get_service(cls, name: str = "mock") -> BaseOCRService:
        service_cls = cls._services.get(name.lower(), MockOCRService)
        return service_cls()
