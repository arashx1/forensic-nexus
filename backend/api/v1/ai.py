from fastapi import APIRouter
from backend.schemas import AICompletionRequest, AICompletionResponse
from backend.services.ai_provider import AIProviderFactory

router = APIRouter()

@router.post("/complete", response_model=AICompletionResponse)
def ai_completion(req: AICompletionRequest):
    provider = AIProviderFactory.get_provider(req.provider)
    return provider.generate_analysis(req)
