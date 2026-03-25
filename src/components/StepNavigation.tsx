"use client";

interface StepNavigationProps {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly onPrev: () => void;
  readonly onCheck: () => void;
  readonly onNext: () => void;
  readonly canGoPrev: boolean;
  readonly canGoNext: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrev,
  onCheck,
  onNext,
  canGoPrev,
  canGoNext,
}: StepNavigationProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 bg-[#0d1117] border-t border-[#1a1a2e]">
      {/* Progress bar */}
      <div className="flex gap-1 flex-1">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentStep
                ? "bg-[#00ff41]"
                : i === currentStep
                  ? "bg-[#ffb000]"
                  : "bg-[#1a1a2e]"
            }`}
          />
        ))}
      </div>

      {/* Step counter */}
      <span className="text-xs text-gray-500 font-[family-name:var(--font-vt323)] min-w-[60px] text-center">
        {currentStep + 1}/{totalSteps}
      </span>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className="px-3 py-1.5 text-sm font-[family-name:var(--font-vt323)] border border-[#1a1a2e] text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
        >
          PREV
        </button>
        <button
          onClick={onCheck}
          className="px-4 py-1.5 text-sm font-[family-name:var(--font-vt323)] bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/20 transition-colors rounded glow-green"
        >
          CHECK
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="px-3 py-1.5 text-sm font-[family-name:var(--font-vt323)] border border-[#1a1a2e] text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
