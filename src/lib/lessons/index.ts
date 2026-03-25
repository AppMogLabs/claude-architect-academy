import { Lesson, LessonSummary } from "@/lib/types";
import { lesson1_1 } from "./m1-1.1";

const allLessons: readonly Lesson[] = [lesson1_1];

const lessonSummaries: readonly LessonSummary[] = [
  {
    id: "m1-1.1",
    title: "First Contact",
    description: "Install the SDK and make your first API call to Claude.",
    stepCount: 6,
    difficulty: 1,
    isUnlocked: true,
  },
  {
    id: "m1-1.2",
    title: "Prompt Engineering 101",
    description: "Learn how prompt structure affects Claude's responses.",
    stepCount: 7,
    difficulty: 1,
    isUnlocked: false,
  },
  {
    id: "m1-1.3",
    title: "System Prompts",
    description: "Control Claude's persona and behavior with system prompts.",
    stepCount: 6,
    difficulty: 2,
    isUnlocked: false,
  },
  {
    id: "m1-1.4",
    title: "Multi-turn Conversations",
    description: "Build context-aware conversations with message history.",
    stepCount: 8,
    difficulty: 2,
    isUnlocked: false,
  },
  {
    id: "m1-1.5",
    title: "Streaming Responses",
    description: "Stream Claude's responses token-by-token for real-time UX.",
    stepCount: 6,
    difficulty: 2,
    isUnlocked: false,
  },
  {
    id: "m1-1.6",
    title: "Temperature & Parameters",
    description: "Fine-tune output with temperature, top_p, and max_tokens.",
    stepCount: 7,
    difficulty: 3,
    isUnlocked: false,
  },
  {
    id: "m1-1.7",
    title: "Error Handling",
    description: "Build resilient apps that handle rate limits and failures.",
    stepCount: 7,
    difficulty: 3,
    isUnlocked: false,
  },
  {
    id: "m1-1.8",
    title: "Cost Optimization",
    description: "Minimize API costs while maximizing output quality.",
    stepCount: 6,
    difficulty: 3,
    isUnlocked: false,
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((lesson) => lesson.id === id);
}

export function getAllLessonSummaries(): readonly LessonSummary[] {
  return lessonSummaries;
}
