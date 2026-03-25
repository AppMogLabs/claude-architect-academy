# Product Requirements Document: Claude Architect Academy — MVP

**Version:** 1.0  
**Date:** 2026-03-25  
**Author:** Argos  
**Status:** Draft

---

## 1. Executive Summary

Claude Architect Academy is an open-source, gamified learning platform that teaches developers to build professional AI systems with Claude. It bridges the gap between "using Claude for emails" and "architecting multi-agent production systems" through hands-on coding challenges.

The product targets developers transitioning to AI engineering roles, offering a 6-month curriculum culminating in competitive "Agent Wars" challenges. The platform features a distinctive "Green Phosphor Hacker Academy" aesthetic with a spinning globe, expandable lesson cards, and CRT-styled terminal.

---

## 2. Success Metrics

| Metric | Target | Measurement Method | Timeline |
|--------|--------|-------------------|----------|
| Active users (completed ≥1 lesson) | 100 | Local daemon telemetry (opt-in) | 90 days post-launch |
| Users completing Month 1 | 50 | Progress tracking | 90 days post-launch |
| GitHub stars | 500 | GitHub API | 180 days post-launch |
| Community lesson contributions | 10 PRs | GitHub PR count | 180 days post-launch |
| Agent Wars participants | 20 | Challenge submission count | 90 days post-launch |

---

## 3. User Stories

### Epic 1: Onboarding & First API Call

**As a** developer new to Claude APIs  
**I want to** set up my environment and make my first API call  
**So that** I can verify everything works and build confidence

**Acceptance Criteria:**
- [ ] User can install daemon with single command (`npm install -g claude-academy-daemon`)
- [ ] User can configure API key via environment variable
- [ ] First lesson validates API key works (200 response from Claude)
- [ ] Clear error messages if API key is missing/invalid
- [ ] Setup completes in <5 minutes

**Priority:** P0 (MVP blocker)

### Epic 2: Interactive Learning

**As a** learner working through the curriculum  
**I want to** read lessons and write code in an embedded terminal  
**So that** I can learn by doing, not just reading

**Acceptance Criteria:**
- [ ] Lessons render markdown with syntax highlighting
- [ ] Embedded terminal connects to local daemon via WebSocket
- [ ] Code written in terminal persists across sessions
- [ ] Tests run automatically when user submits solution
- [ ] Immediate pass/fail feedback with helpful error messages
- [ ] Hints available progressively (3 levels)

**Priority:** P0 (MVP blocker)

### Epic 3: Visual Progression (Globe & Skill Tree)

**As a** learner working through the 6-month curriculum  
**I want to** see my progress visually on a spinning globe and skill tree  
**So that** I stay motivated and understand the learning path

**Acceptance Criteria:**
- [ ] Spinning globe displays 6 months as continents
- [ ] Completed months glow phosphor green
- [ ] Current month pulses with amber light
- [ ] Locked months appear dimmed
- [ ] Clicking a continent expands that month's lessons
- [ ] Skill tree shows hexagonal nodes with connections
- [ ] Progress persists across browser sessions (localStorage)

**Priority:** P0 (MVP blocker)

### Epic 4: Agent Wars Competition

**As a** learner who has completed Month 5  
**I want to** compete in monthly coding challenges  
**So that** I can test my skills against others and build my reputation

**Acceptance Criteria:**
- [ ] Monthly challenges are announced with clear requirements
- [ ] Users can submit solutions via GitHub PR
- [ ] Automated scoring runs tests against submissions
- [ ] Leaderboard displays top performers with cyberpunk styling
- [ ] Winners receive recognition (badges, social features)
- [ ] Challenge archive accessible for practice

**Priority:** P1 (must-have)

### Epic 5: Community Contributions

**As an** advanced learner or community member  
**I want to** contribute new lessons or improve existing ones  
**So that** I can give back and build my portfolio

**Acceptance Criteria:**
- [ ] Lesson format is documented and easy to understand
- [ ] New lessons can be added via markdown + YAML
- [ ] Tests can be written in JavaScript/TypeScript
- [ ] PR template guides contributors
- [ ] Review process documented

**Priority:** P2 (nice-to-have)

---

## 4. Technical Architecture

### 4.1 System Overview

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

### 4.2 Architecture Decisions

| # | Decision | Options Considered | Chosen | Rationale | Trade-offs |
|---|----------|-------------------|--------|-----------|------------|
| AD-1 | Frontend Framework | Next.js, Remix, Astro | Next.js | Static export, familiar ecosystem, excellent TypeScript support | Slightly larger bundle than Astro |
| AD-2 | Terminal Emulation | xterm.js, custom, iframe | xterm.js | Industry standard, battle-tested, feature-rich | Adds ~200KB bundle size |
| AD-3 | Globe Rendering | Three.js, CSS 3D, Canvas | Three.js | Smooth animation, wireframe aesthetic, professional look | Adds ~500KB bundle size |
| AD-4 | State Management | Zustand, Redux, Context | Zustand | Lightweight, no boilerplate, persists to localStorage | Less devtools than Redux |
| AD-5 | Daemon Language | Node.js, Go, Rust | Node.js | Easy distribution via npm, familiar to target users | Larger binary than Go/Rust |
| AD-6 | Test Runner | Jest, Vitest, custom | Jest | Most familiar to JavaScript developers, robust | Slower than Vitest |
| AD-7 | Styling | Tailwind, CSS-in-JS, vanilla | Tailwind | Rapid development, consistent design system, small bundle | HTML can get verbose |

### 4.3 Tech Constraints

- **Cost ceiling:** $0 operational cost (static hosting only)
- **Maintenance burden:** Must be maintainable by AI agents (clear structure, good docs)
- **Testability:** 80%+ coverage on daemon logic
- **Security:** No server-side code execution, user API keys never leave their machine
- **IP strategy:** Open source (MIT license)

---

## 5. Data Model

### 5.1 Core Entities

```
Lesson
├─ id (string, PK) — "m1-w1-first-api-call"
├─ month (number) — 1-6
├─ week (number) — 1-4
├─ title (string)
├─ description (string)
├─ content (markdown)
├─ tests (array of test objects)
├─ hints (array of strings)
└─ prerequisites (array of lesson IDs)

UserProgress (localStorage)
├─ userId (string, generated)
├─ completedLessons (array of lesson IDs)
├─ currentLesson (lesson ID)
├─ lastAccessed (timestamp)
└─ settings (object)

Challenge (Agent Wars)
├─ id (string, PK)
├─ month (date)
├─ title (string)
├─ description (markdown)
├─ requirements (array)
├─ testSuite (path to tests)
├─ submissions (array)
└─ leaderboard (array)
```

### 5.2 Data Retention

- **User progress:** Stored locally only, user can export/import
- **Lesson content:** Version controlled in Git
- **Challenge submissions:** Stored in GitHub PRs
- **Analytics:** Anonymous, opt-in only

---

## 6. API Specification

### 6.1 Daemon WebSocket API

| Method | Event | Purpose | Payload | Response |
|--------|-------|---------|---------|----------|
| WS | `terminal:input` | Send keystroke to terminal | `{ data: string }` | Broadcast to terminal |
| WS | `terminal:output` | Receive terminal output | `{ data: string }` | — |
| WS | `test:run` | Run tests for current lesson | `{ lessonId: string }` | `{ passed: boolean, results: [] }` |
| WS | `file:read` | Read file from lesson directory | `{ path: string }` | `{ content: string }` |
| WS | `file:write` | Write file to lesson directory | `{ path: string, content: string }` | `{ success: boolean }` |

### 6.2 Rate Limits

- WebSocket messages: No artificial limits (local connection)
- Claude API calls: Respect user's API key limits (handled by Anthropic)
- File operations: No limits (local filesystem)

---

## 7. Security Requirements

- **Authentication:** None required (local-first)
- **Authorization:** Filesystem access limited to lesson directory
- **Input validation:** All file paths sanitized, no directory traversal
- **Secrets management:** API keys in environment variables only
- **Code execution:** Sandboxed, limited to lesson directory
- **Daemon binding:** localhost only (127.0.0.1), no external access

---

## 8. Testing Strategy

### 8.1 Unit Tests
- Daemon command handlers
- File system operations
- WebSocket message parsing
- Lesson validation logic

### 8.2 Integration Tests
- Full lesson flow (setup → code → test → pass)
- WebSocket communication
- Terminal emulation

### 8.3 Exploratory Testing
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Different operating systems (macOS, Linux, Windows WSL)
- Various terminal sizes and resolutions

### 8.4 User Acceptance Testing
- Complete Month 1 curriculum
- Agent Wars submission flow
- Community contribution workflow

### 8.5 Performance Testing
- Terminal responsiveness (<50ms input lag)
- Test execution time (<5 seconds per lesson)
- Initial load time (<3 seconds on 3G)
- Globe animation (60fps)

---

## 9. Deployment & Operations

### 9.1 Hosting
- **Provider:** GitHub Pages (free)
- **Domain:** claude-architect.dev (or similar)
- **Estimated cost:** $12/year (domain only)

### 9.2 CI/CD
- **Platform:** GitHub Actions
- **Pipeline:** Lint → Test → Build → Deploy to GitHub Pages
- **Deployment strategy:** Automatic on main branch merge

### 9.3 Monitoring
- **Uptime:** GitHub Pages status (no additional monitoring needed)
- **Errors:** Sentry (optional, free tier)
- **Analytics:** Plausible (privacy-focused, optional)

### 9.4 Distribution
- **Daemon:** npm package (`claude-academy-daemon`)
- **Frontend:** Static site (GitHub Pages)
- **Lessons:** GitHub repository (community contributions)

---

## 10. Launch Checklist

- [ ] All P0 and P1 user stories complete
- [ ] 80%+ test coverage on daemon
- [ ] MIT license applied
- [ ] README with clear setup instructions
- [ ] Contributing guide for lesson authors
- [ ] First 3 months of curriculum complete
- [ ] Agent Wars framework ready
- [ ] Community Discord/forum set up
- [ ] Launch post drafted

---

## 11. Out of Scope (v1)

- User authentication/accounts
- Cloud progress sync
- Video content
- Mobile app
- Paid tiers or certificates
- Real-time collaboration
- AI-powered hints (uses user's API key instead)
- RPG avatar system
- Team/crew features

---

## 12. Open Questions

| # | Question | Options | Impact | Decision By |
|---|----------|---------|--------|-------------|
| 1 | Should we offer optional cloud sync? | Yes/No | Medium | Post-MVP |
| 2 | Lesson hosting: Git-only or CMS? | Git/CMS | Low | Pre-launch |
| 3 | Monetization strategy? | None/Freemium/Sponsors | High | Post-MVP |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-25 | Argos | Initial PRD |

---

*PRD complete. Ready for implementation planning.*
