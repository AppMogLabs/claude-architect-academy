# Implementation Plan: Claude Architect Academy — MVP

**Date:** 2026-03-25  
**Author:** Argos  
**Estimated Cost:** ~$5.00 (Tier 1 autonomous)

---

## Phase Overview (Curriculum-Driven)

**Note:** Curriculum is designed first (by Opus). Platform is built to support the actual curriculum content.

| Phase | Task | Duration | Cost | Dependencies |
|-------|------|----------|------|--------------|
| 0 | **Design 6-Month Curriculum** | 2 days | $2.00 | None |
| 1 | Write Month 1 Lessons (8 lessons + tests) | 2 days | $2.00 | Phase 0 |
| 2 | Scaffold Next.js + Design System | 1 day | $0.50 | Phase 1 |
| 3 | Build Local Daemon | 1 day | $1.00 | Phase 1 |
| 4 | Create Globe Component | 1 day | $0.75 | Phase 2 |
| 5 | Build Lesson Cards + Terminal | 1 day | $1.00 | Phase 1, 3 |
| 6 | Skill Tree + Progress | 1 day | $0.75 | Phase 2 |

---

## Phase 1: Scaffold Next.js + Design System

**Objective:** Set up the project structure with the retro-futuristic design system

### Tasks
1. Initialize Next.js 14 with TypeScript, Tailwind, static export
2. Install dependencies: xterm.js, three.js, zustand, @types/node
3. Create global CSS with CRT effects, scanlines, phosphor glow
4. Set up Tailwind config with custom colors (phosphor green, amber, cyan)
5. Create base layout with retro terminal aesthetic
6. Add VT323 and JetBrains Mono fonts

### Deliverables
- `apps/web/` — Next.js application
- `packages/daemon/` — Daemon package structure
- Global styles with CRT effects
- Tailwind config with custom theme

### Verification
```bash
cd apps/web && npm run build
# Should complete with no errors
```

---

## Phase 2: Build Local Daemon

**Objective:** Create the Node.js daemon for local code execution

### Tasks
1. Set up TypeScript project with WebSocket server
2. Implement terminal session management (node-pty)
3. Create file system watcher (chokidar)
4. Build test runner integration (Jest API)
5. Add sandboxed code execution (vm2)
6. Implement WebSocket message handlers

### Deliverables
- `packages/daemon/src/server.ts` — WebSocket server
- `packages/daemon/src/terminal.ts` — PTY management
- `packages/daemon/src/tester.ts` — Test runner
- `packages/daemon/src/sandbox.ts` — Code sandbox

### Verification
```bash
cd packages/daemon && npm test
# 80%+ coverage
```

---

## Phase 3: Create Globe Component

**Objective:** Build the spinning wireframe globe for learning journey visualization

### Tasks
1. Set up Three.js scene with camera, renderer
2. Create wireframe sphere geometry
3. Add 6 continent markers (hexagonal prisms)
4. Implement rotation animation
5. Add click handlers for continent selection
6. Style with phosphor green glow effects
7. Add hover states (amber pulse for current)

### Deliverables
- `apps/web/components/Globe.tsx` — Three.js globe
- `apps/web/components/ContinentMarker.tsx` — Individual markers
- `apps/web/hooks/useGlobe.ts` — Globe state management

### Verification
- Globe renders at 60fps
- Clicking continent triggers selection event
- Visual states match design (green/amber/dimmed)

---

## Phase 4: Build Lesson Cards + Terminal

**Objective:** Create expandable lesson cards with embedded CRT terminal

### Tasks
1. Build LessonCard component with brutalist styling
2. Implement expand/collapse with glitch transition
3. Integrate xterm.js with custom CRT theme
4. Connect terminal to daemon WebSocket
5. Add lesson content markdown renderer
6. Create test validation UI
7. Add hint system (3 progressive levels)

### Deliverables
- `apps/web/components/LessonCard.tsx` — Expandable card
- `apps/web/components/Terminal.tsx` — xterm.js wrapper
- `apps/web/components/LessonContent.tsx` — Markdown renderer
- `apps/web/components/TestResults.tsx` — Validation UI

### Verification
- Terminal accepts input and shows output
- WebSocket connects to daemon
- Tests run and display results

---

## Phase 5: Skill Tree + Progress

**Objective:** Build hexagonal skill tree with progress tracking

### Tasks
1. Create hexagonal grid layout (CSS Grid)
2. Build SkillNode component with states
3. Add SVG connection lines between nodes
4. Implement progress store (Zustand)
5. Add localStorage persistence
6. Create progress export/import
7. Animate node unlocks

### Deliverables
- `apps/web/components/SkillTree.tsx` — Tree container
- `apps/web/components/SkillNode.tsx` — Individual nodes
- `apps/web/store/progress.ts` — Zustand store
- `apps/web/lib/persistence.ts` — localStorage helpers

### Verification
- Progress saves and restores
- Node states update correctly
- Animations play smoothly

---

## Phase 6: Month 1 Curriculum

**Objective:** Write the first month's lessons with tests

### Tasks
1. Create lesson format specification
2. Write Lesson 1.1: "Your First API Call"
3. Write Lesson 1.2: "Understanding Context Windows"
4. Write Lesson 1.3: "Prompt Engineering Basics"
5. Write Lesson 1.4: "Building a Simple Chatbot"
6. Create test files for each lesson
7. Write setup instructions

### Deliverables
- `curriculum/month-01/` — 4 lessons
- `curriculum/month-01/lesson-01/` — Content + tests
- `curriculum/month-01/lesson-02/` — Content + tests
- `curriculum/month-01/lesson-03/` — Content + tests
- `curriculum/month-01/lesson-04/` — Content + tests

### Verification
- All tests pass
- Lessons render correctly
- Terminal exercises work end-to-end

---

## Implementation Order (Curriculum-Driven)

```
Week 1:
  Day 1-2: Phase 0 (Curriculum Design - Opus)
  Day 3-4: Phase 1 (Month 1 Lessons - detailed content)
  
Week 2:
  Day 5: Phase 2 (Scaffold - based on lesson requirements)
  Day 6: Phase 3 (Daemon - based on lesson requirements)
  
Week 3:
  Day 7: Phase 4 (Globe)
  Day 8: Phase 5 (Cards + Terminal - must render actual lessons)
  
Week 4:
  Day 9: Phase 6 (Skill Tree)
  Buffer: Test with real Month 1 lessons, iterate
```

**Key Principle:** Platform features are built only after curriculum requirements are known. No speculative features.

---

## Spawn Commands

### Phase 0: Curriculum Design (Opus)
```
sessions_spawn with:
- task: Design full 6-month curriculum outline + detailed Month 1 lessons
- prompt: [See full prompt provided to operator]
- model: opus
- note: This is the foundation. Platform will be built around this curriculum.
```

### Phase 1: Month 1 Lessons
```
sessions_spawn with:
- task: Write all 8 Month 1 lessons with markdown, code examples, and Jest tests
- skills: test-driven-development, verification-before-completion
- model: sonnet
- input: Curriculum outline from Phase 0
```

### Phase 2: Scaffold
```
sessions_spawn with:
- task: Scaffold Next.js project with retro-futuristic design system
- skills: brainstorming, frontend-design, verification-before-completion
- model: sonnet
- constraint: Must support the actual Month 1 lesson format from Phase 1
```

### Phase 3: Daemon
```
sessions_spawn with:
- task: Build local daemon with WebSocket, terminal, test runner
- skills: brainstorming, systematic-debugging, test-driven-development, verification-before-completion
- model: sonnet
- constraint: Must run the actual tests from Month 1 lessons
```

### Phase 4: Globe
```
sessions_spawn with:
- task: Build Three.js wireframe globe with continent markers
- skills: brainstorming, frontend-design, verification-before-completion
- model: sonnet
```

### Phase 5: Cards + Terminal
```
sessions_spawn with:
- task: Build lesson cards with xterm.js terminal integration
- skills: brainstorming, frontend-design, verification-before-completion
- model: sonnet
- constraint: Must render actual Month 1 lesson content and run tests
```

### Phase 6: Skill Tree
```
sessions_spawn with:
- task: Build hexagonal skill tree with Zustand state management
- skills: brainstorming, frontend-design, verification-before-completion
- model: sonnet
```

---

## Success Criteria

- [ ] All phases complete
- [ ] Globe renders at 60fps
- [ ] Terminal connects to daemon
- [ ] Tests run and validate
- [ ] 80%+ daemon test coverage
- [ ] Month 1 curriculum complete
- [ ] Build succeeds with no errors

---

*Plan complete. Ready to spawn sub-agents for implementation.*
