"use client";

import { use, useState, useCallback, useEffect, useRef } from "react";
import { getLessonById, getAllLessonIds } from "@/lib/lessons";
import { LessonPanel } from "@/components/LessonPanel";
import { TerminalPanel } from "@/components/TerminalPanel";
import { StepNavigation } from "@/components/StepNavigation";
import { CodiePanel } from "@/components/CodiePanel";
import { TokenMeter } from "@/components/TokenMeter";
import { FlashFeedback } from "@/components/ui/FlashFeedback";
import { XPFloat } from "@/components/XPFloat";
import { LessonCompleteOverlay } from "@/components/LessonCompleteOverlay";
import {
  loadProgress,
  completeStep,
  completeLesson,
  getCurrentStep,
} from "@/lib/engine/progress";
import { getStepXp, getLessonBonusXp } from "@/lib/engine/xp";
import { resolveDialogue, type CodieState } from "@/lib/codie/dialogue";
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
  const allLessonIds = getAllLessonIds();

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<ReadonlySet<string>>(new Set());
  const [flash, setFlash] = useState<FlashType>(null);
  const [validationError, setValidationError] = useState<string>("");
  const [initialized, setInitialized] = useState(false);
  const [codieState, setCodieState] = useState<CodieState>("idle");
  const [xpFloatTrigger, setXpFloatTrigger] = useState(0);
  const [xpFloatAmount, setXpFloatAmount] = useState(0);
  const [xpFloatIsLesson, setXpFloatIsLesson] = useState(false);
  const [showLessonComplete, setShowLessonComplete] = useState(false);
  const [shaking, setShaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (!lesson) return;
    const savedStep = getCurrentStep(lessonId);
    const progress = loadProgress();
    const lessonState = progress.lessonProgress[lessonId];
    const completed = new Set(lessonState?.completedSteps ?? []);

    setCurrentStep(Math.min(savedStep, lesson.steps.length - 1));
    setCompletedSteps(completed);
    setInitialized(true);
  }, [lessonId, lesson]);

  // Scaffold workspace file when lesson loads
  useEffect(() => {
    if (!lesson || !initialized || !lesson.workspaceFile) return;

    const scaffoldContent = lesson.steps[0]?.scaffoldCode ?? "";

    fetch("/api/scaffold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filePath: lesson.workspaceFile,
        content: scaffoldContent,
      }),
    }).catch(() => {});
  }, [lesson, initialized]);

  // Reset codie state and validation error when step changes
  useEffect(() => {
    setValidationError("");
    setCodieState("idle");
  }, [currentStep]);

  // Keyboard shortcuts — only active when focus is NOT inside the terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Don't capture when typing in an input, textarea, or the xterm terminal
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest(".xterm")
      ) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleCheck();
      } else if (e.key === "ArrowLeft" && currentStep > 0) {
        e.preventDefault();
        setCurrentStep((s) => Math.max(0, s - 1));
      } else if (e.key === "ArrowRight" && lesson) {
        const step = lesson.steps[currentStep];
        if (
          currentStep < lesson.steps.length - 1 &&
          completedSteps.has(step.id)
        ) {
          e.preventDefault();
          setCurrentStep((s) => Math.min(lesson.steps.length - 1, s + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const triggerFlash = useCallback((type: "success" | "error") => {
    setFlash(type);
    setTimeout(() => setFlash(null), 300);
  }, []);

  const triggerShake = useCallback(() => {
    setShaking(true);
    setTimeout(() => setShaking(false), 150);
  }, []);

  const triggerXpFloat = useCallback(
    (amount: number, isLesson: boolean) => {
      setXpFloatAmount(amount);
      setXpFloatIsLesson(isLesson);
      setXpFloatTrigger((t) => t + 1);
    },
    []
  );

  const handleStepComplete = useCallback(
    (stepId: string) => {
      if (!lesson) return;

      const isNew = !completedSteps.has(stepId);

      if (isNew) {
        const updated = completeStep(lessonId, stepId, getStepXp());
        setCompletedSteps(
          new Set(updated.lessonProgress[lessonId]?.completedSteps ?? [])
        );
        triggerXpFloat(getStepXp(), false);
      }

      // Celebrate briefly
      setCodieState("celebrating");
      triggerShake();
      setTimeout(() => setCodieState("idle"), 1500);

      // Auto-advance or lesson complete
      if (currentStep < lesson.steps.length - 1) {
        setTimeout(() => setCurrentStep((s) => s + 1), 600);
      } else {
        // Final step — complete lesson
        const isCapstone = lesson.id === "m1-1.8";
        const bonusXp = getLessonBonusXp(isCapstone);
        completeLesson(lessonId, bonusXp);

        setTimeout(() => {
          triggerXpFloat(bonusXp, true);
          setShowLessonComplete(true);
        }, 800);
      }
    },
    [lesson, currentStep, completedSteps, lessonId, triggerXpFloat, triggerShake]
  );

  const handleCheck = useCallback(async () => {
    if (!lesson) return;

    const step = lesson.steps[currentStep];

    // Steps without syntax patterns auto-pass
    if (!step.syntaxPatterns || step.syntaxPatterns.length === 0) {
      triggerFlash("success");
      setValidationError("");
      handleStepComplete(step.id);
      return;
    }

    // If lesson has a workspace file, validate from the actual file
    if (lesson.workspaceFile) {
      try {
        const res = await fetch("/api/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filePath: lesson.workspaceFile,
            patterns: step.syntaxPatterns,
          }),
        });

        const result = await res.json();

        if (result.passed) {
          triggerFlash("success");
          setValidationError("");
          handleStepComplete(step.id);
        } else {
          triggerFlash("error");
          setValidationError(result.message);
          setCodieState("failing");
          setTimeout(() => setCodieState("idle"), 2000);
        }
      } catch {
        triggerFlash("error");
        setValidationError("Could not validate — is the file saved?");
        setCodieState("failing");
        setTimeout(() => setCodieState("idle"), 2000);
      }
      return;
    }

    // Fallback: auto-pass for lessons without workspace files
    triggerFlash("success");
    setValidationError("");
    handleStepComplete(step.id);
  }, [lesson, currentStep, lessonId, triggerFlash, handleStepComplete]);

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
  const isStepCompleted = completedSteps.has(step.id);
  const isLessonDone = lesson.steps.every((s) => completedSteps.has(s.id));

  // Resolve Codie dialogue
  const codieText = resolveDialogue(
    {
      lessonIntro: lesson.codieIntro,
      lessonOutro: lesson.codieOutro,
      stepBefore: step.codieDialogue?.before,
      stepAfter: step.codieDialogue?.after,
    },
    codieState,
    currentStep === 0,
    currentStep === totalSteps - 1,
    isStepCompleted,
    isLessonDone
  );

  // Find next lesson ID
  const currentLessonIndex = allLessonIds.indexOf(lessonId);
  const nextLessonId =
    currentLessonIndex >= 0 && currentLessonIndex < allLessonIds.length - 1
      ? allLessonIds[currentLessonIndex + 1]
      : undefined;

  return (
    <div
      ref={containerRef}
      className={`flex-1 flex flex-col min-h-0 ${shaking ? "animate-step-shake" : ""}`}
    >
      <FlashFeedback type={flash} />
      <XPFloat
        trigger={xpFloatTrigger}
        amount={xpFloatAmount}
        isLesson={xpFloatIsLesson}
      />

      {showLessonComplete && (
        <LessonCompleteOverlay
          lessonTitle={lesson.title}
          stepXpTotal={totalSteps * getStepXp()}
          bonusXp={getLessonBonusXp(lesson.id === "m1-1.8")}
          codieOutro={lesson.codieOutro}
          nextLessonId={nextLessonId}
          onDismiss={() => setShowLessonComplete(false)}
        />
      )}

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
          <TerminalPanel
            lessonId={lessonId}
            lessonTitle={lesson.title}
            workspaceFile={lesson.workspaceFile}
            validationError={validationError}
          />
        </div>
      </div>

      {/* Bottom: Navigation */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        completedSteps={completedSteps}
        stepIds={lesson.steps.map((s) => s.id)}
        onPrev={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onCheck={handleCheck}
        onNext={() => setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))}
        canGoPrev={currentStep > 0}
        canGoNext={currentStep < totalSteps - 1 && isStepCompleted}
      />

      {/* Codie dialogue */}
      <CodiePanel dialogue={codieText} state={codieState} />

      {/* Token meter */}
      <TokenMeter usage={defaultTokenUsage} />
    </div>
  );
}
