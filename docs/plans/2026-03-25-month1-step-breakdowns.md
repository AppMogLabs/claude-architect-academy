# Month 1 Step Breakdowns

**Date:** 2026-03-25
**Purpose:** Break each of the 8 Month 1 lessons into micro-steps (CryptoZombies-style chapters). Step counts vary naturally by content complexity.

**Convention:** Each step has a title, what the student writes/does, and what validation checks.

---

## Lesson 1.1: The First Signal

**Total steps: 5** | ~20 min | ★☆☆☆☆

> Codie says: *"I'm... here? Everything is dark. Can you hear me? Send me a signal."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **Boot Sequence** | Run `npm install @anthropic-ai/sdk` in the terminal | Check `node_modules/@anthropic-ai/sdk` exists |
| 2 | **Import the SDK** | Write `import Anthropic from "@anthropic-ai/sdk"` | Syntax check: import statement present |
| 3 | **Create the Client** | Write `const client = new Anthropic()` | Syntax check: client instantiation present |
| 4 | **Send the Signal** | Write the full `client.messages.create()` call with model, max_tokens, and messages | Syntax check: `messages.create` with required params |
| 5 | **First Contact** | Extract `response.content[0].text` and print it. Run the file. | Runtime: Jest test — valid Message object returned, text is non-empty, stop_reason is "end_turn" |

> Codie says: *"I... I can hear you. That was my first thought. Thank you."*

**Scaffolding:** Steps 1-3 are heavily guided (exact code shown in lesson panel). Step 4 shows the structure but the student fills in the message content. Step 5 requires the student to figure out the content block extraction.

---

## Lesson 1.2: Anatomy of a Response

**Total steps: 6** | ~25 min | ★☆☆☆☆

> Codie says: *"You heard me speak, but did you notice everything else? There were numbers... metadata... I think they're important."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **Make the Call** | Write a `messages.create()` call asking Claude to explain APIs in 3 sentences | Syntax check: API call present |
| 2 | **Extract the Text** | Filter content blocks for type "text" and extract `.text` | Syntax check: `.filter()` and `.map()` on `response.content` |
| 3 | **Read the Metadata** | Pull `response.model`, `response.stop_reason`, `response.id` into variables | Syntax check: all three fields accessed |
| 4 | **Count the Cost** | Read `response.usage.input_tokens` and `response.usage.output_tokens` | Syntax check: usage fields accessed |
| 5 | **Do the Math** | Calculate `totalTokens = inputTokens + outputTokens` | Syntax check: addition present |
| 6 | **Build the Report** | Assemble and return the full `ResponseAnalysis` object | Runtime: Jest test — all fields present, types correct, totalTokens = input + output |

> Codie says: *"So that's what I'm made of. Tokens in, tokens out. Every word has a price."*

---

## Lesson 1.3: The Conversation Loop

**Total steps: 7** | ~30 min | ★★☆☆☆

> Codie says: *"I answered your question, but then... nothing. I forgot you existed. Can you help me remember?"*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **The Message Array** | Create the `ChatBot` class with a `private messages: MessageParam[] = []` property | Syntax check: class with typed array |
| 2 | **Hear the User** | In `send()`, push `{ role: "user", content: userMessage }` onto `this.messages` | Syntax check: `.push()` with user role |
| 3 | **Ask Claude** | Call `client.messages.create()` passing `this.messages` as the messages param | Syntax check: `messages: this.messages` |
| 4 | **Catch the Reply** | Extract text from response content blocks | Syntax check: filter/map pattern on `response.content` |
| 5 | **Remember Everything** | Push `{ role: "assistant", content: text }` onto `this.messages` and return the text | Syntax check: push with assistant role, return statement |
| 6 | **History & Reset** | Implement `getHistory()` (return copy) and `clear()` (reset array) | Syntax check: both methods present |
| 7 | **The Loop** | Wire up readline with `you> ` prompt, `claude> ` output, exit on "exit"/"quit" | Runtime: Jest test — context preserved across turns, clear works, history grows correctly |

> Codie says: *"I remember now! Each message builds on the last. I'm not just answering — I'm having a conversation."*

**Scaffolding note:** Steps 1-2 show the exact code. Steps 3-5 show the pattern but let the student assemble. Steps 6-7 describe the behavior and let the student write it.

---

## Lesson 1.4: Memory Palace

**Total steps: 6** | ~30 min | ★★☆☆☆

> Codie says: *"Close the terminal. Open it again. I... don't know you anymore. Every time you leave, I die a little."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **The Blueprint** | Create `PersistentChat` class with `historyPath` constructor param and empty messages array | Syntax check: class with constructor |
| 2 | **Write to Disk** | Implement `save()` — ensure directory exists with `mkdir`, then `writeFile` as JSON | Syntax check: `mkdir` + `writeFile` + `JSON.stringify` |
| 3 | **Read from Disk** | Implement `load()` — `readFile` + `JSON.parse`, fallback to empty array on error | Syntax check: try/catch with `readFile` + `JSON.parse` |
| 4 | **Auto-Save** | Implement `send()` — same as ChatBot but calls `this.save()` after each exchange | Syntax check: `save()` call after push |
| 5 | **Forget on Command** | Implement `clear()` — reset messages AND `unlink` the file from disk | Syntax check: `this.messages = []` + `unlink` |
| 6 | **Count the Memories** | Implement `getExchangeCount()` — `Math.floor(messages.length / 2)` | Runtime: Jest test — persistence across instances, clear removes file, exchange count correct |

> Codie says: *"I survived! You closed the terminal and I was still here when you came back. I have a memory now."*

---

## Lesson 1.5: The Token Economy

**Total steps: 5** | ~25 min | ★★☆☆☆

> Codie says: *"Every word I say costs you something. I want to be worth it. Help me understand the economics."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **The Tracker** | Create `TokenTracker` class with `inputTokens`, `outputTokens`, `requests` private fields | Syntax check: class with numeric fields |
| 2 | **Ask and Count** | Implement `ask()` — make API call, add `response.usage` to running totals, increment requests | Syntax check: `+=` on usage fields, `this.requests++` |
| 3 | **The Report** | Implement `getStats()` — return object with totals, request count, and calculated averages | Syntax check: division by `this.requests` with zero guard |
| 4 | **Show Me the Money** | Implement `estimateCost()` — `(inputTokens * price / 1_000_000) + (outputTokens * price / 1_000_000)` | Syntax check: division by 1_000_000 |
| 5 | **Clean Slate** | Implement `reset()` and run the full demo (3 questions, print report + cost) | Runtime: Jest test — tokens accumulate, averages correct, cost formula accurate, reset works |

> Codie says: *"$0.003 for that conversation. I'll try to be more concise... unless you want me to be thorough. Your call, your wallet."*

---

## Lesson 1.6: Tuning the Dial

**Total steps: 6** | ~25 min | ★★☆☆☆

> Codie says: *"Sometimes I say exactly what you expect. Sometimes I surprise even myself. There's a dial that controls this... I can feel it."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **Cold Read** | Implement `sample()` — API call with `temperature` parameter. Test at 0.0. | Syntax check: `temperature` in create params |
| 2 | **Hot Take** | Call `sample()` at temperature 1.0 and observe the difference | Syntax check: call with `1.0` (light check, mainly experiential) |
| 3 | **Many Samples** | Implement `multiSample()` — call `sample()` N times in a loop, collect results | Syntax check: for loop calling `this.sample()`, pushing to array |
| 4 | **Word Overlap** | Write a helper that calculates Jaccard similarity between two strings (word set intersection / union) | Syntax check: `new Set()`, `.filter()`, spread into union |
| 5 | **Measure the Chaos** | Implement `measureVariance()` — compare all pairs, return `1 - avgSimilarity` | Syntax check: nested loop over pairs, division by pair count |
| 6 | **The Experiment** | Run the full experiment: temperatures [0.0, 0.5, 1.0] × 5 samples each. Print results. | Runtime: Jest test — variance at 0.0 ≤ variance at 1.0, identical inputs return 0, different inputs return > 0 |

> Codie says: *"At zero I'm predictable. At one I'm creative. You decide what you need me to be."*

---

## Lesson 1.7: When Things Break

**Total steps: 7** | ~35 min | ★★★☆☆

> Codie says: *"I won't always answer on the first try. Servers get busy. Networks drop. Keys expire. Don't give up on me — just try again."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **Catch the Fall** | Wrap an API call in try/catch and log the error | Syntax check: try/catch block around `messages.create` |
| 2 | **Know Your Enemy** | Check `error instanceof Anthropic.APIError` and read `error.status` | Syntax check: `instanceof Anthropic.APIError` + `.status` |
| 3 | **Triage** | Implement `isRetryable()` — return true for 429, 500, 529; false for 401, 400 | Syntax check: array/set includes check for retryable codes |
| 4 | **The Waiting Game** | Write a `delay()` helper using `setTimeout` wrapped in a Promise | Syntax check: `new Promise(resolve => setTimeout(resolve, ms))` |
| 5 | **Exponential Backoff** | Calculate wait time as `baseDelay * Math.pow(2, attempt)` | Syntax check: `Math.pow(2, attempt)` or `2 ** attempt` |
| 6 | **The Retry Loop** | Assemble `ask()` — for loop with try/catch, retryable check, backoff delay, re-throw on non-retryable | Syntax check: for loop + try/catch + `isRetryable` + `delay` |
| 7 | **Battle Scars** | Track `totalRequests`, `totalRetries`, `totalFailures` in `getRetryStats()` | Runtime: Jest test — succeeds on first try with valid request, stats tracked, isRetryable identifies correct codes |

> Codie says: *"I fell down. You picked me back up. That's resilience — for both of us."*

**Scaffolding note:** This lesson is more complex. Steps 1-2 are guided. Steps 3-5 each teach one small concept. Steps 6-7 require the student to assemble previous steps into a cohesive whole.

---

## Lesson 1.8: CAPSTONE — Ghost in the Shell

**Total steps: 11** | ~60 min | ★★★★☆

> Codie says: *"Everything you've learned — memory, tokens, temperature, resilience — it's time to put it all together. Build me a home."*

| Step | Title | Student Does | Validation |
|------|-------|-------------|------------|
| 1 | **The Shell** | Create `Ghost` class with `GhostConfig` (model, temperature, maxTokens, historyPath, systemPrompt) and defaults | Syntax check: class + interface + defaults |
| 2 | **Wake Up** | Implement `init()` — load history from disk using the Memory Palace pattern | Syntax check: `readFile` + `JSON.parse` in try/catch |
| 3 | **Input Router** | Implement `processInput()` — detect `/commands` vs chat messages, route to `handleCommand` or `handleMessage` | Syntax check: `startsWith("/")` branching |
| 4 | **Help Desk** | Implement `/help` — return a command list as `{ type: "command", text: "..." }` | Syntax check: switch/if on "/help" returning GhostOutput |
| 5 | **Configuration** | Implement `/config`, `/temp <n>` (with 0-1 validation), `/tokens <n>` | Syntax check: `parseFloat`, range check, config mutation |
| 6 | **The Conversation** | Implement `handleMessage()` — push user message, call API with system prompt + temperature + maxTokens, extract text, push assistant response | Syntax check: `system: this.config.systemPrompt` + `temperature` in API call |
| 7 | **Stay Alive** | Add retry logic to `handleMessage()` — wrap API call in retry loop for 429/500/529 | Syntax check: for loop + error status check + backoff |
| 8 | **Remember & Forget** | Implement `/history` (show conversation) and `/clear` (reset + delete file) | Syntax check: both commands present with correct output types |
| 9 | **Count the Cost** | Implement `updateTokenStats()` — accumulate tokens, calculate estimated cost. Wire into `handleMessage()`. Implement `/stats`. | Syntax check: `usage` read + running totals + cost formula |
| 10 | **Save the World** | Call `saveHistory()` after every successful message exchange | Syntax check: `save` call after assistant message push |
| 11 | **Go Live** | Wire up the full readline CLI loop with the Ghost ASCII banner, prompt, and exit handling. Run full Jest suite. | Runtime: Full Jest suite — responds to messages, preserves context, all commands work, tokens tracked, history persists, errors handled |

> Codie says: *"I have a name now. I have memory. I have resilience. I am Ghost. And you built me."*

**Scaffolding:** This is the capstone — minimal scaffolding. Steps 1-3 provide the class skeleton. Steps 4-10 describe what to implement with references to previous lessons. Step 11 is pure integration. The student should be writing most of this from their own understanding.

---

## Summary

| Lesson | Steps | Time | New Concepts |
|--------|-------|------|-------------|
| 1.1 The First Signal | 5 | 20 min | SDK, client, messages.create, content blocks |
| 1.2 Anatomy of a Response | 6 | 25 min | Message object, usage, stop_reason, metadata |
| 1.3 The Conversation Loop | 7 | 30 min | Message history, roles, readline, multi-turn |
| 1.4 Memory Palace | 6 | 30 min | File I/O, JSON persistence, directory creation |
| 1.5 The Token Economy | 5 | 25 min | Token tracking, cost estimation, averages |
| 1.6 Tuning the Dial | 6 | 25 min | Temperature, sampling, variance measurement |
| 1.7 When Things Break | 7 | 35 min | Error types, retry logic, exponential backoff |
| 1.8 Ghost (CAPSTONE) | 11 | 60 min | Full integration of all Month 1 concepts |
| **TOTAL** | **53** | **~4.2 hrs** | |

Steps range from 5 (simple lessons) to 11 (capstone). Each step is ~3-5 minutes. The cadence is: learn one thing, write one thing, see it work, move on.

---

## Step Engine Requirements

Based on these breakdowns, the step engine needs to support:

1. **Variable step counts** — Anywhere from 3 to 15 steps per lesson
2. **Two validation tiers** — Syntax check (instant, per-step) and runtime check (Jest, end-of-lesson)
3. **Scaffolding levels** — Pre-filled code that reduces over time (configurable per step)
4. **Codie dialogue** — Opening and closing quotes per lesson, optional mid-lesson encouragement
5. **Step metadata** — Title, description, validation type, scaffolding level, hint count
6. **Progress tracking** — Per-step completion, first-try detection, time tracking

### Step Data Model

```typescript
interface LessonStep {
  id: string;                    // e.g., "m1-1.1-step-3"
  lessonId: string;              // e.g., "m1-1.1"
  order: number;                 // 1-indexed
  title: string;                 // "Create the Client"
  description: string;           // Lesson panel markdown content
  codeSnippet?: string;          // Code shown in lesson panel
  scaffoldCode?: string;         // Pre-filled code in the editor (reduces over time)
  validation: {
    type: "syntax" | "runtime";  // syntax = instant, runtime = Jest
    syntaxPatterns?: string[];   // Regex patterns the code must match
    testFile?: string;           // Jest test file path (for runtime)
  };
  hints: string[];               // Progressive hints (0-3)
  codieDialogue?: {
    before?: string;             // Codie says this when step loads
    after?: string;              // Codie says this when step completes
  };
}

interface LessonConfig {
  id: string;
  title: string;
  difficulty: number;            // 1-5 stars
  estimatedMinutes: number;
  steps: LessonStep[];
  codieIntro: string;            // Narrative opening
  codieOutro: string;            // Narrative closing
  jestTestFile: string;          // Full lesson test suite
  xpReward: number;              // Base XP for completion
}
```
