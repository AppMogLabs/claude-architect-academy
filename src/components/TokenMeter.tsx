"use client";

import type { TokenUsage } from "@/lib/types";

interface TokenMeterProps {
  readonly usage: TokenUsage;
}

export function TokenMeter({ usage }: TokenMeterProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-2 text-xs text-gray-500 font-[family-name:var(--font-jetbrains)] border-t border-[#1a1a2e]/50">
      <span>
        Model: <span className="text-[#ffb000]">{usage.model || "---"}</span>
      </span>
      <span className="text-[#1a1a2e]">|</span>
      <span>
        Tokens:{" "}
        <span className="text-[#00f0ff]">
          {usage.inputTokens + usage.outputTokens}
        </span>
      </span>
      <span className="text-[#1a1a2e]">|</span>
      <span>
        Cost: <span className="text-[#00ff41]">${usage.cost.toFixed(4)}</span>
      </span>
    </div>
  );
}
