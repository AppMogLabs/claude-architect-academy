"use client";

import type { TokenUsage } from "@/lib/types";

interface TokenMeterProps {
  readonly usage: TokenUsage;
}

export function TokenMeter({ usage }: TokenMeterProps) {
  const totalTokens = usage.inputTokens + usage.outputTokens;

  return (
    <div className="flex items-center gap-3 px-6 py-2 text-xs font-[family-name:var(--font-jetbrains)] border-t border-[#1a1a2e]/50 bg-[#0d1117]/30">
      {/* Model selector (disabled for MVP) */}
      <span className="text-gray-500">
        Model:{" "}
        <select
          disabled
          className="bg-transparent text-[#ffb000] border-none outline-none cursor-not-allowed appearance-none"
          value=""
        >
          <option value="">---</option>
          <option value="haiku">Haiku</option>
          <option value="sonnet">Sonnet</option>
          <option value="opus">Opus</option>
        </select>
      </span>
      <span className="text-[#1a1a2e]">|</span>
      <span className="text-gray-500">
        Tokens: <span className="text-[#00f0ff]">{totalTokens}</span>
      </span>
      <span className="text-[#1a1a2e]">|</span>
      <span className="text-gray-500">
        Cost: <span className="text-[#00ff41]">${usage.cost.toFixed(4)}</span>
      </span>
    </div>
  );
}
