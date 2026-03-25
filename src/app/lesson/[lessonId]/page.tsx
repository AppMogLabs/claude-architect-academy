"use client";

import { use, useState, useCallback } from "react";
import { getLessonById } from "@/lib/lessons";
import { LessonPanel } from "@/components/LessonPanel";
import { TerminalPanel } from "@/components/TerminalPanel";
import { StepNavigation } from "@/components/StepNavigation";
import { CodiePanel } from "@/components/CodiePanel";
import { TokenMeter } from "@/components/TokenMeter";
import { FlashFeedback } from "@/components/ui/FlashFeedback";
import type { FlashType, TokenUsage } from "@/lib/types";

interface LessonPageProps {
  readonly params: Promise<{ lessonId: string }>;
}

const defaultTokenUsage: TokenUsage = {
  model: "",
  inputTokens: 0,
  outputTokens: 0,
  cost: 0,
};

export default function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = use(params);
  const lesson = getLessonById(lessonId);
  const [currentStep, setCurrentStep] = useState(0);
  const [flash, setFlash] = useState<FlashType>(null);

  const triggerFlash = useCallback((type: "success" | "error") => {
    setFlash(type);
    setTimeout(() => setFlash(null), 300);
  }, []);

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[#ff0040] font-[family-name:var(--font-vt323)] text-xl">
          LESSON NOT FOUND: {lessonId}
        </p>
      </div>
    );
  }

  const step = lesson.steps[currentStep];
  const totalSteps = lesson.steps.length;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <FlashFeedback type={flash} />

      {/* Split pane */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Lesson content */}
        <div className="w-1/2 overflow-y-auto border-r border-[#1a1a2e]">
          <LessonPanel
            step={step}
            stepIndex={currentStep}
            totalSteps={totalSteps}
          />
        </div>

        {/* Right: Terminal */}
        <div className="w-1/2">
          <TerminalPanel />
        </div>
      </div>

      {/* Bottom: Navigation */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrev={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onCheck={() => triggerFlash("success")}
        onNext={() => setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))}
        canGoPrev={currentStep > 0}
        canGoNext={currentStep < totalSteps - 1}
      />

      {/* Codie dialogue */}
      <CodiePanel dialogue={step.codieDialogue} />

      {/* Token meter */}
      <TokenMeter usage={defaultTokenUsage} />
    </div>
  );
}
