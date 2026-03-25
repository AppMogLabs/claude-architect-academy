# Design Document: Claude Architect Academy — MVP

**Date:** 2026-03-25  
**Author:** Argos  
**Status:** Approved

---

## 1. Executive Summary

Claude Architect Academy is a gamified, 6-month interactive learning platform that teaches developers to build professional AI systems with Claude. It combines a web-based lesson interface with a local daemon for real code execution, creating a hands-on learning experience.

The platform uses a **"Green Phosphor Hacker Academy"** aesthetic — retro-futuristic terminal vibes meeting modern developer tools. Deep black backgrounds, phosphor green accents, CRT scanlines, and brutalist design elements create an immersive "hacker learning to be an architect" atmosphere.

---

## 2. Core Concept

### Problem
Most developers use Claude for simple tasks. Few understand how to architect multi-agent systems, design tool use, or build production AI applications. The 6-month Claude Architect curriculum exists as content — but there's no interactive platform to practice these skills.

### Solution
An interactive learning platform where users:
- Write real code that calls the actual Claude API
- Get instant validation via local test runner
- Progress through a visual skill tree centered around a spinning globe
- Compete in monthly "Agent Wars" challenges
- Build a portfolio of working AI systems

### Target Audience
- Developers who know JavaScript/Python but are new to AI systems
- Existing developers wanting to transition to "AI Engineer" roles
- Self-taught learners who prefer hands-on over theory

---

## 3. Aesthetic Direction

**Theme:** "Green Phosphor Hacker Academy"

### Visual Language

**Colors:**
- Background: Deep black (#0a0a0f)
- Primary: Phosphor green (#00ff41) — classic terminal green
- Secondary: Amber (#ffb000) — warning/status accents
- Tertiary: Cyan (#00f0ff) — interactive elements
- Glow effects: Soft green bloom on active elements

**Typography:**
- Headers: VT323 (pixelated, retro terminal font)
- Code: JetBrains Mono (monospace, excellent readability)
- Body: Space Grotesk (geometric, slightly retro feel)

**Effects:**
- CRT scanline overlay (CSS repeating-linear-gradient)
- Subtle screen curvature (border-radius + shadow)
- Phosphor glow on hover/focus (text-shadow + box-shadow)
- Flicker animation on "system boot" sequences
- Cursor blink (caret-color + animation)

---

## 4. Key UI Components

### 1. Spinning Wireframe Globe (Learning Journey)
- Central hub of the dashboard
- 6 continents = 6 months of curriculum
- Completed months glow phosphor green
- Current month pulses with amber light
- Future months dimmed, locked appearance
- Click a continent to expand that month's lessons
- Smooth rotation animation, wireframe aesthetic

### 2. Expandable Lesson Cards (Brutalist Design)
- Sharp corners, heavy 2px borders
- Expand with glitch transition effect
- Show lesson title, estimated time, completion status
- Hover: Border color shifts to phosphor green
- Collapsed state shows summary only
- Expanded state shows lesson content + embedded terminal

### 3. Embedded Terminal (CRT Aesthetic)
- Rounded corners mimicking old CRT monitors
- Scanline overlay effect
- Phosphor glow cursor (block style, blinking)
- xterm.js with custom CSS theming
- Green text on black background
- Scrollbar styled to match retro aesthetic

### 4. Skill Tree (Neon Connections)
- Hexagonal nodes connected by glowing lines
- Completed: Solid green glow
- Current: Pulsing amber
- Locked: Dim gray with lock icon
- Connections animate when unlocking new nodes

### 5. Agent Wars Leaderboard
- Cyberpunk styling with neon accents
- Top performers highlighted with glow effects
- Live updates during competitions
- Rank badges with retro-futuristic icons

---

## 5. The 6-Month Curriculum

| Month | Theme | Sample Challenge |
|-------|-------|------------------|
| 1 | Foundation | "Make your first API call" — validate key works |
| 2 | API Mastery | "Build a CLI tool that analyzes text" |
| 3 | Tools & Agents | "Create a web-searching agent" |
| 4 | Ship Products | MVP week — build + deploy a working tool |
| 5 | Architecture | "Multi-agent system: Two Clauses collaborate" |
| 6 | Agent Wars | Competitive challenges with live leaderboard |

### Lesson Structure
Each lesson includes:
1. **Concept** — Explanation with code examples
2. **Challenge** — Hands-on coding task
3. **Terminal** — Embedded xterm.js for code execution
4. **Validation** — Automated tests run locally
5. **Hints** — Progressive disclosure if stuck

---

## 6. Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Web Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │Lesson Viewer │  │   Terminal   │  │   Skill Tree     │  │
│  │  (Globe)     │  │   (CRT)      │  │   (Hex Grid)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │ WebSocket (localhost:8787)
┌────────────────────▼────────────────────────────────────────┐
│                 Local Daemon (Node.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ File Watcher │  │ Test Runner  │  │  Claude API      │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Components

**Frontend (Next.js 14 + Tailwind CSS)**
- Lesson viewer with markdown rendering
- Embedded xterm.js terminal with CRT styling
- Skill tree visualization (CSS Grid + SVG connections)
- Spinning globe (Three.js or CSS 3D transforms)
- Progress tracking (Zustand + localStorage)

**Local Daemon (TypeScript/Node.js)**
- WebSocket server for terminal communication
- File system watcher for lesson files
- Test runner (Jest) for validation
- Secure sandbox for code execution

**Lesson Format (Markdown + YAML)**
```yaml
---
month: 1
week: 1
title: "Your First API Call"
description: "Learn to make a basic Claude API request"
tests:
  - test: "should return a valid response"
    file: "test.js"
validation:
  - "API key is configured"
  - "Request returns 200 status"
---
```

---

## 7. Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14 + Tailwind | Static export, fast builds, familiar |
| Terminal | xterm.js + WebSocket | Industry standard, full terminal emulation |
| Globe | Three.js or CSS 3D | Smooth animation, wireframe aesthetic |
| State | Zustand + localStorage | Lightweight, offline-first |
| Daemon | Node.js + TypeScript | Cross-platform, easy distribution |
| Tests | Jest | Industry standard, familiar to devs |
| Styling | Tailwind + CSS Variables | Easy theming, consistent design |

---

## 8. Security Considerations

- **API Keys:** Stored only in user's environment, never transmitted to our servers
- **Code Execution:** Sandboxed via vm2 or similar, limited to lesson directory
- **Daemon:** Binds to localhost only, no external access
- **No Cloud Required:** Fully functional offline, optional cloud sync

---

## 9. Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Users completing Month 1 | 50 | 90 days post-launch |
| GitHub stars | 500 | 180 days post-launch |
| Community lesson contributions | 10 PRs | 180 days post-launch |

---

## 10. Out of Scope (v1)

- User authentication
- Cloud progress sync
- Video content
- Mobile app
- Paid tiers
- Real-time collaboration
- RPG avatar system (deferred to v2)

---

## 11. Implementation Note: Curriculum-Driven Development

**Critical:** The platform will be built around the curriculum, not the other way around.

**Revised Approach:**
1. **Phase 0:** Design full 6-month curriculum outline (high-level)
2. **Phase 1:** Write detailed Month 1 lesson content (all 8 lessons with tests)
3. **Phase 2:** Build minimal platform that can deliver Month 1
4. **Phase 3:** Iterate lessons + platform together based on testing
5. **Phase 4:** Scale to Months 2-6

**Rationale:** The curriculum is the product. The platform is just the delivery mechanism. Building the curriculum first ensures we solve real learning problems, not hypothetical ones.

**Deliverables:**
- Curriculum design → `docs/plans/2026-03-25-claude-architect-curriculum.md` (Opus)
- Month 1 lessons → `curriculum/month-01/` (markdown + tests)
- Platform → Built to support the actual lessons, not generic features

---

*Design approved. Curriculum is being designed by Opus. Platform will be built around the curriculum.*
