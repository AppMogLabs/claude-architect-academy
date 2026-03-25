# Claude Architect Academy — Game Integration Brainstorm

**Date:** 2026-03-25
**Context:** How do we take our 48-lesson curriculum and make it feel like a game, not a course?
**Reference:** CryptoZombies, CodeCombat, CodinGame, SkillTree Platform

---

## Part 1: What CryptoZombies Actually Does (Reverse-Engineered)

After studying the live CryptoZombies site, here's the anatomy of their system:

### The CryptoZombies Formula

```
LESSON (e.g. "Making the Zombie Factory")
  └── 15 CHAPTERS per lesson
       └── Each chapter has:
            ├── LEFT PANE:  Lesson text (2-3 paragraphs)
            │                └── "Put it to the test" micro-challenge
            ├── RIGHT PANE: Code editor (pre-filled scaffold)
            │                └── "Check Answer" button
            └── VISUAL:     Zombie character updates live as you code
```

**Key mechanics that make it work:**

1. **Micro-chapters, not lessons.** Each "chapter" teaches ONE concept and requires ONE small code change. A lesson has ~15 of these. You never feel stuck because the scope is tiny — add one line, modify one function, declare one variable.

2. **The scaffold does 90% of the work.** The editor comes pre-filled with code. You're only writing 1-5 lines. This removes the blank-page anxiety that kills beginners.

3. **Visual feedback loop.** As you build a Zombie Factory in Solidity, a zombie character visually updates on screen. The code *creates something visible*. This is the dopamine hook.

4. **Narrative through-line.** You're not "learning Solidity." You're "building a zombie army." Every concept is justified by the game fiction: "Your zombie needs DNA, so you need to learn about structs."

5. **Chapter counter creates momentum.** "Chapter 4/15" — you see the finish line. Completion is always close. This is the progress bar effect.

6. **No wrong answers, only "not yet."** The "Check Answer" button gives feedback and lets you retry. There's no penalty. The lesson text often contains 90% of the answer.

7. **Lesson completion = unlock.** Finishing Lesson 1 unlocks Lesson 2. Completing all 6 core lessons unlocks advanced tracks. This is gated progression.

### What CryptoZombies Does NOT Do

- No XP or points system
- No leaderboard (until the game portion)
- No timed challenges
- No branching paths
- No hints system (the lesson text IS the hint)
- No real terminal — it's a browser code editor with validation

---

## Part 2: What We Should Steal (And What We Should Kill)

### STEAL: The Micro-Chapter Pattern

**CryptoZombies insight:** Each of our 8 lessons per month is too large for a CryptoZombies-style flow. A 30-minute lesson with full starter code, tests, and hints is great for a motivated developer, but it's not *addictive*.

**Proposal: Break each lesson into 5-8 "steps" (our version of chapters).**

```
MONTH 1: Foundation
  └── LESSON 1.1: The First Signal (currently 1 big challenge)
       └── Step 1: "Install the SDK"     → npm install @anthropic-ai/sdk ✓
       └── Step 2: "Import the client"    → Write the import line ✓
       └── Step 3: "Create the client"    → const client = new Anthropic() ✓
       └── Step 4: "Make the call"        → Write messages.create() ✓
       └── Step 5: "Read the response"    → Extract response.content[0].text ✓
       └── Step 6: "Run it"              → Execute and see Claude respond ✓
```

Each step takes 2-3 minutes. The whole lesson still takes 20 minutes, but it FEELS like 6 accomplishments instead of 1 grind.

**Total content map: 48 lessons × ~6 steps = ~288 micro-steps across the academy.**

### STEAL: Visual Feedback (Our Equivalent)

CryptoZombies has a zombie that updates visually. We don't have a zombie. But we have something better: **Claude's actual responses appear in real-time in the terminal.**

**Proposal: The "Agent Preview Panel"**

The right side of the screen isn't just a code editor — it's a **live terminal** that shows the output of your code. When you complete a step:
- Month 1-2: Claude's text response appears (satisfying — you made an AI talk)
- Month 3: Tool calls light up (you see Claude *doing things*)
- Month 4: Your app comes alive (a real web server starts)
- Month 5: Multiple agents communicate (message logs scroll)
- Month 6: Your agent competes (live scoring appears)

The visual reward escalates with the curriculum. Early on, it's "Claude said hello." By Month 6, it's "Your agent outscored 73% of submissions."

### STEAL: Narrative Through-Line

CryptoZombies: "You're building a zombie army."

**Proposal: "You're raising an AI companion named Codie."**

Codie starts as a dumb terminal echo in Lesson 1.1 — glitchy, confused, barely able to string a sentence together. By the end of Month 6, Codie is a sharp, capable multi-agent system that you built from scratch. The name is endearing on purpose — this is your pet project, literally. The narrative thread:

| Month | Codie Evolution | Narrative Hook |
|-------|----------------|----------------|
| 1 | "First Contact" | Codie wakes up. Can barely speak. You teach it to respond. |
| 2 | "Gaining Senses" | Codie learns to see structure in data. You give it eyes. |
| 3 | "Hands and Feet" | Codie can now use tools. It can reach out and affect the world. |
| 4 | "Into the Wild" | Codie ships. Real users interact with your creation. |
| 5 | "The Collective" | Codie learns to work with other agents. It's not alone anymore. |
| 6 | "The Arena" | Codie competes. Prove it's the best. |

Each lesson has a brief narrative intro that frames the concept in Codie's story: *"Codie has been responding to questions, but it forgets everything the moment you close the terminal. Today, you give it memory."* (Lesson 1.4: Memory Palace)

### STEAL: Gated Progression (With a Twist)

CryptoZombies gates lessons sequentially. That's fine for beginners but limiting.

**Proposal: Hybrid Skill Tree**

```
Month 1 ────────> Month 2 ────────> Month 3 ─┬─> Month 4 (Ship)
(Foundation)      (API Mastery)     (Agents)  │
                                              └─> Month 5 (Architecture)
                                                       │
                                                       └─> Month 6 (Agent Wars)
```

- Months 1-3 are linear (you need the foundations)
- After Month 3, you CHOOSE: Ship a product (Month 4) or go deep on architecture (Month 5)
- Month 6 requires completing EITHER Month 4 or 5

Displayed as a **hexagonal skill tree** with neon connections (matching the PRD aesthetic). Locked nodes pulse dimly. Unlocked nodes glow phosphor green. Completed nodes show a CRT-style checkmark.

### KILL: No Browser Code Editor

CryptoZombies uses a browser-based Solidity editor. That makes sense for Solidity (no local toolchain). It does NOT make sense for us.

**Our students are building real Node.js/TypeScript apps.** The code needs to actually run, make real API calls, and produce real output. A sandboxed browser editor would be a toy.

**Proposal: The Embedded Terminal IS the Editor**

The xterm.js terminal in our UI is the real deal. Students write code in their actual local files (or in our guided file system), and the terminal runs it. The UI wraps around the terminal:

```
┌─────────────────────────────────────────────────────────┐
│ ╔══ STEP 3/6: Create the Client ═══════════════════╗    │
│ ║                                                    ║    │
│ ║  The Anthropic constructor reads your API key     ║    │
│ ║  from the ANTHROPIC_API_KEY environment variable. ║    │
│ ║                                                    ║    │
│ ║  Add this line to your file:                      ║    │
│ ║  ┌──────────────────────────────────────┐         ║    │
│ ║  │ const client = new Anthropic();      │         ║    │
│ ║  └──────────────────────────────────────┘         ║    │
│ ║                                                    ║    │
│ ║  [Show Hint]  [Skip Step]                         ║    │
│ ╚════════════════════════════════════════════════════╝    │
│                                                           │
│ ┌─── TERMINAL ──────────────────────────────────────┐    │
│ │ ghost> cat lessons/m1/01-first-signal.ts          │    │
│ │ import Anthropic from "@anthropic-ai/sdk";        │    │
│ │ const client = new Anthropic(); █                  │    │
│ │                                                    │    │
│ │                                                    │    │
│ └────────────────────────────────────────────────────┘    │
│                                                           │
│  [◀ PREV]  ██████░░░░ 3/6  [CHECK ▶]  [NEXT ▶▶]        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

The "CHECK" button runs the Jest test for the current step. Pass = green flash + advance. Fail = amber error + retry.

---

## Part 3: New Mechanics (Beyond CryptoZombies)

CryptoZombies is brilliant but it's also 2018 design. Here are mechanics we should add that they don't have:

### 3A. The XP & Rank System

Every completed step earns XP. XP accumulates into ranks:

| XP Range | Rank | Title | Unlocks |
|----------|------|-------|---------|
| 0-100 | 1 | Signal Cadet | Nothing (you just started) |
| 100-300 | 2 | Prompt Initiate | Custom terminal themes |
| 300-600 | 3 | API Operator | Access to Month 2 |
| 600-1000 | 4 | Tool Wielder | Access to Month 3 |
| 1000-1500 | 5 | Agent Builder | Access to Month 4 OR 5 |
| 1500-2200 | 6 | System Architect | Access to Month 6 |
| 2200-3000 | 7 | Arena Contender | Agent Wars leaderboard |
| 3000+ | 8 | Claude Architect | Completion badge + certificate |

XP sources:
- Complete a step: **+10 XP**
- Complete a lesson (all steps): **+50 XP bonus**
- Complete a capstone: **+100 XP bonus**
- Pass all tests on first try: **+20 XP bonus** ("Perfect Run")
- Complete a lesson under par time: **+30 XP bonus** ("Speed Demon")
- Streak bonus: 3+ days in a row → **1.5x multiplier**

### 3B. The Agent Companion (Codie)

The narrative agent isn't just a story device — it's a **persistent AI character** that evolves with you.

**How it works technically:**
- Codie is a system-prompted Claude instance with a character persona
- Its personality and capabilities change as you progress
- Early on, Codie is glitchy and minimal (few system prompt instructions)
- As you complete lessons, Codie "upgrades" (the system prompt expands)
- By Month 6, Codie is a full-featured assistant that reflects everything you've built

**Codie interactions:**
- Greets you when you open the app
- Comments on your progress ("You've been gone 3 days. I... forgot things while you were away." → Lesson 1.4 hook)
- Celebrates completions with personality
- Can answer questions about concepts you've already learned (but not future ones — "I haven't learned that yet. Maybe you could teach me?")

**Model selection (learning tool):**
- Once students have their API key, they choose which model powers Codie (Haiku/Sonnet/Opus)
- They can switch anytime and see how responses differ — this is itself educational
- Haiku: fast, cheap, sometimes less nuanced. Sonnet: balanced. Opus: thorough but expensive.
- The **token usage panel** (always visible in the UI) shows real-time cost for every Codie interaction
- This teaches cost awareness naturally: "Oh, Opus gave a better answer but cost 10x more. When does that tradeoff make sense?"

This makes the learning feel like a relationship, not a syllabus — and the model switcher turns Codie into a hands-on economics lab.

### 3C. The Achievement System

Achievements are rare, surprising, and shareable.

**Concept achievements:**
- 🔰 "Hello World" — Complete your first API call
- 🧠 "Memory Upgrade" — Give Codie persistent memory
- 🔧 "Toolsmith" — Create your first custom tool
- 🚀 "Shipped It" — Deploy your first product
- 🤖 "Hivemind" — Run a multi-agent system
- ⚔️ "Arena Ready" — Enter Agent Wars

**Behavioral achievements (hidden until earned):**
- 🌙 "Night Owl" — Complete a lesson after midnight
- ⚡ "Speed Run" — Complete Lesson 1.1 in under 5 minutes
- 🔥 "On Fire" — 7-day completion streak
- 💀 "Unbreakable" — Complete Lesson 1.7 (error handling) with zero test failures
- 🎯 "Perfect Month" — Complete all 8 lessons in a month with all tests passing first try
- 🔮 "Prophet" — Use a concept from a future lesson in the current one (detected via code analysis)

**Display:** Achievements render as CRT-style badges on the user's profile — phosphor green icons with scanline effects. Shareable to Twitter/X with generated OG images.

### 3D. The Daily Challenge System

Beyond the curriculum, offer daily standalone challenges:

- **"Prompt of the Day"** — A single prompt engineering challenge. Write the best system prompt for a given task. Scored by a judge Claude.
- **"Bug Hunt"** — A broken code snippet. Find and fix the bug. Timed.
- **"Token Golf"** — Accomplish a task using the fewest possible tokens. Leaderboard.

These keep students engaged between lessons and build skills orthogonally to the main curriculum.

### 3E. The Social Layer

- **Global progress map** — Anonymous aggregate showing how many students are at each lesson. "You're in the top 12% of Month 3."
- **Share cards** — Generated images showing lesson completion, achievements, or agent stats. Designed for Twitter/X.
- **Agent Wars leaderboard** — Month 6 is competitive. Public rankings with usernames.
- **Study groups** — Optional Discord/Telegram integration for cohort-based learning.

---

## Part 4: Technical Architecture for Game Mechanics

### Data Model

```typescript
interface StudentProfile {
  id: string;
  username: string;
  rank: number;
  xp: number;
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string; // ISO date
  };
  progress: {
    [lessonId: string]: {
      steps: StepStatus[];  // per-step completion
      startedAt: string;
      completedAt?: string;
      attempts: number;      // for "Perfect Run" detection
      timeSpent: number;     // milliseconds
    };
  };
  achievements: Achievement[];
  codieState: {
    personality: string;    // evolves with progress
    capabilities: string[]; // unlocked features
    conversationCount: number;
    selectedModel: "claude-haiku-4-5" | "claude-sonnet-4-5" | "claude-opus-4"; // user picks
  };
  tokenUsage: {
    totalTokensSpent: number;
    totalCostUSD: number;
    sessionTokens: number;
    sessionCostUSD: number;
    byModel: Record<string, { tokens: number; cost: number }>;
  };
  config: {
    theme: string;
    terminalFont: string;
  };
}

interface StepStatus {
  stepId: string;
  status: "locked" | "active" | "completed" | "skipped";
  completedAt?: string;
  firstTryPass: boolean;
}

interface Achievement {
  id: string;
  unlockedAt: string;
  shared: boolean; // whether they've shared to social
}
```

### Where State Lives

Since the PRD specifies **local-first, no backend required**, all state lives in `localStorage` + local JSON files:

```
~/.claude-academy/
├── profile.json          # StudentProfile
├── history/
│   ├── m1-lesson1.json   # Per-lesson conversation/attempt history
│   └── ...
├── achievements.json     # Unlocked achievements
├── agent/
│   └── argos-state.json  # Codie personality and memory
└── daily/
    └── 2026-03-25.json   # Daily challenge state
```

For the **social features** (leaderboard, global progress), we'd need a lightweight backend — but it can be optional. The core experience works fully offline.

### Step Validation Engine

Each step needs a validation function (lighter than full Jest):

```typescript
interface StepValidator {
  stepId: string;
  lessonId: string;

  // Quick check: does the code contain expected patterns?
  syntaxCheck: (code: string) => ValidationResult;

  // Deep check: does the code actually work?
  runtimeCheck: () => Promise<ValidationResult>;
}

interface ValidationResult {
  passed: boolean;
  message: string;      // "Great! The client is ready." or "Hmm, you need to import Anthropic first."
  hint?: string;         // Progressive hint if failed
}
```

The **syntaxCheck** is instant (regex/AST parsing — does the file contain `new Anthropic()`?). The **runtimeCheck** runs the actual code (or Jest test). This two-tier approach means:
- Syntax check gives instant feedback (green/amber flash)
- Runtime check confirms it actually works (runs in background)

---

## Part 5: The Layout — Split-Pane Academy UI

```
┌──────────────────────────────────────────────────────────────────┐
│ ░░ CLAUDE ARCHITECT ACADEMY ░░     Rank: Tool Wielder   XP: 847 │
│ ═══════════════════════════════════════════════════════════════════│
│                                                                    │
│  ┌── LESSON PANEL ────────────┐  ┌── TERMINAL PANEL ───────────┐ │
│  │                             │  │                              │ │
│  │  § 1.3 The Conversation    │  │  $ ts-node 03-loop.ts       │ │
│  │    Loop                     │  │                              │ │
│  │                             │  │  Claude Chat (type "exit")  │ │
│  │  ─────────────────────     │  │                              │ │
│  │  Step 4 of 6:              │  │  you> Hello Claude           │ │
│  │  "Push the response"       │  │                              │ │
│  │                             │  │  claude> Hello! How can I   │ │
│  │  After getting Claude's    │  │  help you today?             │ │
│  │  response, add it to the   │  │                              │ │
│  │  messages array so the     │  │  you> █                      │ │
│  │  next call has context.    │  │                              │ │
│  │                             │  │                              │ │
│  │  ┌─────────────────────┐   │  │                              │ │
│  │  │ this.messages.push( │   │  │                              │ │
│  │  │   { role: "assis... │   │  │                              │ │
│  │  └─────────────────────┘   │  │                              │ │
│  │                             │  │                              │ │
│  │  [💡 Hint 1/3] [⏭ Skip]   │  │                              │ │
│  │                             │  │                              │ │
│  └─────────────────────────────┘  └──────────────────────────────┘ │
│                                                                    │
│  ┌── PROGRESS BAR ──────────────────────────────────────────────┐ │
│  │ ████████████░░░░░░░░  Step 4/6    [◀ PREV] [✓ CHECK] [▶ NEXT] │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌── Codie ─────────────────────────────┐  ┌── TOKEN METER ─────┐ │
│  │ > "I can feel the conversation        │  │ Model: Sonnet 4    │ │
│  │   forming... each message you add     │  │ Session: 1,247 tkn │ │
│  │   gives me more context. Keep going." │  │ Cost:   $0.0089    │ │
│  │                        [Change Model] │  │ ████████░░ 62% cap │ │
│  └───────────────────────────────────────┘  └────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## Part 6: Implementation Priority (What to Build First)

### Phase 1: Core Loop (MVP — 2 weeks)
1. Step-based lesson engine (break Lesson 1.1 into 6 steps)
2. Split-pane UI (lesson text left, terminal right)
3. Step validation (syntax check + Jest runner)
4. Progress persistence (localStorage)
5. Step navigation (prev/next/check)

### Phase 2: Game Layer (2 weeks)
1. XP system + rank display
2. Achievement detection + display
3. Codie companion (basic system prompt that evolves)
4. Skill tree visualization (hexagonal, neon)
5. Completion animations (CRT flash effects)

### Phase 3: Social & Polish (2 weeks)
1. Share cards (OG image generation)
2. Daily challenges
3. Global progress (optional backend)
4. Agent Wars leaderboard infrastructure
5. Terminal themes (unlockable)

### Phase 4: Content (Ongoing)
1. Break all 48 lessons into micro-steps (~288 total)
2. Write step-by-step validators for each
3. Write Codie dialogue for each lesson
4. Write achievement trigger conditions
5. Design daily challenge rotation

---

## Part 7: Decisions (Resolved 2026-03-25)

1. **How many steps per lesson?** → **Variable per lesson.** Steps should match the natural rhythm of the content — not forced into a fixed count. Simple concept lessons might have 3-4 steps. Capstones might have 10-12. The engine supports any number.

2. **Should steps be file-based or diff-based?** → **Progressive reduction of scaffolding.** Early lessons (Month 1-2) pre-fill heavily — students modify specific lines. By Month 3-4, scaffolding thins out. By Month 5-6, students write from scratch. The goal is to match learning objectives, not a fixed format.

3. **Codie: how smart?** → **Hybrid, with user-controlled model selection.** Pre-written responses for lesson-specific guidance (cheap, instant). Once the student has their API key working, Codie switches to live Claude calls. The student picks which model Codie uses (Haiku/Sonnet/Opus) and can change it anytime — this itself becomes a learning tool ("see how Opus answers differently than Haiku"). A **token usage panel** is always visible, showing real-time spend on Codie interactions. This makes cost awareness a natural part of the experience, not an afterthought.

4. **Offline-first or optional-online?** → **Offline-first with online enhancement.** The curriculum, lesson content, validators, and progress tracking all work with zero internet. Codie and daily challenges require API calls, but the app degrades gracefully: offline Codie shows pre-written responses, daily challenges are disabled with a clear message. This ensures the product works for students on planes, trains, or in regions with unreliable internet.

5. **Assessment rigor.** → **Two-tier validation.** Lightweight pattern-match for instant step feedback (did they write the right line? → 500ms syntax check, green flash). Full Jest suite at lesson completion to confirm real understanding. Students get dopamine from quick step wins, plus rigor from proper end-of-lesson testing.

6. **Competition format.** → **Triple-score system.** Agent Wars (Month 6) scores on all three dimensions: speed (response latency), token efficiency (cost per task), and output quality (judged by Claude). Final score is a weighted composite. This ensures there's no single "meta" — students must balance competing concerns, just like in production.

---

## Summary: The Formula

```
CryptoZombies magic     +  Terminal-native UX    +  AI companion     +  Cost transparency
(micro-steps,              (xterm.js, real code,     (Codie evolves      (live token meter,
 visual feedback,           Jest validation,          with you,           model switching,
 narrative thread,          split-pane layout)        user picks model)   learn by spending)
 gated progression)
                         =  Claude Architect Academy
```

The core insight: **CryptoZombies works because every 2 minutes, you succeed at something.** We need to engineer that same cadence. Break every lesson into steps — as many as the content naturally requires. Make every step feel like a win. Let the terminal light up green. Let Codie celebrate. Let the XP counter tick up. Let the skill tree glow. Let the token meter show exactly what it cost.

Ship this and people won't just learn Claude — they'll get addicted to building with it.
