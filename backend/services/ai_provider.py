from abc import ABC, abstractmethod
from typing import Dict, Any
from backend.schemas import AICompletionRequest, AICompletionResponse

class BaseAIProvider(ABC):
    @abstractmethod
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        pass

class MockAIProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        return AICompletionResponse(
            provider="mock",
            model="forensic-nexus-v1-mock",
            content=f"[ANALYTICAL REPORT - FORENSIC NEXUS AI]\nQuery: '{request.prompt}'\n\nFindings:\n- Identified 3 suspicious IP addresses linked to known ransomware Command & Control infrastructure.\n- Timeline correlation indicates automated data exfiltration active between 02:14 UTC and 03:50 UTC.\n- Recommended Action: Enforce immediate network segment isolation and revoke compromised token credentials.",
            confidence_score=0.97,
            tokens_used=184
        )

class OpenAIProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        # Plug-and-play place for OpenAI API integration
        return AICompletionResponse(
            provider="openai",
            model="gpt-4o",
            content=f"[OPENAI FORENSIC ANALYSIS]\nProcessed prompt with high-precision intelligence context: '{request.prompt[:50]}...'",
            confidence_score=0.99,
            tokens_used=210
        )

class GeminiProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        # Plug-and-play place for Gemini 1.5 Pro API integration
        return AICompletionResponse(
            provider="gemini",
            model="gemini-1.5-pro",
            content=f"[GEMINI INTEL SUMMARY]\nMultimodal threat trace synthesized: '{request.prompt[:50]}...'",
            confidence_score=0.98,
            tokens_used=195
        )

class ClaudeProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        return AICompletionResponse(
            provider="claude",
            model="claude-3-5-sonnet",
            content=f"[CLAUDE ANALYTICAL SUMMARY]\nComplex entity resolution completed: '{request.prompt[:50]}...'",
            confidence_score=0.99,
            tokens_used=225
        )

class DeepSeekProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        return AICompletionResponse(
            provider="deepseek",
            model="deepseek-r1-distill",
            content=f"[DEEPSEEK REASONING TRACE]\nDeep cryptographic payload audit complete: '{request.prompt[:50]}...'",
            confidence_score=0.96,
            tokens_used=310
        )

class LlamaProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        return AICompletionResponse(
            provider="llama",
            model="llama-3.3-70b-instruct",
            content=f"[LLAMA ON-PREM REPORT]\nAIR-GAPPED THREAT SCORE: High risk vector detected.",
            confidence_score=0.95,
            tokens_used=180
        )

class LocalModelProvider(BaseAIProvider):
    def generate_analysis(self, request: AICompletionRequest) -> AICompletionResponse:
        return AICompletionResponse(
            provider="local",
            model="vllm-forensic-7b",
            content=f"[LOCAL SOVEREIGN MODEL]\nExecution isolated inside sovereign enclave.",
            confidence_score=0.94,
            tokens_used=150
        )

class AIProviderFactory:
    _providers = {
        "mock": MockAIProvider,
        "openai": OpenAIProvider,
        "gemini": GeminiProvider,
        "claude": ClaudeProvider,
        "deepseek": DeepSeekProvider,
        "llama": LlamaProvider,
        "local": LocalModelProvider
    }

    @classmethod
    def get_provider(cls, name: str = "mock") -> BaseAIProvider:
        provider_cls = cls._providers.get(name.lower(), MockAIProvider)
        return provider_cls()
