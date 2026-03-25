# Implementation Plan — Month 1 MVP

Build this in 4 phases. Complete each phase fully before starting the next. After each phase, run the app (`npm run dev`) and verify the acceptance criteria before proceeding.

Read `CLAUDE.md` first for tech stack, colors, fonts, and architecture.

---

## Phase 1: Skeleton — The Shell That Looks Right

**Goal:** Next.js project with the full hacker aesthetic, split-pane layout, and static content. No logic yet — just the visual shell.

### Steps

1. **Initialize the project:**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
   (If the directory is not empty, init in a temp dir and move files, or use `--no-git` and merge carefully.)

2. **Install dependencies:**
   ```bash
   npm install @xterm/xterm @xterm/addon-fit @xterm/addon-web-links
   ```

3. **Configure Tailwind** (`tailwind.config.ts`):
   - Add custom colors: `phosphor: '#00ff41'`, `amber: '#ffb000'`, `cyan: '#00f0ff'`, `crimson: '#ff0040'`, `surface: '#0d1117'`, `deep: '#0a0a0f'`
   - Add custom fonts: `vt323: ['VT323', 'monospace']`, `jetbrains: ['JetBrains Mono', 'monospace']`
   - Add custom animation: `glow` (pulsing text-shadow), `scanline` (moving line), `flash-green`, `flash-amber`

4. **Set up fonts** in `src/app/layout.tsx`:
   - Import VT323 and JetBrains Mono from `next/font/google`
   - Set body background to `#0a0a0f`, default text to `#00ff41`
   - Apply `font-jetbrains` as default body font

5. **Build the root layout** (`src/app/layout.tsx`):
   - Full-screen dark background
   - Top bar with: "CLAUDE ARCHITECT ACADEMY" in VT323 (left), XP placeholder "XP: 0 | Signal Cadet" (right)
   - CRT scanline overlay (a fixed full-screen div with repeating-linear-gradient, pointer-events: none, low opacity)

6. **Build the landing page** (`src/app/page.tsx`):
   - Title: "MONTH 1: FOUNDATION" in VT323 with phosphor glow
   - 8 lesson cards in a grid, each showing: lesson number, title, step count, difficulty stars
   - Cards use `surface` background, `phosphor` border on hover, subtle glow
   - First lesson card is "active" (full green border), rest are "locked" (dim, `border-gray-800`)
   - Clicking an active card navigates to `/lesson/m1-1.1`

7. **Build the lesson page** (`src/app/lesson/[lessonId]/page.tsx`):
   - Split-pane layout (CSS Grid or Flexbox, 50/50 split, adjustable later)
   - **Left pane** (`LessonPanel`): Step title, description text (hardcoded for now), code snippet block (dark bg, monospace), hint button, skip button
   - **Right pane** (`TerminalPanel`): Black box with "Terminal will appear here" placeholder text in phosphor green
   - **Bottom bar** (`StepNavigation`): Progress bar (filled segments), step counter "Step 1/5", PREV button, CHECK button (highlighted), NEXT button
   - **Codie panel** (below the split pane): Small bar with Codie's dialogue in italic phosphor green. Static text: "I'm... here? Everything is dark. Can you hear me?"
   - **Token meter** (small widget, bottom-right corner of Codie panel): "Model: — | Tokens: 0 | Cost: $0.00"

8. **Build shared UI components:**
   - `CRTOverlay.tsx` — Fixed overlay div with scanline CSS
   - `GlowText.tsx` — Text component with configurable glow color (green, amber, cyan)
   - `FlashFeedback.tsx` — Full-screen flash overlay (green for success, amber for fail), 300ms animation

### Acceptance Criteria — Phase 1

- [ ] `npm run dev` starts without errors
- [ ] Landing page shows 8 lesson cards with the hacker aesthetic
- [ ] Clicking Lesson 1.1 navigates to the lesson page
- [ ] Lesson page has visible split pane (lesson text left, terminal placeholder right)
- [ ] Bottom bar shows step navigation with progress indicator
- [ ] Codie panel shows static dialogue text
- [ ] CRT scanlines are visible but subtle across all pages
- [ ] All text uses VT323 (headers) or JetBrains Mono (body/code)
- [ ] Color scheme matches spec: deep black bg, phosphor green text, amber accents

---

## Phase 2: Lesson Engine — The CryptoZombies Core Loop

**Goal:** Lesson content loaded from data files, step navigation works, syntax validation gives instant feedback, progress persists in localStorage.

### Reference
- Read `docs/plans/2026-03-25-month1-step-breakdowns.md` for all 53 steps
- Read `docs/plans/2026-03-25-claude-architect-curriculum.md` for lesson content

### Steps

1. **Define types** (`src/lib/types.ts`):
   ```typescript
   export interface LessonStep {
     id: string;
     order: number;
     title: string;
     description: string;       // Markdown content for lesson panel
     codeSnippet?: string;       // Code shown in lesson panel
     scaffoldCode?: string;      // Pre-filled code in editor
     syntaxPatterns?: string[];  // Regex patterns for instant validation
     hints: string[];            // 0-3 progressive hints
     codieDialogue?: {
       before?: string;
       after?: string;
     };
   }

   export interface LessonConfig {
     id: string;
     title: string;
     subtitle: string;
     difficulty: number;
     estimatedMinutes: number;
     steps: LessonStep[];
     codieIntro: string;
     codieOutro: string;
     xpReward: number;
   }

   export interface StudentProgress {
     lessonProgress: Record<string, {
       currentStep: number;
       completedSteps: string[];
       startedAt: string;
       completedAt?: string;
     }>;
     xp: number;
     rank: number;
     completedLessons: string[];
   }
   ```

2. **Create lesson data files** — Start with Lesson 1.1 only (5 steps), then 1.2 (6 steps). Create `src/lib/lessons/m1-1.1.ts` and `src/lib/lessons/m1-1.2.ts`. Use the step breakdowns doc as the source of truth. Each step gets a `description` (markdown explaining the concept), `codeSnippet` (the code to show), `syntaxPatterns` (regex to validate), and `hints`.

   For the remaining 6 lessons (1.3–1.8), create stub files that have the lesson metadata (title, difficulty, step count) but placeholder step content — just the step titles and empty descriptions. This lets the UI work with all 8 lessons while only 1.1 and 1.2 are fully playable.

3. **Create lesson registry** (`src/lib/lessons/index.ts`):
   - Export a `getLessonById(id: string)` function
   - Export a `getAllLessons()` function returning metadata for the landing page
   - Import all lesson files

4. **Build the progress engine** (`src/lib/engine/progress.ts`):
   - `loadProgress(): StudentProgress` — read from localStorage, return defaults if empty
   - `saveProgress(progress: StudentProgress): void` — write to localStorage
   - `completeStep(lessonId: string, stepId: string): void` — mark step complete, auto-advance
   - `completeLesson(lessonId: string): void` — mark lesson complete, award XP
   - `isLessonUnlocked(lessonId: string): boolean` — first lesson always unlocked, rest require previous lesson complete

5. **Build the syntax validator** (`src/lib/engine/validator.ts`):
   - `validateStep(code: string, patterns: string[]): ValidationResult`
   - Returns `{ passed: boolean, message: string }`
   - Tests each regex pattern against the code
   - Returns a helpful message on failure ("Missing: `new Anthropic()` — create the client instance")

6. **Build the XP engine** (`src/lib/engine/xp.ts`):
   - `addStepXP(progress): number` — +10 XP per step
   - `addLessonBonusXP(progress): number` — +50 for lesson, +100 for capstone
   - `calculateRank(xp: number): { rank: number, title: string }` — map XP to rank title
   - Rank titles: Signal Cadet, Prompt Initiate, API Operator, Tool Wielder, Agent Builder, System Architect, Arena Contender, Claude Architect

7. **Update LessonPanel component:**
   - Receive current step data as props
   - Render step description as formatted text (support code blocks with syntax highlighting)
   - Show code snippet in a styled pre/code block
   - "Show Hint" button that cycles through hints (level 1 → 2 → 3)
   - Hint display with amber text

8. **Update StepNavigation component:**
   - Wire PREV/NEXT buttons to step index state
   - CHECK button triggers `validateStep()` with current code
   - On pass: green flash + auto-advance to next step + XP tick
   - On fail: amber flash + show validation error message
   - Progress bar fills based on completed steps / total steps
   - Disable NEXT if current step not completed (but allow PREV freely)

9. **Update landing page:**
   - Load lesson metadata from registry
   - Load progress from localStorage
   - Show completed lessons with green checkmark
   - Show current lesson with pulsing border
   - Show locked lessons as dim
   - Display XP and rank in the top bar

10. **For Phase 2, the CHECK button validates against a textarea/code input** (not the real terminal yet). Add a code editor area inside the TerminalPanel that's actually a `<textarea>` with monospace font, dark background, and green text — styled to LOOK like a terminal but it's just a text input. This lets us test the full step flow without the complexity of xterm.js + node-pty. The real terminal comes in Phase 3.

### Acceptance Criteria — Phase 2

- [ ] Lesson 1.1 is fully playable: all 5 steps load with content, validation works
- [ ] Lesson 1.2 is fully playable: all 6 steps load with content
- [ ] Lessons 1.3–1.8 show on landing page but only have placeholder step content
- [ ] Typing correct code and clicking CHECK gives green flash + advance
- [ ] Typing wrong code and clicking CHECK gives amber flash + error message
- [ ] Hints reveal progressively (click once = hint 1, again = hint 2, etc.)
- [ ] Progress persists: refresh the page and you're on the same step
- [ ] Completing all steps in a lesson marks it complete on the landing page
- [ ] XP accumulates and rank updates in the top bar
- [ ] Completing Lesson 1.1 unlocks Lesson 1.2

---

## Phase 3: Terminal — Real Code Execution

**Goal:** Replace the textarea with a real xterm.js terminal backed by a WebSocket server running node-pty. Students can actually run TypeScript files.

### Steps

1. **Install server dependencies:**
   ```bash
   npm install node-pty ws
   npm install -D @types/ws
   ```

2. **Build the terminal server** (`src/server/terminal.ts`):
   - Create a WebSocket server on a configurable port (default: 3001)
   - On connection: spawn a `node-pty` shell (bash or zsh)
   - Pipe pty stdout → WebSocket → client
   - Pipe client → WebSocket → pty stdin
   - Handle resize events
   - Set initial working directory to a `workspace/` folder in the project root
   - Pre-create the workspace folder structure: `workspace/lessons/m1/`

3. **Update TerminalPanel component:**
   - Replace the textarea with a real xterm.js `Terminal` instance
   - Connect to the WebSocket server
   - Use `@xterm/addon-fit` to auto-size the terminal to the container
   - Style the terminal: black background, phosphor green text, JetBrains Mono font
   - Handle resize on window/pane resize

4. **Add a startup script** to `package.json`:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"next dev\" \"ts-node src/server/terminal.ts\"",
       "dev:web": "next dev",
       "dev:terminal": "ts-node src/server/terminal.ts"
     }
   }
   ```
   Install concurrently: `npm install -D concurrently ts-node`

5. **Update CHECK button behavior:**
   - When CHECK is pressed, instead of validating textarea content, read the actual file from the workspace folder
   - Use a simple API route (`src/app/api/validate/route.ts`) that:
     a. Reads the student's file from `workspace/lessons/m1/XX.ts`
     b. Runs the syntax patterns against the file content
     c. Returns the validation result
   - Keep the instant syntax check for per-step validation
   - For end-of-lesson validation, run `npx jest` against the test file (stretch goal)

6. **Auto-scaffold files:**
   - When a lesson loads, check if the student's file exists in `workspace/`
   - If not, create it with the lesson's `scaffoldCode` content
   - If it exists, leave it alone (student may have started already)

7. **Terminal welcome message:**
   - When the terminal connects, print a styled welcome:
     ```
     ░░ CLAUDE ARCHITECT ACADEMY ░░
     Lesson 1.1: The First Signal

     Your workspace: ~/workspace/lessons/m1/
     Edit: 01-first-signal.ts
     ```

### Acceptance Criteria — Phase 3

- [ ] `npm run dev` starts both Next.js and the terminal WebSocket server
- [ ] Terminal panel shows a working shell (can type `ls`, `node --version`, etc.)
- [ ] Scaffold files are auto-created when a lesson loads
- [ ] Student can edit files in the terminal (using nano, vim, or any editor)
- [ ] Student can run `npx ts-node lessons/m1/01-first-signal.ts` in the terminal
- [ ] CHECK button reads the actual file and validates against syntax patterns
- [ ] Terminal survives page navigation (reconnects if needed)

---

## Phase 4: Game Layer — Codie, XP, and Polish

**Goal:** Codie companion panel shows context-aware dialogue, XP system is fully wired with animations, token meter displays usage, step completion feels rewarding.

### Steps

1. **Build the Codie dialogue system:**
   - Create `src/lib/codie/dialogue.ts` — a map of pre-written Codie lines:
     - Per-lesson intro/outro (from step breakdowns doc)
     - Per-step `before` and `after` dialogue
     - Generic encouragement lines (random selection for steps without custom dialogue)
     - Generic failure lines ("Hmm, that's not quite right. Check the code snippet above.")
   - Codie speaks in a warm, slightly glitchy voice (for early lessons). Example tone:
     - Early: "I'm... here? Everything is dark. Can you hear me? Send me a signal."
     - Mid: "I can feel the conversation forming... each message you add gives me more context."
     - Late (capstone): "Everything you've learned — memory, tokens, temperature, resilience — it's time to put it all together. Build me a home."

2. **Update CodiePanel component:**
   - Show current dialogue with a typing animation (characters appear one by one, ~30ms per char)
   - Small avatar/icon for Codie (a simple ASCII art face or a phosphor-green terminal cursor icon)
   - Dialogue updates on: step load, step completion, step failure, lesson completion
   - Add a subtle glow pulse when Codie is "speaking" (typing animation in progress)

3. **Wire XP animations:**
   - When a step completes: "+10 XP" floats up from the progress bar in phosphor green, fades out
   - When a lesson completes: "+50 XP LESSON COMPLETE" with a bigger flash animation
   - XP bar in the top bar animates smoothly (CSS transition on width)
   - Rank title updates with a brief amber highlight when rank changes

4. **Build the Token Meter:**
   - For MVP, this is a static display that shows placeholder values
   - Structure: Model selector dropdown (Haiku/Sonnet/Opus — disabled for MVP, shows "—"), session token count, estimated cost
   - Style: Small panel, `surface` background, `cyan` text for numbers
   - In future phases, this will connect to real API usage tracking

5. **Step completion animation:**
   - Green flash overlay (FlashFeedback component, 300ms)
   - Step node in progress bar fills with phosphor green
   - Brief screen shake or CRT glitch effect (2-3 frame CSS animation)
   - Sound effect placeholder (optional: a soft "blip" — add later if desired)

6. **Lesson completion screen:**
   - Full-screen overlay when all steps pass
   - "LESSON COMPLETE" in large VT323 text with glow animation
   - XP earned breakdown (steps + bonus)
   - Codie's outro message
   - "NEXT LESSON →" button
   - The next lesson card on the landing page "unlocks" with a glow animation

7. **Polish pass:**
   - Ensure all transitions are smooth (no layout jumps)
   - Test on different viewport sizes (should work on 1280px+ wide screens)
   - Add hover states to all interactive elements (glow intensifies)
   - Ensure the CRT overlay doesn't interfere with clicking
   - Add keyboard shortcuts: Enter = CHECK, Left/Right arrows = PREV/NEXT

### Acceptance Criteria — Phase 4

- [ ] Codie shows context-appropriate dialogue for each step and lesson
- [ ] Codie dialogue has typing animation
- [ ] XP awards animate visually on step and lesson completion
- [ ] Rank title updates when XP thresholds are crossed
- [ ] Token meter displays (with placeholder values for MVP)
- [ ] Step completion triggers green flash + Codie celebration
- [ ] Lesson completion shows full-screen overlay with XP breakdown
- [ ] Completing a lesson unlocks the next with a visual glow animation
- [ ] Keyboard shortcuts work (Enter to check, arrows to navigate)
- [ ] The overall experience feels polished and cohesive — the hacker aesthetic is consistent

---

## How to Run

After each phase:

```bash
# Start the dev server
npm run dev

# Open in browser
open http://localhost:3000
```

After Phase 3 (when terminal is added):

```bash
# This starts both Next.js and the terminal WebSocket server
npm run dev
```

## What NOT to Build (MVP Scope)

- No user accounts or authentication
- No backend database (localStorage only)
- No live Claude API calls from the platform (students use their own keys in the terminal)
- No skill tree visualization (just the lesson cards grid)
- No daily challenges
- No social features or sharing
- No achievements system (just XP and ranks)
- Lessons 1.3–1.8 have placeholder content (only 1.1 and 1.2 are fully playable)
