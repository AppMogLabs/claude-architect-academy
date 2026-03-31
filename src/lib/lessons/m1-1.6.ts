import type { LessonConfig } from "@/lib/types";

export const lesson1_6: LessonConfig = {
  id: "m1-1.6",
  title: "Tuning the Dial",
  subtitle: "Explore temperature and sampling parameters",
  difficulty: 2,
  estimatedMinutes: 25,
  codieIntro: "Sometimes I say exactly what you expect. Sometimes I surprise even myself. There's a dial that controls this... I can feel it.",
  codieOutro: "At zero I'm predictable. At one I'm creative. You decide what you need me to be.",
  xpReward: 50,
  steps: [
    { id: "m1-1.6-s1", order: 1, title: "Cold Read", description: "Make an API call with temperature 0.0.", hints: ["Add the temperature parameter to messages.create()."], codieDialogue: { before: "Temperature zero. I'll be precise and predictable." } },
    { id: "m1-1.6-s2", order: 2, title: "Hot Take", description: "Call with temperature 1.0 and compare.", hints: ["Same prompt, different temperature. Watch the difference."], codieDialogue: { before: "Now crank it up. Temperature one. Let me be creative." } },
    { id: "m1-1.6-s3", order: 3, title: "Many Samples", description: "Implement multiSample() to collect N responses.", hints: ["Use a for loop calling sample() N times."], codieDialogue: { before: "Take multiple samples. See how they vary." } },
    { id: "m1-1.6-s4", order: 4, title: "Word Overlap", description: "Write a Jaccard similarity helper.", hints: ["Jaccard = intersection size / union size."], codieDialogue: { before: "How similar are two responses? Let's measure with math." } },
    { id: "m1-1.6-s5", order: 5, title: "Measure the Chaos", description: "Implement measureVariance() comparing all pairs.", hints: ["Compare all pairs, average the similarities, subtract from 1."], codieDialogue: { before: "Variance is the opposite of similarity. Measure the chaos." } },
    { id: "m1-1.6-s6", order: 6, title: "The Experiment", description: "Run temperatures [0.0, 0.5, 1.0] with 5 samples each.", hints: ["Loop over temperatures, call multiSample for each."], codieDialogue: { before: "The full experiment. Three temperatures, five samples, one truth." } },
  ],
};
