export interface Step {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly instruction: string;
  readonly codeSnippet?: string;
  readonly hint?: string;
  readonly codieDialogue: string;
  readonly validationType: "syntax" | "runtime" | "none";
  readonly validationPattern?: string;
  readonly xpReward: number;
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly month: number;
  readonly lessonNumber: number;
  readonly difficulty: 1 | 2 | 3 | 4 | 5;
  readonly steps: readonly Step[];
}

export interface LessonSummary {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly stepCount: number;
  readonly difficulty: 1 | 2 | 3 | 4 | 5;
  readonly isUnlocked: boolean;
}

export interface UserProgress {
  readonly lessonId: string;
  readonly currentStep: number;
  readonly completedSteps: readonly number[];
  readonly xpEarned: number;
}

export interface TokenUsage {
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly cost: number;
}

export type FlashType = "success" | "error" | null;
export type GlowColor = "green" | "amber" | "cyan";
