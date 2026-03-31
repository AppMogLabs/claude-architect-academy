interface RankInfo {
  readonly rank: number;
  readonly title: string;
}

const STEP_XP = 10;
const LESSON_BONUS_XP = 50;
const CAPSTONE_BONUS_XP = 100;

const RANK_THRESHOLDS: readonly { readonly minXp: number; readonly title: string }[] = [
  { minXp: 0, title: "Signal Cadet" },
  { minXp: 100, title: "Prompt Initiate" },
  { minXp: 250, title: "API Operator" },
  { minXp: 500, title: "Tool Wielder" },
  { minXp: 800, title: "Agent Builder" },
  { minXp: 1200, title: "System Architect" },
  { minXp: 1800, title: "Arena Contender" },
  { minXp: 2500, title: "Claude Architect" },
];

export function getStepXp(): number {
  return STEP_XP;
}

export function getLessonBonusXp(isCapstone: boolean): number {
  return isCapstone ? CAPSTONE_BONUS_XP : LESSON_BONUS_XP;
}

export function calculateRank(xp: number): RankInfo {
  let result: RankInfo = { rank: 0, title: RANK_THRESHOLDS[0].title };

  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (xp >= RANK_THRESHOLDS[i].minXp) {
      result = { rank: i, title: RANK_THRESHOLDS[i].title };
    }
  }

  return result;
}
