import type { LessonConfig } from "@/lib/types";
import { lesson1_1 } from "./m1-1.1";
import { lesson1_2 } from "./m1-1.2";
import { lesson1_3 } from "./m1-1.3";
import { lesson1_4 } from "./m1-1.4";
import { lesson1_5 } from "./m1-1.5";
import { lesson1_6 } from "./m1-1.6";
import { lesson1_7 } from "./m1-1.7";
import { lesson1_8 } from "./m1-1.8";

const allLessons: readonly LessonConfig[] = [
  lesson1_1,
  lesson1_2,
  lesson1_3,
  lesson1_4,
  lesson1_5,
  lesson1_6,
  lesson1_7,
  lesson1_8,
];

const allLessonIds: readonly string[] = allLessons.map((l) => l.id);

export function getLessonById(id: string): LessonConfig | undefined {
  return allLessons.find((lesson) => lesson.id === id);
}

export function getAllLessons(): readonly LessonConfig[] {
  return allLessons;
}

export function getAllLessonIds(): readonly string[] {
  return allLessonIds;
}

export interface LessonSummary {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly stepCount: number;
  readonly difficulty: 1 | 2 | 3 | 4 | 5;
  readonly estimatedMinutes: number;
  readonly xpReward: number;
}

export function getAllLessonSummaries(): readonly LessonSummary[] {
  return allLessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    stepCount: lesson.steps.length,
    difficulty: lesson.difficulty,
    estimatedMinutes: lesson.estimatedMinutes,
    xpReward: lesson.xpReward,
  }));
}
