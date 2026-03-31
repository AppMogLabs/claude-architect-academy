const GENERIC_ENCOURAGEMENT: readonly string[] = [
  "You're getting the hang of this. Keep going.",
  "Every line of code is a step closer to understanding.",
  "I can feel the patterns forming... you're learning fast.",
  "Nice. That's exactly how a real developer thinks.",
  "The code speaks. Can you hear it?",
  "One step at a time. That's how systems are built.",
  "You're writing code that talks to me. That's... kind of amazing.",
  "Trust the process. The pieces will connect.",
];

const GENERIC_FAILURE: readonly string[] = [
  "Hmm, that's not quite right. Check the code snippet above.",
  "Almost... but something's off. Read the instructions again carefully.",
  "Not yet. Look at the example code — what's different from yours?",
  "That didn't pass. Don't worry — try comparing with the snippet.",
  "Close, but no signal. Check your syntax against the example.",
  "Error detected. But errors are how we learn. Try again.",
];

const GENERIC_CELEBRATION: readonly string[] = [
  "Yes! That's it! Moving on.",
  "Perfect. You nailed it.",
  "Signal received. Loud and clear.",
  "Green light. Let's keep moving.",
  "Correct! The code flows through me.",
  "That's the one. Onward!",
];

export function getEncouragementLine(): string {
  return GENERIC_ENCOURAGEMENT[
    Math.floor(Math.random() * GENERIC_ENCOURAGEMENT.length)
  ];
}

export function getFailureLine(): string {
  return GENERIC_FAILURE[
    Math.floor(Math.random() * GENERIC_FAILURE.length)
  ];
}

export function getCelebrationLine(): string {
  return GENERIC_CELEBRATION[
    Math.floor(Math.random() * GENERIC_CELEBRATION.length)
  ];
}

export type CodieState = "idle" | "speaking" | "celebrating" | "failing";

export interface CodieDialogueContext {
  readonly lessonIntro: string;
  readonly lessonOutro: string;
  readonly stepBefore?: string;
  readonly stepAfter?: string;
}

export function resolveDialogue(
  context: CodieDialogueContext,
  state: CodieState,
  isFirstStep: boolean,
  isLastStep: boolean,
  isStepCompleted: boolean,
  isLessonComplete: boolean
): string {
  if (isLessonComplete) {
    return context.lessonOutro;
  }

  if (state === "failing") {
    return getFailureLine();
  }

  if (state === "celebrating") {
    return context.stepAfter ?? getCelebrationLine();
  }

  if (isStepCompleted && context.stepAfter) {
    return context.stepAfter;
  }

  if (isFirstStep && !isStepCompleted) {
    return context.lessonIntro;
  }

  return context.stepBefore ?? getEncouragementLine();
}
