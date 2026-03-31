"use client";

import type { LessonStep } from "@/lib/types";
import { GlowText } from "@/components/ui/GlowText";
import { useState, useEffect } from "react";

interface LessonPanelProps {
  readonly step: LessonStep;
  readonly stepIndex: number;
  readonly totalSteps: number;
}

export function LessonPanel({ step, stepIndex, totalSteps }: LessonPanelProps) {
  const [hintLevel, setHintLevel] = useState(0);

  // Reset hint level when step changes
  useEffect(() => {
    setHintLevel(0);
  }, [step.id]);

  const showNextHint = () => {
    setHintLevel((prev) => Math.min(prev + 1, step.hints.length));
  };

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

      {step.codeSnippet && (
        <pre className="bg-[#0d1117] border border-[#1a1a2e] rounded-md p-4 mb-4 text-sm overflow-x-auto">
          <code className="text-[#00f0ff]">{step.codeSnippet}</code>
        </pre>
      )}

      {/* Progressive hints */}
      <div className="mt-auto">
        {hintLevel > 0 && (
          <div className="space-y-2 mb-3">
            {step.hints.slice(0, hintLevel).map((hint, i) => (
              <div
                key={i}
                className="bg-[#0d1117] border border-[#ffb000]/30 rounded-md p-3 text-sm text-[#ffb000]"
              >
                <span className="text-[#ffb000]/50 mr-2">HINT {i + 1}:</span>
                {hint}
              </div>
            ))}
          </div>
        )}

        {step.hints.length > 0 && hintLevel < step.hints.length && (
          <button
            onClick={showNextHint}
            className="text-sm text-[#ffb000]/60 hover:text-[#ffb000] transition-colors font-[family-name:var(--font-vt323)]"
          >
            [ {hintLevel === 0 ? "SHOW HINT" : "NEXT HINT"} ({hintLevel + 1}/{step.hints.length}) ]
          </button>
        )}
      </div>
    </div>
  );
}
