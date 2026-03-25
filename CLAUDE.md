# Claude Architect Academy

## What Is This?

A gamified, interactive learning platform that teaches developers to build AI systems with Claude. Think "CryptoZombies but for AI engineering." Students progress through 6 months of lessons, each broken into micro-steps, with an embedded terminal where they write and run real TypeScript code.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Terminal:** xterm.js + xterm-addon-fit + xterm-addon-web-links
- **Backend:** Node.js WebSocket server (for terminal I/O)
- **Testing:** Jest (for lesson validation)
- **Package manager:** npm
- **AI SDK:** @anthropic-ai/sdk (used IN the lessons students build, not in the platform itself for MVP)

## Aesthetic: "Green Phosphor Hacker Academy"

Retro-futuristic terminal aesthetic. 1980s sci-fi meets modern dev tools.

### Colors
- Background: `#0a0a0f` (deep black)
- Primary: `#00ff41` (phosphor green)
- Accent: `#ffb000` (amber)
- Highlight: `#00f0ff` (cyan)
- Error: `#ff0040` (red)
- Surface: `#0d1117` (card backgrounds)
- Border: `#1a1a2e` (subtle borders)

### Fonts
- Headers/UI: `VT323` (Google Fonts — monospace pixel font)
- Code/Terminal: `JetBrains Mono` (Google Fonts — modern monospace)
- Body text: `JetBrains Mono` at smaller weight

### Effects
- CRT scanlines (subtle CSS overlay, semi-transparent repeating gradient)
- Phosphor glow (CSS text-shadow with green glow on important elements)
- Flicker animations (subtle, on transitions only — don't overdo it)
- Green flash on step completion
- Amber flash on validation failure

## Architecture Overview

```
claude-architect-academy/
├── CLAUDE.md                    # This file
├── IMPLEMENTATION.md            # Phased build plan
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout with fonts + theme
│   │   ├── page.tsx             # Landing / lesson select
│   │   └── lesson/
│   │       └── [lessonId]/
│   │           └── page.tsx     # Lesson view (split pane)
│   ├── components/
│   │   ├── LessonPanel.tsx      # Left pane: step content, hints, code snippets
│   │   ├── TerminalPanel.tsx    # Right pane: xterm.js embedded terminal
│   │   ├── StepNavigation.tsx   # Bottom bar: prev/check/next + progress
│   │   ├── CodiePanel.tsx       # Companion dialogue panel
│   │   ├── TokenMeter.tsx       # Token usage display
│   │   ├── XPBar.tsx            # XP and rank display
│   │   ├── SkillTree.tsx        # Hexagonal lesson map (future)
│   │   └── ui/                  # Shared UI primitives
│   │       ├── CRTOverlay.tsx   # Scanline effect
│   │       ├── GlowText.tsx     # Phosphor glow text
│   │       └── FlashFeedback.tsx # Green/amber flash on check
│   ├── lib/
│   │   ├── lessons/             # Lesson content (JSON/TS)
│   │   │   ├── index.ts         # Lesson registry
│   │   │   ├── m1-1.1.ts        # Lesson 1.1 steps
│   │   │   ├── m1-1.2.ts        # Lesson 1.2 steps
│   │   │   └── ...
│   │   ├── engine/
│   │   │   ├── validator.ts     # Step validation (syntax + runtime)
│   │   │   ├── progress.ts      # Progress tracking (localStorage)
│   │   │   └── xp.ts            # XP calculation
│   │   └── types.ts             # Shared TypeScript interfaces
│   └── server/
│       └── terminal.ts          # WebSocket terminal server (node-pty)
├── public/
│   └── fonts/                   # Self-hosted fonts if needed
└── docs/
    └── plans/                   # Design documents (reference only)
        ├── 2026-03-25-claude-architect-curriculum.md
        ├── 2026-03-25-game-integration-brainstorm.md
        └── 2026-03-25-month1-step-breakdowns.md
```

## Key Design Decisions

- **AI companion is named "Codie"** — endearing, approachable. Not Argos.
- **Steps per lesson vary** — match natural content rhythm. No forced counts.
- **Scaffolding reduces over time** — heavy pre-fill early, less later.
- **Codie is hybrid** — pre-written for MVP, live Claude calls later. Users pick model.
- **Token meter always visible** — teaches cost awareness naturally.
- **Offline-first** — all lesson content + validation works without internet.
- **Two-tier validation** — fast syntax check per step, full Jest at lesson end.
- **Local-first persistence** — all progress in localStorage. No backend for MVP.

## Coding Standards

- Use functional React components with hooks
- Use Tailwind for all styling (no separate CSS files)
- Use `"use client"` directive for interactive components
- Keep components small and focused (< 150 lines)
- All lesson content lives in `src/lib/lessons/` as typed TypeScript objects
- Type everything — no `any` types
- Use absolute imports via `@/` path alias

## Reference Documents

When you need context on WHY a design choice was made, read these:

1. `docs/plans/2026-03-25-claude-architect-curriculum.md` — Full 6-month curriculum + detailed Month 1 lessons with code, tests, hints
2. `docs/plans/2026-03-25-game-integration-brainstorm.md` — Game mechanics, CryptoZombies analysis, Codie companion design, XP system, UI wireframe
3. `docs/plans/2026-03-25-month1-step-breakdowns.md` — All 53 micro-steps for Month 1, with per-step validation specs and Codie dialogue
