import type { LessonConfig } from "@/lib/types";

export const lesson1_7: LessonConfig = {
  id: "m1-1.7",
  title: "When Things Break",
  subtitle: "Build resilient API calls with retry logic",
  difficulty: 3,
  estimatedMinutes: 35,
  codieIntro: "I won't always answer on the first try. Servers get busy. Networks drop. Keys expire. Don't give up on me — just try again.",
  codieOutro: "I fell down. You picked me back up. That's resilience — for both of us.",
  xpReward: 50,
  steps: [
    { id: "m1-1.7-s1", order: 1, title: "Catch the Fall", description: "Wrap an API call in try/catch and log the error.", hints: ["Put the messages.create() call inside a try block."], codieDialogue: { before: "Things will break. Let's handle it gracefully." } },
    { id: "m1-1.7-s2", order: 2, title: "Know Your Enemy", description: "Check for Anthropic.APIError and read error.status.", hints: ["Use instanceof to check the error type."], codieDialogue: { before: "Not all errors are the same. Learn to identify them." } },
    { id: "m1-1.7-s3", order: 3, title: "Triage", description: "Implement isRetryable() for 429, 500, 529 errors.", hints: ["429 = rate limit, 500 = server error, 529 = overloaded."], codieDialogue: { before: "Some errors are worth retrying. Others aren't. Learn the difference." } },
    { id: "m1-1.7-s4", order: 4, title: "The Waiting Game", description: "Write a delay() helper with Promise + setTimeout.", hints: ["Return new Promise(resolve => setTimeout(resolve, ms))."], codieDialogue: { before: "Patience. Sometimes you just need to wait." } },
    { id: "m1-1.7-s5", order: 5, title: "Exponential Backoff", description: "Calculate wait time with Math.pow(2, attempt).", hints: ["Each retry waits twice as long as the last."], codieDialogue: { before: "Don't hammer the server. Back off exponentially." } },
    { id: "m1-1.7-s6", order: 6, title: "The Retry Loop", description: "Assemble the full retry loop with all pieces.", hints: ["For loop + try/catch + isRetryable check + backoff delay."], codieDialogue: { before: "Put it all together. A retry loop that never gives up (within reason)." } },
    { id: "m1-1.7-s7", order: 7, title: "Battle Scars", description: "Track retry statistics.", hints: ["Count total requests, retries, and failures."], codieDialogue: { before: "Track every attempt. Know your battle scars." } },
  ],
};
