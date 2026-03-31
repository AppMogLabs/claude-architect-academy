export interface LessonStep {
  readonly id: string;
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly codeSnippet?: string;
  readonly scaffoldCode?: string;
  readonly syntaxPatterns?: readonly string[];
  readonly hints: readonly string[];
  readonly codieDialogue?: {
    readonly before?: string;
    readonly after?: string;
  };
}

export interface LessonConfig {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly difficulty: 1 | 2 | 3 | 4 | 5;
  readonly estimatedMinutes: number;
  readonly steps: readonly LessonStep[];
  readonly codieIntro: string;
  readonly codieOutro: string;
  readonly xpReward: number;
  readonly workspaceFile?: string;
}

export interface StudentProgress {
  readonly lessonProgress: Record<string, {
    readonly currentStep: number;
    readonly completedSteps: readonly string[];
    readonly startedAt: string;
    readonly completedAt?: string;
  }>;
  readonly xp: number;
  readonly rank: number;
  readonly completedLessons: readonly string[];
}

export interface ValidationResult {
  readonly passed: boolean;
  readonly message: string;
}

export interface TokenUsage {
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly cost: number;
}

export type FlashType = "success" | "error" | null;
export type GlowColor = "green" | "amber" | "cyan";
