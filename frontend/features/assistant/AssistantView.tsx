"use client";
import React, { useState } from "react";
import { Bot, Send, Cpu, Sparkles, User, RefreshCcw } from "lucide-react";
import { ChatMessage } from "@/types/assistant";
import { AIProviderService, AIProviderType } from "@/services/aiProvider";
import { Button } from "@/components/ui/button";

export const AssistantView: React.FC = () => {
  const [provider, setProvider] = useState<AIProviderType>("claude");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      content: "Forensic Nexus Copilot online. I am equipped with live memory models, multi-case correlation context, and cryptographic hash verification. How can I assist your investigation?",
      timestamp: new Date().toLocaleTimeString(),
      provider: "claude",
      model: "claude-3-5-sonnet"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const aiRes = await AIProviderService.analyze({
      provider,
      prompt: input
    });

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: "assistant",
      content: aiRes.content,
      timestamp: new Date().toLocaleTimeString(),
      provider: aiRes.provider,
      model: aiRes.model
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyber-purple" /> AI Investigation Assistant & Copilot
          </h1>
          <p className="text-xs text-cyber-muted">Multimodal threat chat powered by AI Provider Abstraction Layer</p>
        </div>

        {/* AI Provider Switcher */}
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyber-cyan" />
          <span className="text-xs font-mono text-cyber-muted">Active Engine:</span>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as AIProviderType)}
            className="bg-cyber-card border border-cyber-border rounded-lg px-3 py-1.5 text-xs font-mono text-cyber-cyan focus:border-cyber-cyan outline-none"
          >
            <option value="claude">Claude 3.5 Sonnet (Recommended)</option>
            <option value="openai">OpenAI GPT-4o</option>
            <option value="gemini">Google Gemini 1.5 Pro</option>
            <option value="deepseek">DeepSeek R1 Distill</option>
            <option value="llama">Llama 3.3 70B (On-Prem)</option>
            <option value="local">Local Sovereign GPU Enclave</option>
          </select>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="glass-panel rounded-2xl border border-cyber-border p-6 flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-tr from-cyber-cyan to-cyber-blue text-cyber-bg"
                    : "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  msg.sender === "user"
                    ? "bg-cyber-surface border border-cyber-border text-white"
                    : "bg-cyber-card border border-cyber-cyan/30 text-cyber-text"
                }`}
              >
                {msg.provider && (
                  <div className="text-[10px] font-mono text-cyber-cyan flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3 h-3" /> {msg.model || msg.provider}
                  </div>
                )}
                <div className="whitespace-pre-wrap font-mono">{msg.content}</div>
                <div className="text-[10px] text-cyber-muted text-right">{msg.timestamp}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Prompt Box */}
        <form onSubmit={handleSend} className="pt-4 border-t border-cyber-border/80 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Copilot to correlate threat indicators, analyze SHA-256 hashes, or generate case summaries..."
            className="flex-1 bg-cyber-card border border-cyber-border rounded-xl px-4 py-3 text-xs text-white placeholder:text-cyber-muted/60 outline-none focus:border-cyber-cyan"
          />
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Send Prompt <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
