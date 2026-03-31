import type { StudentProgress } from "@/lib/types";

const STORAGE_KEY = "claude-architect-progress";

const defaultProgress: StudentProgress = {
  lessonProgress: {},
  xp: 0,
  rank: 0,
  completedLessons: [],
};

export function loadProgress(): StudentProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultProgress;
    }
    return JSON.parse(stored) as StudentProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: StudentProgress): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("progress-updated"));
}

export function completeStep(
  lessonId: string,
  stepId: string,
  stepXp: number
): StudentProgress {
  const progress = loadProgress();

  const lessonState = progress.lessonProgress[lessonId] ?? {
    currentStep: 0,
    completedSteps: [],
    startedAt: new Date().toISOString(),
  };

  if (lessonState.completedSteps.includes(stepId)) {
    return progress;
  }

  const updatedLessonState = {
    ...lessonState,
    completedSteps: [...lessonState.completedSteps, stepId],
    currentStep: lessonState.currentStep + 1,
  };

  const updated: StudentProgress = {
    ...progress,
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: updatedLessonState,
    },
    xp: progress.xp + stepXp,
  };

  saveProgress(updated);
  return updated;
}

export function completeLesson(
  lessonId: string,
  bonusXp: number
): StudentProgress {
  const progress = loadProgress();

  if (progress.completedLessons.includes(lessonId)) {
    return progress;
  }

  const lessonState = progress.lessonProgress[lessonId];
  const updatedLessonState = lessonState
    ? { ...lessonState, completedAt: new Date().toISOString() }
    : {
        currentStep: 0,
        completedSteps: [],
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };

  const updated: StudentProgress = {
    ...progress,
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: updatedLessonState,
    },
    completedLessons: [...progress.completedLessons, lessonId],
    xp: progress.xp + bonusXp,
  };

  saveProgress(updated);
  return updated;
}

export function isLessonUnlocked(
  lessonId: string,
  allLessonIds: readonly string[],
  completedLessons: readonly string[]
): boolean {
  const index = allLessonIds.indexOf(lessonId);
  if (index === 0) return true;
  if (index < 0) return false;
  return completedLessons.includes(allLessonIds[index - 1]);
}

export function getCurrentStep(lessonId: string): number {
  const progress = loadProgress();
  return progress.lessonProgress[lessonId]?.currentStep ?? 0;
}
