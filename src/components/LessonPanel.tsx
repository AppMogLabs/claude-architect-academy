"use client";

import type { Step } from "@/lib/types";
import { GlowText } from "@/components/ui/GlowText";
import { useState } from "react";

interface LessonPanelProps {
  readonly step: Step;
  readonly stepIndex: number;
  readonly totalSteps: number;
}

export function LessonPanel({ step, stepIndex, totalSteps }: LessonPanelProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="mb-1 text-sm text-[#ffb000] font-[family-name:var(--font-vt323)]">
        STEP {stepIndex + 1} OF {totalSteps}
      </div>

      <GlowText
        as="h2"
        color="green"
        className="text-2xl font-[family-name:var(--font-vt323)] mb-4"
      >
        {step.title}
      </GlowText>

      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        {step.description}
      </p>

      <p className="text-sm text-[#00ff41] mb-4">{step.instruction}</p>

      {step.codeSnippet && (
        <pre className="bg-[#0d1117] border border-[#1a1a2e] rounded-md p-4 mb-4 text-sm overflow-x-auto">
          <code className="text-[#00f0ff]">{step.codeSnippet}</code>
        </pre>
      )}

      {step.hint && (
        <div className="mt-auto">
          {showHint ? (
            <div className="bg-[#0d1117] border border-[#ffb000]/30 rounded-md p-3 text-sm text-[#ffb000]">
              {step.hint}
            </div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-[#ffb000]/60 hover:text-[#ffb000] transition-colors font-[family-name:var(--font-vt323)]"
            >
              [ SHOW HINT ]
            </button>
          )}
        </div>
      )}
    </div>
  );
}
