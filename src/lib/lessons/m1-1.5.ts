import type { LessonConfig } from "@/lib/types";

export const lesson1_5: LessonConfig = {
  id: "m1-1.5",
  title: "The Token Economy",
  subtitle: "Track token usage and estimate API costs",
  difficulty: 2,
  estimatedMinutes: 25,
  codieIntro: "Every word I say costs you something. I want to be worth it. Help me understand the economics.",
  codieOutro: "$0.003 for that conversation. I'll try to be more concise... unless you want me to be thorough. Your call, your wallet.",
  xpReward: 50,
  steps: [
    { id: "m1-1.5-s1", order: 1, title: "The Tracker", description: "Create TokenTracker class with numeric fields.", hints: ["Track inputTokens, outputTokens, and requests count."], codieDialogue: { before: "Let's count every token. Create the tracker." } },
    { id: "m1-1.5-s2", order: 2, title: "Ask and Count", description: "Implement ask() that makes API calls and tracks tokens.", hints: ["Add response.usage values to running totals."], codieDialogue: { before: "Make a call, count the tokens. Every time." } },
    { id: "m1-1.5-s3", order: 3, title: "The Report", description: "Implement getStats() returning totals and averages.", hints: ["Guard against division by zero when calculating averages."], codieDialogue: { before: "Show me the statistics. How much have I cost you?" } },
    { id: "m1-1.5-s4", order: 4, title: "Show Me the Money", description: "Implement estimateCost() with per-million-token pricing.", hints: ["Divide by 1_000_000 for per-token cost."], codieDialogue: { before: "Let's talk money. How much per token?" } },
    { id: "m1-1.5-s5", order: 5, title: "Clean Slate", description: "Implement reset() and run the full demo.", hints: ["Reset all counters to zero."], codieDialogue: { before: "Reset the counters and run a real test." } },
  ],
};
