# Claude Architect Academy — Full Curriculum

**Version:** 1.0
**Date:** 2026-03-25
**Author:** Argos / AppMogLabs
**Status:** Complete Draft

---

## Curriculum Philosophy

> "You don't learn to fly by reading about aerodynamics. You learn by crashing a few planes."

Claude Architect Academy follows the **CryptoZombies model**: every lesson is a coding challenge. There are no lectures, no videos, no slides. You read a brief explanation, you write code, the tests tell you if you understood it. Ship or die.

**Core Principles:**

1. **Build-first pedagogy** — Every lesson produces runnable code. The lesson *is* the code.
2. **Progressive disclosure** — Concepts introduced only when the student needs them for the current build.
3. **Real patterns, not toys** — By Month 3, students are building tools they'd actually use. By Month 4, they ship one.
4. **Fail-forward testing** — Tests don't just check correctness. They teach *why* the answer is correct.
5. **Terminal-native** — Everything runs in `xterm.js`. No context-switching. No browser tabs. Just you and Claude.

**Technical Stack:**
- Runtime: Node.js (v18+)
- Language: TypeScript (strict mode)
- SDK: `@anthropic-ai/sdk` (latest)
- Test runner: Jest
- No other external dependencies unless lesson-specific

---

## 6-MONTH CURRICULUM OVERVIEW

### Month 1: Foundation — "Hello, Claude"

*From zero to your first working CLI assistant.*

| Week | Lesson | Title | You Build | Key Concepts |
|------|--------|-------|-----------|--------------|
| 1 | 1.1 | The First Signal | API call that returns Claude's response | SDK install, API keys, `messages.create()` |
| 1 | 1.2 | Anatomy of a Response | Response parser that extracts text, tokens, stop reason | Response object, content blocks, usage stats |
| 2 | 1.3 | The Conversation Loop | Interactive CLI chat | `readline`, message history array, user/assistant roles |
| 2 | 1.4 | Memory Palace | Chat with persistent conversation history | File I/O, JSON serialization, conversation management |
| 3 | 1.5 | The Token Economy | Token counter and cost estimator | `max_tokens`, input/output tokens, pricing math |
| 3 | 1.6 | Tuning the Dial | Temperature playground comparing outputs | `temperature`, determinism vs creativity, `top_p` |
| 4 | 1.7 | When Things Break | Resilient API caller with retry logic | Error types, exponential backoff, rate limits |
| 4 | 1.8 | **CAPSTONE:** Ghost in the Shell | Full CLI assistant with history, config, error handling | Integration of all Month 1 concepts |

### Month 2: API Mastery — "Beyond Chat"

*System prompts, structured outputs, streaming, and real analysis tools.*

| Week | Lesson | Title | You Build | Key Concepts |
|------|--------|-------|-----------|--------------|
| 1 | 2.1 | The System Prompt | Personality-switching chatbot | `system` parameter, persona design, behavioral constraints |
| 1 | 2.2 | The Persona Factory | CLI that loads expert personas from YAML files | Role engineering, few-shot examples in system prompts |
| 2 | 2.3 | JSON Mode | Structured data extractor | JSON output parsing, schema enforcement, validation |
| 2 | 2.4 | Sentiment Machine | Batch sentiment analyzer with CSV export | Structured outputs, batch processing, file I/O |
| 3 | 2.5 | The Stream | Real-time streaming response renderer | `messages.stream()`, event handling, chunk processing |
| 3 | 2.6 | Terminal UX | Beautiful CLI with spinners, colors, progress | `chalk`, `ora`, streaming display, interrupt handling |
| 4 | 2.7 | The Chunker | Long-document processor with smart splitting | Token limits, text chunking strategies, map-reduce |
| 4 | 2.8 | **CAPSTONE:** Doc Surgeon | Document analyzer: summarize, extract entities, score readability | Integration of system prompts, JSON, streaming, chunking |

### Month 3: Tools & Agents — "Agents That Do Things"

*Function calling, external APIs, and autonomous agent loops.*

| Week | Lesson | Title | You Build | Key Concepts |
|------|--------|-------|-----------|--------------|
| 1 | 3.1 | Your First Tool | Calculator that Claude can call | Tool schema definition, `tool_use` stop reason, tool results |
| 1 | 3.2 | The Toolbelt | Multi-tool agent (calc, datetime, file reader) | Multiple tools, tool selection, result formatting |
| 2 | 3.3 | The Agent Loop | Autonomous agent that keeps calling tools until done | `while` loop pattern, stop conditions, max iterations |
| 2 | 3.4 | File System Agent | Agent that reads, writes, and searches files | File tools, path safety, sandboxing |
| 3 | 3.5 | The Web Researcher | Agent that fetches URLs and summarizes content | HTTP tools, content extraction, citation formatting |
| 3 | 3.6 | Multi-Step Reasoning | Research agent with plan → execute → synthesize flow | ReAct pattern, chain of thought, intermediate state |
| 4 | 3.7 | Error Recovery | Agent that handles tool failures gracefully | Fallback strategies, retry logic, partial results |
| 4 | 3.8 | **CAPSTONE:** DevOps Scout | System health agent: disk, memory, processes, logs | Integration of tools, agent loops, error recovery, reporting |

### Month 4: Ship Products — "MVP Week"

*Package, polish, deploy, and get real users.*

| Week | Lesson | Title | You Build | Key Concepts |
|------|--------|-------|-----------|--------------|
| 1 | 4.1 | Problem Discovery | Problem statement + user interview script | Product thinking, pain point identification, validation |
| 1 | 4.2 | The Git Whisperer | AI-powered git commit message generator | Git integration, diff parsing, context-aware generation |
| 2 | 4.3 | Package It | Publishable npm CLI package | `package.json` bin field, shebang, semantic versioning |
| 2 | 4.4 | Config & Polish | Configuration system with `~/.config` support | Config files, environment variables, defaults, help text |
| 3 | 4.5 | The Web Layer | Express server with simple HTML UI | HTTP server, form handling, SSE streaming |
| 3 | 4.6 | Deploy Day | Deploy to Railway/Render with environment config | Cloud deployment, environment management, health checks |
| 4 | 4.7 | MVP Sprint | Choose-your-own-project build sprint | Scoping, time management, feature prioritization |
| 4 | 4.8 | **CAPSTONE:** Launch Day | Deployed tool with README, demo, and feedback loop | Product launch, documentation, user feedback |

### Month 5: Architecture — "Systems Thinking"

*Multi-agent systems, orchestration, and complex workflows.*

| Week | Lesson | Title | You Build | Key Concepts |
|------|--------|-------|-----------|--------------|
| 1 | 5.1 | Why Multi-Agent? | Side-by-side comparison: monolith vs multi-agent | Separation of concerns, specialization, when to split |
| 1 | 5.2 | The Coordinator | Orchestrator that delegates to specialized workers | Coordinator pattern, task decomposition, result aggregation |
| 2 | 5.3 | Message Passing | Event-driven agent communication system | EventEmitter, message queues, async coordination |
| 2 | 5.4 | The Debate Club | Two agents argue, a judge decides | Adversarial pattern, structured argumentation, consensus |
| 3 | 5.5 | The Pipeline | Document processing pipeline (ingest → parse → analyze → format) | Pipeline pattern, stage isolation, error propagation |
| 3 | 5.6 | Self-Improvement Loop | Agent that critiques and rewrites its own output | Reflection pattern, quality scoring, iterative refinement |
| 4 | 5.7 | State Machines | Workflow engine with defined states and transitions | FSM pattern, state persistence, recovery |
| 4 | 5.8 | **CAPSTONE:** Code Review Board | Multi-agent code review: style, logic, security, consolidated report | Integration of coordinator, pipeline, reflection patterns |

### Month 6: Agent Wars — "Competition & Mastery"

*Optimize, compete, and prove your skills on the leaderboard.*

| Week | Lesson | Title | You Build | Key Concepts |
|------|--------|-------|-----------|--------------|
| 1 | 6.1 | The Arena | Agent Wars CLI submission tool | Competition format, scoring criteria, submission workflow |
| 1 | 6.2 | Replay Analysis | Tool that analyzes past winning submissions | Pattern recognition, strategy extraction, benchmarking |
| 2 | 6.3 | Speed Demon | Parallel processing optimization harness | `Promise.all`, request batching, streaming, caching |
| 2 | 6.4 | The Economist | Cost optimizer: model routing + token efficiency | Haiku/Sonnet/Opus routing, prompt compression, caching |
| 3 | 6.5 | The Fortress | Robustness testing framework | Edge cases, fuzzing, timeout handling, graceful degradation |
| 3 | 6.6 | Test Like a Pro | Property-based testing for AI systems | Invariant testing, output validation, regression suites |
| 4 | 6.7 | War Games | Practice challenge with full scoring | End-to-end challenge simulation, scoring, optimization |
| 4 | 6.8 | **CAPSTONE:** Agent Wars — Final Battle | Live competitive submission | Full competition, leaderboard ranking, retrospective |

---

## DETAILED MONTH 1: FOUNDATION

### Prerequisites

Before starting Month 1, ensure you have:
- Node.js v18+ installed (`node --version`)
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))
- A terminal you're comfortable in
- Basic JavaScript/TypeScript knowledge (variables, functions, async/await, arrays, objects)

### Setup

Run this in your terminal to initialize the lesson workspace:

```bash
mkdir claude-academy && cd claude-academy
npm init -y
npm install @anthropic-ai/sdk typescript ts-node @types/node
npx tsc --init --target ES2020 --module commonjs --strict true --esModuleInterop true
```

Set your API key:

```bash
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

---

## Lesson 1.1: The First Signal

**ID:** `m1-w1-the-first-signal`
**Difficulty:** ★☆☆☆☆
**Time:** 20 minutes
**Produces:** `lessons/m1/01-first-signal.ts`

### Briefing

Every journey starts with a single signal. Before you build agents that orchestrate fleets of AI workers, before you ship products that thousands of people use, before you compete in Agent Wars — you need to make one API call.

That's this lesson. One call. One response. Proof that the connection between your machine and Claude is alive.

### Concepts

The Anthropic SDK wraps Claude's Messages API. At its core, every interaction with Claude follows this pattern:

```
You → messages.create({ model, max_tokens, messages }) → Claude → Response
```

The `messages` array is a conversation. Each message has a `role` ("user" or "assistant") and `content` (what was said). You always start with a "user" message. Claude always replies as "assistant".

```typescript
import Anthropic from "@anthropic-ai/sdk";

// The client reads ANTHROPIC_API_KEY from your environment automatically
const client = new Anthropic();

// Every API call goes through messages.create()
const response = await client.messages.create({
  model: "claude-sonnet-4-5-20250514",  // Which Claude model to use
  max_tokens: 256,                       // Maximum response length
  messages: [
    { role: "user", content: "Say hello in one sentence." }
  ],
});

// The response contains an array of content blocks
// For text responses, there's usually one TextBlock
console.log(response.content[0].text);
```

Three required parameters. That's it. `model` tells Claude which brain to use. `max_tokens` caps the response length. `messages` is the conversation.

### Challenge

Create a file called `lessons/m1/01-first-signal.ts` that:

1. Imports the Anthropic SDK
2. Creates a client instance
3. Sends a message to Claude asking: `"What is the first rule of building AI systems?"`
4. Prints Claude's response text to `stdout`
5. Exits cleanly with code `0`

Your file must export an async function called `firstSignal` that returns the full API response object.

### Starter Code

```typescript
// lessons/m1/01-first-signal.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function firstSignal(): Promise<Anthropic.Message> {
  // YOUR CODE HERE
  // 1. Call client.messages.create() with:
  //    - model: "claude-sonnet-4-5-20250514"
  //    - max_tokens: 256
  //    - messages: ask "What is the first rule of building AI systems?"
  // 2. Return the response
}

// Run when executed directly
async function main() {
  const response = await firstSignal();
  console.log(response.content[0].type === "text" ? response.content[0].text : "");
}

main().catch(console.error);
```

### Test Specification

```typescript
// tests/m1/01-first-signal.test.ts
import { firstSignal } from "../../lessons/m1/01-first-signal";

describe("Lesson 1.1: The First Signal", () => {
  jest.setTimeout(30000); // API calls can take time

  let response: any;

  beforeAll(async () => {
    response = await firstSignal();
  });

  test("returns a valid Message object", () => {
    expect(response).toBeDefined();
    expect(response.type).toBe("message");
    expect(response.role).toBe("assistant");
  });

  test("has a non-empty content array", () => {
    expect(response.content).toBeInstanceOf(Array);
    expect(response.content.length).toBeGreaterThan(0);
  });

  test("first content block is text", () => {
    expect(response.content[0].type).toBe("text");
    expect(typeof response.content[0].text).toBe("string");
    expect(response.content[0].text.length).toBeGreaterThan(0);
  });

  test("used the correct model", () => {
    expect(response.model).toContain("claude");
  });

  test("has usage information", () => {
    expect(response.usage).toBeDefined();
    expect(typeof response.usage.input_tokens).toBe("number");
    expect(typeof response.usage.output_tokens).toBe("number");
    expect(response.usage.input_tokens).toBeGreaterThan(0);
    expect(response.usage.output_tokens).toBeGreaterThan(0);
  });

  test("stop reason is end_turn", () => {
    expect(response.stop_reason).toBe("end_turn");
  });
});
```

### Hints

**Level 1 — Nudge:**
> The function body is just two lines: one `await` call and one `return`. Look at the Concepts section — the exact method signature is right there.

**Level 2 — Direction:**
> ```typescript
> const response = await client.messages.create({
>   model: "claude-sonnet-4-5-20250514",
>   max_tokens: 256,
>   messages: [{ role: "user", content: "..." }],
> });
> return response;
> ```

**Level 3 — Solution:**
> ```typescript
> export async function firstSignal(): Promise<Anthropic.Message> {
>   const response = await client.messages.create({
>     model: "claude-sonnet-4-5-20250514",
>     max_tokens: 256,
>     messages: [
>       { role: "user", content: "What is the first rule of building AI systems?" }
>     ],
>   });
>   return response;
> }
> ```

---

## Lesson 1.2: Anatomy of a Response

**ID:** `m1-w1-anatomy-of-response`
**Difficulty:** ★☆☆☆☆
**Time:** 25 minutes
**Produces:** `lessons/m1/02-anatomy.ts`

### Briefing

You made the call. Claude answered. But what exactly came back?

The response object is richer than you think. It tells you *what* Claude said, *how much* it cost you, *why* it stopped talking, and *which model* actually handled the request. A good AI engineer doesn't just read the text — they read the metadata.

### Concepts

Every response from `messages.create()` returns a `Message` object with this structure:

```typescript
interface Message {
  id: string;              // Unique message ID (e.g., "msg_01XFDUd...")
  type: "message";         // Always "message"
  role: "assistant";       // Always "assistant"
  model: string;           // Actual model used (e.g., "claude-sonnet-4-5-20250514")
  content: ContentBlock[]; // Array of content blocks
  stop_reason: string;     // Why Claude stopped: "end_turn" | "max_tokens" | "stop_sequence"
  usage: {
    input_tokens: number;  // Tokens in your prompt
    output_tokens: number; // Tokens in Claude's response
  };
}
```

The `content` array usually has one `TextBlock`, but it can contain multiple blocks (especially with tool use, which you'll learn in Month 3). Always iterate or check:

```typescript
// Safe way to extract all text from a response
function extractText(response: Anthropic.Message): string {
  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}
```

The `stop_reason` is critical for building robust systems:
- `"end_turn"` — Claude finished naturally. All good.
- `"max_tokens"` — Claude was cut off mid-sentence. You might need more tokens.
- `"stop_sequence"` — Claude hit a custom stop sequence you defined.
- `"tool_use"` — Claude wants to call a tool (Month 3 territory).

### Challenge

Create `lessons/m1/02-anatomy.ts` that exports a function called `analyzeResponse` which:

1. Makes an API call asking Claude to `"Explain what an API is in exactly 3 sentences."`
2. Returns an analysis object with this shape:

```typescript
interface ResponseAnalysis {
  text: string;          // The extracted text content
  model: string;         // The model that responded
  stopReason: string;    // Why Claude stopped
  inputTokens: number;   // Tokens you sent
  outputTokens: number;  // Tokens Claude returned
  totalTokens: number;   // Sum of input + output
  messageId: string;     // The unique message ID
  contentBlocks: number; // How many content blocks in the response
}
```

### Starter Code

```typescript
// lessons/m1/02-anatomy.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface ResponseAnalysis {
  text: string;
  model: string;
  stopReason: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  messageId: string;
  contentBlocks: number;
}

export async function analyzeResponse(): Promise<ResponseAnalysis> {
  // YOUR CODE HERE
  // 1. Call messages.create() asking Claude to explain APIs in 3 sentences
  // 2. Extract each field from the response
  // 3. Return the ResponseAnalysis object
}

async function main() {
  const analysis = await analyzeResponse();
  console.log("=== Response Analysis ===");
  console.log(`Message ID:     ${analysis.messageId}`);
  console.log(`Model:          ${analysis.model}`);
  console.log(`Stop Reason:    ${analysis.stopReason}`);
  console.log(`Input Tokens:   ${analysis.inputTokens}`);
  console.log(`Output Tokens:  ${analysis.outputTokens}`);
  console.log(`Total Tokens:   ${analysis.totalTokens}`);
  console.log(`Content Blocks: ${analysis.contentBlocks}`);
  console.log(`\nText:\n${analysis.text}`);
}

main().catch(console.error);
```

### Test Specification

```typescript
// tests/m1/02-anatomy.test.ts
import { analyzeResponse, ResponseAnalysis } from "../../lessons/m1/02-anatomy";

describe("Lesson 1.2: Anatomy of a Response", () => {
  jest.setTimeout(30000);

  let analysis: ResponseAnalysis;

  beforeAll(async () => {
    analysis = await analyzeResponse();
  });

  test("extracts non-empty text", () => {
    expect(typeof analysis.text).toBe("string");
    expect(analysis.text.length).toBeGreaterThan(20);
  });

  test("captures the model name", () => {
    expect(analysis.model).toContain("claude");
  });

  test("captures stop reason", () => {
    expect(["end_turn", "max_tokens", "stop_sequence"]).toContain(analysis.stopReason);
  });

  test("tracks input tokens", () => {
    expect(analysis.inputTokens).toBeGreaterThan(0);
  });

  test("tracks output tokens", () => {
    expect(analysis.outputTokens).toBeGreaterThan(0);
  });

  test("calculates total tokens correctly", () => {
    expect(analysis.totalTokens).toBe(analysis.inputTokens + analysis.outputTokens);
  });

  test("captures a valid message ID", () => {
    expect(analysis.messageId).toMatch(/^msg_/);
  });

  test("counts content blocks", () => {
    expect(analysis.contentBlocks).toBeGreaterThanOrEqual(1);
  });
});
```

### Hints

**Level 1 — Nudge:**
> You already know how to make the API call from Lesson 1.1. Now just read the right fields off the response object. Check the `Message` interface in the Concepts section.

**Level 2 — Direction:**
> ```typescript
> const response = await client.messages.create({ ... });
> // response.content[0].text → the text
> // response.usage.input_tokens → input tokens
> // response.id → message ID
> ```

**Level 3 — Solution:**
> ```typescript
> export async function analyzeResponse(): Promise<ResponseAnalysis> {
>   const response = await client.messages.create({
>     model: "claude-sonnet-4-5-20250514",
>     max_tokens: 256,
>     messages: [
>       { role: "user", content: "Explain what an API is in exactly 3 sentences." }
>     ],
>   });
>
>   const text = response.content
>     .filter((block): block is Anthropic.TextBlock => block.type === "text")
>     .map((block) => block.text)
>     .join("\n");
>
>   return {
>     text,
>     model: response.model,
>     stopReason: response.stop_reason,
>     inputTokens: response.usage.input_tokens,
>     outputTokens: response.usage.output_tokens,
>     totalTokens: response.usage.input_tokens + response.usage.output_tokens,
>     messageId: response.id,
>     contentBlocks: response.content.length,
>   };
> }
> ```

---

## Lesson 1.3: The Conversation Loop

**ID:** `m1-w2-conversation-loop`
**Difficulty:** ★★☆☆☆
**Time:** 30 minutes
**Produces:** `lessons/m1/03-conversation-loop.ts`

### Briefing

One-shot questions are fine for demos. Real applications have *conversations*. The user says something, Claude responds, the user responds to that, Claude builds on the history — back and forth, context accumulating.

The trick: Claude has no memory between API calls. *You* maintain the conversation history. Every call sends the entire conversation back to Claude, and Claude sees it fresh each time.

### Concepts

A conversation is just an array of messages that grows over time:

```typescript
const messages: Anthropic.MessageParam[] = [];

// User says something
messages.push({ role: "user", content: userInput });

// Claude responds
const response = await client.messages.create({
  model: "claude-sonnet-4-5-20250514",
  max_tokens: 512,
  messages,  // Send the ENTIRE history every time
});

// Add Claude's response to the history
const assistantText = response.content
  .filter((b): b is Anthropic.TextBlock => b.type === "text")
  .map((b) => b.text)
  .join("\n");

messages.push({ role: "assistant", content: assistantText });

// Next user message continues the conversation...
```

For CLI interaction, use Node's built-in `readline`:

```typescript
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}
```

### Challenge

Create `lessons/m1/03-conversation-loop.ts` that exports a `ChatBot` class:

```typescript
class ChatBot {
  private messages: Anthropic.MessageParam[] = [];

  // Send a user message, get Claude's text response back
  async send(userMessage: string): Promise<string> { ... }

  // Return the full conversation history
  getHistory(): Anthropic.MessageParam[] { ... }

  // Reset the conversation
  clear(): void { ... }
}
```

When run directly, the file should start an interactive CLI loop:
- Prompt with `"you> "`
- Print Claude's response with `"claude> "` prefix
- Exit when user types `"exit"` or `"quit"`
- Print `"Goodbye!"` on exit

### Starter Code

```typescript
// lessons/m1/03-conversation-loop.ts
import Anthropic from "@anthropic-ai/sdk";
import * as readline from "readline";

const client = new Anthropic();

export class ChatBot {
  private messages: Anthropic.MessageParam[] = [];

  async send(userMessage: string): Promise<string> {
    // YOUR CODE HERE
    // 1. Push the user message onto this.messages
    // 2. Call client.messages.create() with the full history
    // 3. Extract the text from the response
    // 4. Push the assistant message onto this.messages
    // 5. Return the text
  }

  getHistory(): Anthropic.MessageParam[] {
    // YOUR CODE HERE
  }

  clear(): void {
    // YOUR CODE HERE
  }
}

// Interactive CLI (runs when executed directly)
async function main() {
  const bot = new ChatBot();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (q: string): Promise<string> =>
    new Promise((resolve) => rl.question(q, resolve));

  console.log('Claude Chat (type "exit" to quit)\n');

  while (true) {
    const input = await prompt("you> ");
    if (input.toLowerCase() === "exit" || input.toLowerCase() === "quit") {
      console.log("Goodbye!");
      rl.close();
      break;
    }
    const reply = await bot.send(input);
    console.log(`\nclaude> ${reply}\n`);
  }
}

// Only run main() if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}
```

### Test Specification

```typescript
// tests/m1/03-conversation-loop.test.ts
import { ChatBot } from "../../lessons/m1/03-conversation-loop";

describe("Lesson 1.3: The Conversation Loop", () => {
  jest.setTimeout(60000);

  let bot: ChatBot;

  beforeEach(() => {
    bot = new ChatBot();
  });

  test("sends a message and gets a string response", async () => {
    const reply = await bot.send("Say the word 'hello' and nothing else.");
    expect(typeof reply).toBe("string");
    expect(reply.length).toBeGreaterThan(0);
  });

  test("maintains conversation history", async () => {
    await bot.send("My name is TestUser. Remember this.");
    const history = bot.getHistory();
    expect(history.length).toBe(2); // user + assistant
    expect(history[0].role).toBe("user");
    expect(history[1].role).toBe("assistant");
  });

  test("preserves context across turns", async () => {
    await bot.send("My favorite color is indigo. Remember this.");
    const reply = await bot.send("What is my favorite color?");
    expect(reply.toLowerCase()).toContain("indigo");
  });

  test("history grows with each exchange", async () => {
    await bot.send("First message.");
    await bot.send("Second message.");
    await bot.send("Third message.");
    const history = bot.getHistory();
    expect(history.length).toBe(6); // 3 user + 3 assistant
  });

  test("clear() resets the conversation", async () => {
    await bot.send("Remember the secret code: PHOENIX.");
    expect(bot.getHistory().length).toBe(2);
    bot.clear();
    expect(bot.getHistory().length).toBe(0);
  });

  test("after clear(), context is lost", async () => {
    await bot.send("The password is ZEBRA42. Remember it.");
    bot.clear();
    const reply = await bot.send(
      "What was the password I told you? If you don't know, say 'I don't know'."
    );
    expect(reply.toLowerCase()).not.toContain("zebra42");
  });
});
```

### Hints

**Level 1 — Nudge:**
> `send()` does four things in order: push user message, call API, extract text, push assistant message. The history array is the conversation's memory.

**Level 2 — Direction:**
> ```typescript
> this.messages.push({ role: "user", content: userMessage });
> const response = await client.messages.create({ ... messages: this.messages });
> // extract text from response.content
> this.messages.push({ role: "assistant", content: text });
> return text;
> ```

**Level 3 — Solution:**
> ```typescript
> async send(userMessage: string): Promise<string> {
>   this.messages.push({ role: "user", content: userMessage });
>   const response = await client.messages.create({
>     model: "claude-sonnet-4-5-20250514",
>     max_tokens: 512,
>     messages: this.messages,
>   });
>   const text = response.content
>     .filter((b): b is Anthropic.TextBlock => b.type === "text")
>     .map((b) => b.text)
>     .join("\n");
>   this.messages.push({ role: "assistant", content: text });
>   return text;
> }
>
> getHistory(): Anthropic.MessageParam[] {
>   return [...this.messages];
> }
>
> clear(): void {
>   this.messages = [];
> }
> ```

---

## Lesson 1.4: Memory Palace

**ID:** `m1-w2-memory-palace`
**Difficulty:** ★★☆☆☆
**Time:** 30 minutes
**Produces:** `lessons/m1/04-memory-palace.ts`

### Briefing

Your chatbot has memory now — but only while the process is running. Kill the terminal, lose the conversation. That's fine for demos, useless for real tools.

In this lesson, you'll give your chatbot a persistent memory by saving conversation history to disk as JSON. When the user restarts the app, the conversation picks up right where it left off.

### Concepts

Node's `fs` module handles file I/O. Use the Promise-based version (`fs/promises`) with async/await:

```typescript
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";

// Save data as JSON
async function saveJSON(filePath: string, data: unknown): Promise<void> {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Load data from JSON
async function loadJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback; // File doesn't exist yet — use fallback
  }
}
```

The pattern for persistent conversations:
1. On startup → load history from file
2. After each exchange → save updated history to file
3. On "clear" → delete the file or write an empty array

### Challenge

Create `lessons/m1/04-memory-palace.ts` that exports a `PersistentChat` class:

```typescript
class PersistentChat {
  constructor(historyPath: string) { ... }

  // Load conversation history from disk
  async load(): Promise<void> { ... }

  // Send a message (also saves to disk after each exchange)
  async send(userMessage: string): Promise<string> { ... }

  // Return the conversation history
  getHistory(): Anthropic.MessageParam[] { ... }

  // Clear history from memory AND disk
  async clear(): Promise<void> { ... }

  // Return the number of exchanges (pairs of user+assistant messages)
  getExchangeCount(): number { ... }
}
```

Requirements:
- History saved as JSON after every `send()` call
- `load()` restores history from disk (call it before first `send()`)
- `clear()` removes the history file from disk
- `getExchangeCount()` returns the number of complete user/assistant pairs

### Starter Code

```typescript
// lessons/m1/04-memory-palace.ts
import Anthropic from "@anthropic-ai/sdk";
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";

const client = new Anthropic();

export class PersistentChat {
  private messages: Anthropic.MessageParam[] = [];
  private historyPath: string;

  constructor(historyPath: string) {
    this.historyPath = historyPath;
  }

  async load(): Promise<void> {
    // YOUR CODE HERE
    // Load messages from this.historyPath (JSON file)
    // If file doesn't exist, start with empty array
  }

  async send(userMessage: string): Promise<string> {
    // YOUR CODE HERE
    // 1. Push user message
    // 2. Call API with full history
    // 3. Extract text, push assistant message
    // 4. Save updated history to disk
    // 5. Return the text
  }

  getHistory(): Anthropic.MessageParam[] {
    // YOUR CODE HERE
  }

  async clear(): Promise<void> {
    // YOUR CODE HERE
    // Reset in-memory messages AND delete the file from disk
  }

  getExchangeCount(): number {
    // YOUR CODE HERE
    // Each exchange = 1 user message + 1 assistant message
  }

  private async save(): Promise<void> {
    // YOUR CODE HERE
    // Ensure directory exists, then write this.messages as JSON
  }
}
```

### Test Specification

```typescript
// tests/m1/04-memory-palace.test.ts
import { PersistentChat } from "../../lessons/m1/04-memory-palace";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import * as path from "path";

const TEST_HISTORY = path.join(__dirname, "../../.test-data/test-history.json");

describe("Lesson 1.4: Memory Palace", () => {
  jest.setTimeout(60000);

  beforeEach(async () => {
    // Clean up test file before each test
    if (existsSync(TEST_HISTORY)) {
      await unlink(TEST_HISTORY);
    }
  });

  afterAll(async () => {
    if (existsSync(TEST_HISTORY)) {
      await unlink(TEST_HISTORY);
    }
  });

  test("starts with empty history", async () => {
    const chat = new PersistentChat(TEST_HISTORY);
    await chat.load();
    expect(chat.getHistory().length).toBe(0);
    expect(chat.getExchangeCount()).toBe(0);
  });

  test("saves history to disk after send()", async () => {
    const chat = new PersistentChat(TEST_HISTORY);
    await chat.load();
    await chat.send("Test message — respond with one word.");
    expect(existsSync(TEST_HISTORY)).toBe(true);
  });

  test("persists history across instances", async () => {
    // First instance: have a conversation
    const chat1 = new PersistentChat(TEST_HISTORY);
    await chat1.load();
    await chat1.send("Remember the code word: NEPTUNE.");

    // Second instance: load the same file
    const chat2 = new PersistentChat(TEST_HISTORY);
    await chat2.load();
    expect(chat2.getHistory().length).toBe(2);
    expect(chat2.getExchangeCount()).toBe(1);

    // Verify context is maintained
    const reply = await chat2.send("What code word did I give you?");
    expect(reply.toLowerCase()).toContain("neptune");
  });

  test("clear() removes the history file", async () => {
    const chat = new PersistentChat(TEST_HISTORY);
    await chat.load();
    await chat.send("Temporary message.");
    expect(existsSync(TEST_HISTORY)).toBe(true);

    await chat.clear();
    expect(chat.getHistory().length).toBe(0);
    expect(existsSync(TEST_HISTORY)).toBe(false);
  });

  test("getExchangeCount() counts pairs correctly", async () => {
    const chat = new PersistentChat(TEST_HISTORY);
    await chat.load();
    await chat.send("First exchange.");
    await chat.send("Second exchange.");
    expect(chat.getExchangeCount()).toBe(2);
  });
});
```

### Hints

**Level 1 — Nudge:**
> The `save()` method is the key. Call it at the end of `send()`. Use `mkdir` with `{ recursive: true }` to ensure the directory exists before writing.

**Level 2 — Direction:**
> ```typescript
> private async save(): Promise<void> {
>   const dir = path.dirname(this.historyPath);
>   if (!existsSync(dir)) await mkdir(dir, { recursive: true });
>   await writeFile(this.historyPath, JSON.stringify(this.messages, null, 2));
> }
> ```

**Level 3 — Solution:**
> ```typescript
> async load(): Promise<void> {
>   try {
>     const raw = await readFile(this.historyPath, "utf-8");
>     this.messages = JSON.parse(raw);
>   } catch {
>     this.messages = [];
>   }
> }
>
> async send(userMessage: string): Promise<string> {
>   this.messages.push({ role: "user", content: userMessage });
>   const response = await client.messages.create({
>     model: "claude-sonnet-4-5-20250514",
>     max_tokens: 512,
>     messages: this.messages,
>   });
>   const text = response.content
>     .filter((b): b is Anthropic.TextBlock => b.type === "text")
>     .map((b) => b.text)
>     .join("\n");
>   this.messages.push({ role: "assistant", content: text });
>   await this.save();
>   return text;
> }
>
> getHistory(): Anthropic.MessageParam[] {
>   return [...this.messages];
> }
>
> async clear(): Promise<void> {
>   this.messages = [];
>   try { await unlink(this.historyPath); } catch {}
> }
>
> getExchangeCount(): number {
>   return Math.floor(this.messages.length / 2);
> }
> ```

---

## Lesson 1.5: The Token Economy

**ID:** `m1-w3-token-economy`
**Difficulty:** ★★☆☆☆
**Time:** 25 minutes
**Produces:** `lessons/m1/05-token-economy.ts`

### Briefing

Every word costs money. Every token you send to Claude gets billed. Every token Claude sends back gets billed. If you're building production AI systems, you need to understand the economy.

This lesson teaches you to think in tokens: count them, estimate costs, and make informed decisions about `max_tokens`.

### Concepts

Tokens are pieces of words. Roughly: 1 token ≈ 4 characters of English text, or about ¾ of a word. The exact count depends on the tokenizer, but for planning purposes:

```
"Hello, world!" → ~4 tokens
A 500-word email → ~650 tokens
A full page of text → ~800 tokens
```

Pricing (as of 2025, Claude Sonnet):
- Input: $3.00 per million tokens
- Output: $15.00 per million tokens

Output tokens cost 5x more than input tokens. This matters for your `max_tokens` setting — setting it to 4096 when you only need 256 wastes nothing (you're only billed for tokens *actually generated*), but it does let Claude ramble.

The `usage` field in every response tells you exactly what you spent:

```typescript
const response = await client.messages.create({ ... });
console.log(response.usage);
// { input_tokens: 42, output_tokens: 128 }
```

### Challenge

Create `lessons/m1/05-token-economy.ts` that exports a `TokenTracker` class:

```typescript
class TokenTracker {
  // Make an API call and track the token usage
  async ask(question: string, maxTokens?: number): Promise<string> { ... }

  // Get cumulative usage stats
  getStats(): TokenStats { ... }

  // Estimate the cost in USD given pricing
  estimateCost(inputPricePerMillion: number, outputPricePerMillion: number): number { ... }

  // Reset all tracking
  reset(): void { ... }
}

interface TokenStats {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  requestCount: number;
  avgInputTokens: number;
  avgOutputTokens: number;
}
```

### Starter Code

```typescript
// lessons/m1/05-token-economy.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface TokenStats {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  requestCount: number;
  avgInputTokens: number;
  avgOutputTokens: number;
}

export class TokenTracker {
  private inputTokens: number = 0;
  private outputTokens: number = 0;
  private requests: number = 0;

  async ask(question: string, maxTokens: number = 256): Promise<string> {
    // YOUR CODE HERE
    // 1. Make the API call
    // 2. Add usage to running totals
    // 3. Increment request count
    // 4. Return the text
  }

  getStats(): TokenStats {
    // YOUR CODE HERE
    // Return all stats, with averages calculated from totals / requestCount
  }

  estimateCost(
    inputPricePerMillion: number,
    outputPricePerMillion: number
  ): number {
    // YOUR CODE HERE
    // Calculate: (inputTokens * inputPrice / 1_000_000)
    //          + (outputTokens * outputPrice / 1_000_000)
  }

  reset(): void {
    // YOUR CODE HERE
  }
}

async function main() {
  const tracker = new TokenTracker();

  await tracker.ask("What is TypeScript?");
  await tracker.ask("What is Node.js?");
  await tracker.ask("What is an API?");

  const stats = tracker.getStats();
  console.log("=== Token Report ===");
  console.log(`Requests:       ${stats.requestCount}`);
  console.log(`Total Input:    ${stats.totalInputTokens} tokens`);
  console.log(`Total Output:   ${stats.totalOutputTokens} tokens`);
  console.log(`Total:          ${stats.totalTokens} tokens`);
  console.log(`Avg Input/req:  ${stats.avgInputTokens.toFixed(1)} tokens`);
  console.log(`Avg Output/req: ${stats.avgOutputTokens.toFixed(1)} tokens`);

  // Sonnet pricing
  const cost = tracker.estimateCost(3.0, 15.0);
  console.log(`\nEstimated cost: $${cost.toFixed(6)}`);
}

if (require.main === module) {
  main().catch(console.error);
}
```

### Test Specification

```typescript
// tests/m1/05-token-economy.test.ts
import { TokenTracker } from "../../lessons/m1/05-token-economy";

describe("Lesson 1.5: The Token Economy", () => {
  jest.setTimeout(60000);

  let tracker: TokenTracker;

  beforeEach(() => {
    tracker = new TokenTracker();
  });

  test("tracks tokens from a single request", async () => {
    await tracker.ask("Say 'test' and nothing else.", 64);
    const stats = tracker.getStats();
    expect(stats.requestCount).toBe(1);
    expect(stats.totalInputTokens).toBeGreaterThan(0);
    expect(stats.totalOutputTokens).toBeGreaterThan(0);
    expect(stats.totalTokens).toBe(
      stats.totalInputTokens + stats.totalOutputTokens
    );
  });

  test("accumulates tokens across multiple requests", async () => {
    await tracker.ask("Say 'one'.", 64);
    const after1 = tracker.getStats().totalTokens;

    await tracker.ask("Say 'two'.", 64);
    const after2 = tracker.getStats().totalTokens;

    expect(after2).toBeGreaterThan(after1);
    expect(tracker.getStats().requestCount).toBe(2);
  });

  test("calculates averages correctly", async () => {
    await tracker.ask("Say 'a'.", 64);
    await tracker.ask("Say 'b'.", 64);
    const stats = tracker.getStats();
    expect(stats.avgInputTokens).toBe(stats.totalInputTokens / 2);
    expect(stats.avgOutputTokens).toBe(stats.totalOutputTokens / 2);
  });

  test("estimates cost correctly", async () => {
    await tracker.ask("Say 'cost test'.", 64);
    const stats = tracker.getStats();
    const cost = tracker.estimateCost(3.0, 15.0);
    const expected =
      (stats.totalInputTokens * 3.0) / 1_000_000 +
      (stats.totalOutputTokens * 15.0) / 1_000_000;
    expect(cost).toBeCloseTo(expected, 10);
  });

  test("reset() clears all tracking", async () => {
    await tracker.ask("Test message.", 64);
    tracker.reset();
    const stats = tracker.getStats();
    expect(stats.requestCount).toBe(0);
    expect(stats.totalTokens).toBe(0);
    expect(stats.avgInputTokens).toBe(0);
  });

  test("respects custom maxTokens parameter", async () => {
    const shortReply = await tracker.ask("Write a very long poem about the sea.", 16);
    // With only 16 max tokens, the response should be very short
    expect(shortReply.length).toBeLessThan(200);
  });
});
```

### Hints

**Level 1 — Nudge:**
> This is mostly bookkeeping. The API call itself is identical to Lesson 1.1. The new part is reading `response.usage.input_tokens` and `response.usage.output_tokens` and adding them to running totals.

**Level 2 — Direction:**
> In `ask()`:
> ```typescript
> this.inputTokens += response.usage.input_tokens;
> this.outputTokens += response.usage.output_tokens;
> this.requests++;
> ```

**Level 3 — Solution:**
> ```typescript
> async ask(question: string, maxTokens: number = 256): Promise<string> {
>   const response = await client.messages.create({
>     model: "claude-sonnet-4-5-20250514",
>     max_tokens: maxTokens,
>     messages: [{ role: "user", content: question }],
>   });
>   this.inputTokens += response.usage.input_tokens;
>   this.outputTokens += response.usage.output_tokens;
>   this.requests++;
>   return response.content
>     .filter((b): b is Anthropic.TextBlock => b.type === "text")
>     .map((b) => b.text)
>     .join("\n");
> }
>
> getStats(): TokenStats {
>   return {
>     totalInputTokens: this.inputTokens,
>     totalOutputTokens: this.outputTokens,
>     totalTokens: this.inputTokens + this.outputTokens,
>     requestCount: this.requests,
>     avgInputTokens: this.requests > 0 ? this.inputTokens / this.requests : 0,
>     avgOutputTokens: this.requests > 0 ? this.outputTokens / this.requests : 0,
>   };
> }
>
> estimateCost(inputPricePerMillion: number, outputPricePerMillion: number): number {
>   return (
>     (this.inputTokens * inputPricePerMillion) / 1_000_000 +
>     (this.outputTokens * outputPricePerMillion) / 1_000_000
>   );
> }
>
> reset(): void {
>   this.inputTokens = 0;
>   this.outputTokens = 0;
>   this.requests = 0;
> }
> ```

---

## Lesson 1.6: Tuning the Dial

**ID:** `m1-w3-tuning-the-dial`
**Difficulty:** ★★☆☆☆
**Time:** 25 minutes
**Produces:** `lessons/m1/06-tuning-the-dial.ts`

### Briefing

Temperature controls randomness. At 0.0, Claude gives you the most likely response — predictable, consistent, boring. At 1.0, Claude gets creative — varied, surprising, sometimes unhinged. Your job as an architect is to pick the right setting for the task.

Code generation? Temperature 0. Poetry? Temperature 0.8. Brainstorming? Push it up. Data extraction? Lock it down.

### Concepts

```typescript
const response = await client.messages.create({
  model: "claude-sonnet-4-5-20250514",
  max_tokens: 256,
  temperature: 0.0,  // Deterministic — same input → (nearly) same output
  messages: [{ role: "user", content: "Name a color." }],
});
```

Temperature range: `0.0` to `1.0`. Default is `1.0`.

There's also `top_p` (nucleus sampling) — instead of adjusting randomness globally, it restricts the pool of tokens Claude considers. In practice, you rarely need to set both. Use `temperature` for 99% of use cases.

The key insight: **temperature isn't about quality. It's about variance.** Low temperature = low variance between runs. High temperature = high variance. Both can produce high-quality output.

### Challenge

Create `lessons/m1/06-tuning-the-dial.ts` that exports a `TemperatureLab` class:

```typescript
class TemperatureLab {
  // Ask the same question at a specific temperature
  async sample(prompt: string, temperature: number): Promise<string> { ... }

  // Ask the same question N times at a given temperature, return all responses
  async multiSample(
    prompt: string,
    temperature: number,
    count: number
  ): Promise<string[]> { ... }

  // Calculate similarity score between responses (0-1, where 1 = identical)
  measureVariance(responses: string[]): number { ... }
}
```

The `measureVariance()` method should return a number between 0 and 1 representing how *different* the responses are from each other. Use a simple approach: compare each pair of responses and count the ratio of shared words. (This is intentionally simple — you're learning the SDK, not NLP.)

### Starter Code

```typescript
// lessons/m1/06-tuning-the-dial.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export class TemperatureLab {
  async sample(prompt: string, temperature: number): Promise<string> {
    // YOUR CODE HERE
    // Make a single API call with the given temperature
  }

  async multiSample(
    prompt: string,
    temperature: number,
    count: number
  ): Promise<string[]> {
    // YOUR CODE HERE
    // Call sample() `count` times and collect the results
    // (Sequential is fine — don't parallelize for now)
  }

  measureVariance(responses: string[]): number {
    // YOUR CODE HERE
    // Compare each pair of responses
    // Use word overlap: intersection / union (Jaccard similarity)
    // Return 1 - average_similarity (so 0 = all identical, 1 = all different)
  }
}

async function main() {
  const lab = new TemperatureLab();
  const prompt = "Name a single fruit. Respond with just the fruit name, nothing else.";

  console.log("=== Temperature Experiment ===\n");

  for (const temp of [0.0, 0.5, 1.0]) {
    console.log(`Temperature: ${temp}`);
    const responses = await lab.multiSample(prompt, temp, 5);
    const variance = lab.measureVariance(responses);
    console.log(`  Responses: ${responses.join(", ")}`);
    console.log(`  Variance:  ${variance.toFixed(3)}\n`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
```

### Test Specification

```typescript
// tests/m1/06-tuning-the-dial.test.ts
import { TemperatureLab } from "../../lessons/m1/06-tuning-the-dial";

describe("Lesson 1.6: Tuning the Dial", () => {
  jest.setTimeout(120000); // Multiple API calls

  let lab: TemperatureLab;

  beforeAll(() => {
    lab = new TemperatureLab();
  });

  test("sample() returns a string at temperature 0", async () => {
    const result = await lab.sample("Say 'hello'.", 0.0);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("sample() returns a string at temperature 1", async () => {
    const result = await lab.sample("Say 'hello'.", 1.0);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("multiSample() returns the correct number of responses", async () => {
    const results = await lab.multiSample("Name a color.", 0.5, 3);
    expect(results.length).toBe(3);
    results.forEach((r) => {
      expect(typeof r).toBe("string");
      expect(r.length).toBeGreaterThan(0);
    });
  });

  test("measureVariance() returns 0 for identical responses", () => {
    const identical = ["apple", "apple", "apple"];
    expect(lab.measureVariance(identical)).toBe(0);
  });

  test("measureVariance() returns > 0 for different responses", () => {
    const different = ["apple", "banana", "cherry"];
    expect(lab.measureVariance(different)).toBeGreaterThan(0);
  });

  test("measureVariance() returns a value between 0 and 1", () => {
    const mixed = ["red fruit", "blue berry", "red apple"];
    const v = lab.measureVariance(mixed);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(1);
  });

  test("low temperature produces less variance than high temperature", async () => {
    const prompt = "Name a single animal. Reply with just the animal name.";
    const lowTempResponses = await lab.multiSample(prompt, 0.0, 4);
    const highTempResponses = await lab.multiSample(prompt, 1.0, 4);
    const lowVariance = lab.measureVariance(lowTempResponses);
    const highVariance = lab.measureVariance(highTempResponses);
    // Low temperature should produce equal or less variance
    expect(lowVariance).toBeLessThanOrEqual(highVariance + 0.1); // small tolerance
  });
});
```

### Hints

**Level 1 — Nudge:**
> `sample()` is just `messages.create()` with one extra parameter: `temperature`. The `measureVariance()` method is pure JavaScript — split each response into words, then compare sets.

**Level 2 — Direction:**
> Jaccard similarity between two strings:
> ```typescript
> const wordsA = new Set(a.toLowerCase().split(/\s+/));
> const wordsB = new Set(b.toLowerCase().split(/\s+/));
> const intersection = [...wordsA].filter(w => wordsB.has(w)).length;
> const union = new Set([...wordsA, ...wordsB]).size;
> const similarity = union > 0 ? intersection / union : 1;
> ```

**Level 3 — Solution:**
> ```typescript
> async sample(prompt: string, temperature: number): Promise<string> {
>   const response = await client.messages.create({
>     model: "claude-sonnet-4-5-20250514",
>     max_tokens: 256,
>     temperature,
>     messages: [{ role: "user", content: prompt }],
>   });
>   return response.content
>     .filter((b): b is Anthropic.TextBlock => b.type === "text")
>     .map((b) => b.text)
>     .join("\n");
> }
>
> async multiSample(prompt: string, temperature: number, count: number): Promise<string[]> {
>   const results: string[] = [];
>   for (let i = 0; i < count; i++) {
>     results.push(await this.sample(prompt, temperature));
>   }
>   return results;
> }
>
> measureVariance(responses: string[]): number {
>   if (responses.length < 2) return 0;
>   const wordSets = responses.map(r => new Set(r.toLowerCase().split(/\s+/)));
>   let totalSimilarity = 0;
>   let pairs = 0;
>   for (let i = 0; i < wordSets.length; i++) {
>     for (let j = i + 1; j < wordSets.length; j++) {
>       const intersection = [...wordSets[i]].filter(w => wordSets[j].has(w)).length;
>       const union = new Set([...wordSets[i], ...wordSets[j]]).size;
>       totalSimilarity += union > 0 ? intersection / union : 1;
>       pairs++;
>     }
>   }
>   return 1 - totalSimilarity / pairs;
> }
> ```

---

## Lesson 1.7: When Things Break

**ID:** `m1-w4-when-things-break`
**Difficulty:** ★★★☆☆
**Time:** 35 minutes
**Produces:** `lessons/m1/07-when-things-break.ts`

### Briefing

The API will fail. Not if — when. Rate limits hit, networks drop, keys expire, models get overloaded. A production system doesn't crash on the first error. It retries, backs off, degrades gracefully, and tells the user what happened.

This lesson teaches you the error handling patterns that separate toy projects from real tools.

### Concepts

The Anthropic SDK throws typed errors you can catch:

```typescript
import Anthropic from "@anthropic-ai/sdk";

try {
  const response = await client.messages.create({ ... });
} catch (error) {
  if (error instanceof Anthropic.APIError) {
    console.error(`Status: ${error.status}`);
    console.error(`Message: ${error.message}`);

    if (error.status === 429) {
      // Rate limited — back off and retry
    } else if (error.status === 401) {
      // Invalid API key — tell user to check their key
    } else if (error.status === 500 || error.status === 529) {
      // Server error or overloaded — retry with backoff
    }
  }
}
```

**Exponential backoff** is the standard retry pattern:
- Attempt 1: wait 1 second
- Attempt 2: wait 2 seconds
- Attempt 3: wait 4 seconds
- Attempt 4: wait 8 seconds
- Give up after N attempts

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Unreachable");
}
```

### Challenge

Create `lessons/m1/07-when-things-break.ts` that exports a `ResilientClient` class:

```typescript
class ResilientClient {
  constructor(options?: { maxRetries?: number; baseDelay?: number }) { ... }

  // Make an API call with automatic retry logic
  async ask(question: string): Promise<ResilientResponse> { ... }

  // Get retry statistics
  getRetryStats(): RetryStats { ... }
}

interface ResilientResponse {
  text: string;
  attempts: number;      // How many attempts it took (1 = first try worked)
  totalDelay: number;    // Total milliseconds spent waiting between retries
}

interface RetryStats {
  totalRequests: number;
  totalRetries: number;
  totalFailures: number;  // Requests that ultimately failed after all retries
}
```

Requirements:
- Retry on status codes 429 (rate limit), 500, and 529 (overloaded)
- Do NOT retry on 401 (auth error) or 400 (bad request) — re-throw immediately
- Use exponential backoff: `baseDelay * 2^attempt` milliseconds
- Default: 3 max retries, 1000ms base delay
- Track retry statistics

### Starter Code

```typescript
// lessons/m1/07-when-things-break.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface ResilientResponse {
  text: string;
  attempts: number;
  totalDelay: number;
}

export interface RetryStats {
  totalRequests: number;
  totalRetries: number;
  totalFailures: number;
}

export class ResilientClient {
  private maxRetries: number;
  private baseDelay: number;
  private stats: RetryStats = { totalRequests: 0, totalRetries: 0, totalFailures: 0 };

  constructor(options?: { maxRetries?: number; baseDelay?: number }) {
    this.maxRetries = options?.maxRetries ?? 3;
    this.baseDelay = options?.baseDelay ?? 1000;
  }

  async ask(question: string): Promise<ResilientResponse> {
    // YOUR CODE HERE
    // 1. Attempt the API call
    // 2. On retryable error (429, 500, 529): wait with exponential backoff, retry
    // 3. On non-retryable error (401, 400): throw immediately
    // 4. Track attempts and delay
    // 5. Update stats
    // 6. Return ResilientResponse on success, or throw after max retries
  }

  getRetryStats(): RetryStats {
    return { ...this.stats };
  }

  private isRetryable(status: number): boolean {
    // YOUR CODE HERE
    // Return true for 429, 500, 529
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

async function main() {
  const resilient = new ResilientClient({ maxRetries: 3, baseDelay: 1000 });

  try {
    const result = await resilient.ask("What makes error handling important in API integrations?");
    console.log(`Response (${result.attempts} attempt(s), ${result.totalDelay}ms delay):`);
    console.log(result.text);
  } catch (error) {
    console.error("Failed after all retries:", error);
  }

  console.log("\nRetry Stats:", resilient.getRetryStats());
}

if (require.main === module) {
  main().catch(console.error);
}
```

### Test Specification

```typescript
// tests/m1/07-when-things-break.test.ts
import { ResilientClient } from "../../lessons/m1/07-when-things-break";

describe("Lesson 1.7: When Things Break", () => {
  jest.setTimeout(60000);

  test("succeeds on first attempt with valid request", async () => {
    const client = new ResilientClient();
    const result = await client.ask("Say 'ok'.");
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.attempts).toBe(1);
    expect(result.totalDelay).toBe(0);
  });

  test("tracks stats after successful request", async () => {
    const client = new ResilientClient();
    await client.ask("Say 'test'.");
    const stats = client.getRetryStats();
    expect(stats.totalRequests).toBe(1);
    expect(stats.totalRetries).toBe(0);
    expect(stats.totalFailures).toBe(0);
  });

  test("isRetryable correctly identifies retryable status codes", () => {
    const client = new ResilientClient();
    // Access private method via type casting for testing
    const isRetryable = (client as any).isRetryable.bind(client);
    expect(isRetryable(429)).toBe(true);
    expect(isRetryable(500)).toBe(true);
    expect(isRetryable(529)).toBe(true);
    expect(isRetryable(401)).toBe(false);
    expect(isRetryable(400)).toBe(false);
    expect(isRetryable(200)).toBe(false);
  });

  test("constructor accepts custom retry options", () => {
    const client = new ResilientClient({ maxRetries: 5, baseDelay: 500 });
    expect((client as any).maxRetries).toBe(5);
    expect((client as any).baseDelay).toBe(500);
  });

  test("uses default options when none provided", () => {
    const client = new ResilientClient();
    expect((client as any).maxRetries).toBe(3);
    expect((client as any).baseDelay).toBe(1000);
  });

  test("accumulates stats across multiple requests", async () => {
    const client = new ResilientClient();
    await client.ask("First question.");
    await client.ask("Second question.");
    const stats = client.getRetryStats();
    expect(stats.totalRequests).toBe(2);
  });
});
```

### Hints

**Level 1 — Nudge:**
> The `ask()` method is a `for` loop from `0` to `maxRetries`. Inside the loop: `try` the API call, `catch` the error, check if it's retryable, and either wait-and-continue or re-throw.

**Level 2 — Direction:**
> ```typescript
> for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
>   try {
>     const response = await client.messages.create({ ... });
>     // success — return
>   } catch (error) {
>     if (error instanceof Anthropic.APIError && this.isRetryable(error.status)) {
>       if (attempt < this.maxRetries) {
>         const waitTime = this.baseDelay * Math.pow(2, attempt);
>         await this.delay(waitTime);
>         // continue to next attempt
>       }
>     } else {
>       throw error; // non-retryable
>     }
>   }
> }
> ```

**Level 3 — Solution:**
> ```typescript
> async ask(question: string): Promise<ResilientResponse> {
>   this.stats.totalRequests++;
>   let attempts = 0;
>   let totalDelay = 0;
>
>   for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
>     attempts++;
>     try {
>       const response = await client.messages.create({
>         model: "claude-sonnet-4-5-20250514",
>         max_tokens: 512,
>         messages: [{ role: "user", content: question }],
>       });
>       const text = response.content
>         .filter((b): b is Anthropic.TextBlock => b.type === "text")
>         .map((b) => b.text)
>         .join("\n");
>       return { text, attempts, totalDelay };
>     } catch (error) {
>       if (error instanceof Anthropic.APIError && this.isRetryable(error.status)) {
>         this.stats.totalRetries++;
>         if (attempt < this.maxRetries) {
>           const waitTime = this.baseDelay * Math.pow(2, attempt);
>           totalDelay += waitTime;
>           await this.delay(waitTime);
>         } else {
>           this.stats.totalFailures++;
>           throw error;
>         }
>       } else {
>         this.stats.totalFailures++;
>         throw error;
>       }
>     }
>   }
>   throw new Error("Unreachable");
> }
>
> private isRetryable(status: number): boolean {
>   return [429, 500, 529].includes(status);
> }
> ```

---

## Lesson 1.8: CAPSTONE — Ghost in the Shell

**ID:** `m1-w4-ghost-in-the-shell`
**Difficulty:** ★★★★☆
**Time:** 60 minutes
**Produces:** `lessons/m1/08-ghost-in-the-shell.ts`

### Briefing

This is it. Everything from Month 1 comes together in one build.

You're going to create a complete CLI assistant called **Ghost** — a personal AI companion that lives in your terminal. It remembers your conversations across sessions, tracks its own token usage, handles errors gracefully, lets you tune its personality and temperature, and looks good doing it.

This isn't a toy. When you finish this lesson, you'll have a tool you might actually use every day.

### Challenge

Create `lessons/m1/08-ghost-in-the-shell.ts` that implements the **Ghost** CLI assistant.

The assistant must support these commands (entered by the user during the chat):

| Command | Action |
|---------|--------|
| `/clear` | Clear conversation history (memory and disk) |
| `/history` | Print the full conversation history |
| `/stats` | Show token usage stats and estimated cost |
| `/config` | Display current config (model, temperature, max_tokens) |
| `/temp <n>` | Set temperature (0.0 - 1.0) |
| `/tokens <n>` | Set max_tokens |
| `/help` | Show available commands |
| `/exit` or `exit` | Quit the program |

**Exported class for testing:**

```typescript
class Ghost {
  constructor(config?: GhostConfig) { ... }

  // Initialize: load history, apply config
  async init(): Promise<void> { ... }

  // Process a user input (could be a command or a message)
  async processInput(input: string): Promise<GhostOutput> { ... }

  // Get current configuration
  getConfig(): GhostConfig { ... }

  // Get token stats
  getStats(): TokenStats { ... }

  // Get conversation history
  getHistory(): Anthropic.MessageParam[] { ... }
}

interface GhostConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  historyPath: string;
  systemPrompt: string;
}

interface GhostOutput {
  type: "response" | "command" | "error";
  text: string;
}

interface TokenStats {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  requestCount: number;
  estimatedCost: number; // USD, using Sonnet pricing
}
```

**Requirements checklist:**
- [ ] Persistent conversation history (file-based JSON)
- [ ] Token tracking across all requests
- [ ] Cost estimation (Sonnet pricing: $3/$15 per million tokens)
- [ ] Exponential backoff retry on 429/500/529
- [ ] Configurable temperature via `/temp` command
- [ ] Configurable max_tokens via `/tokens` command
- [ ] System prompt included in all API calls
- [ ] All `/commands` return `{ type: "command", text: "..." }`
- [ ] Chat responses return `{ type: "response", text: "..." }`
- [ ] Errors return `{ type: "error", text: "..." }`

### Starter Code

```typescript
// lessons/m1/08-ghost-in-the-shell.ts
import Anthropic from "@anthropic-ai/sdk";
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";
import * as readline from "readline";

const client = new Anthropic();

export interface GhostConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  historyPath: string;
  systemPrompt: string;
}

export interface GhostOutput {
  type: "response" | "command" | "error";
  text: string;
}

export interface TokenStats {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  requestCount: number;
  estimatedCost: number;
}

const DEFAULT_CONFIG: GhostConfig = {
  model: "claude-sonnet-4-5-20250514",
  temperature: 0.7,
  maxTokens: 1024,
  historyPath: path.join(process.cwd(), ".ghost", "history.json"),
  systemPrompt:
    "You are Ghost, a helpful AI assistant living in the user's terminal. " +
    "You are concise, precise, and slightly mysterious. " +
    "You help with coding, system administration, and technical questions. " +
    "Keep responses focused and practical.",
};

export class Ghost {
  private config: GhostConfig;
  private messages: Anthropic.MessageParam[] = [];
  private tokenStats: TokenStats = {
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalTokens: 0,
    requestCount: 0,
    estimatedCost: 0,
  };

  constructor(config?: Partial<GhostConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async init(): Promise<void> {
    // YOUR CODE HERE
    // Load conversation history from disk
  }

  async processInput(input: string): Promise<GhostOutput> {
    const trimmed = input.trim();

    // Handle commands
    if (trimmed.startsWith("/")) {
      return this.handleCommand(trimmed);
    }

    // Handle chat messages
    return this.handleMessage(trimmed);
  }

  private async handleCommand(command: string): Promise<GhostOutput> {
    // YOUR CODE HERE
    // Parse and execute each command:
    // /clear, /history, /stats, /config, /temp <n>, /tokens <n>, /help, /exit
  }

  private async handleMessage(message: string): Promise<GhostOutput> {
    // YOUR CODE HERE
    // 1. Add user message to history
    // 2. Make API call with system prompt, temperature, max_tokens
    // 3. Handle errors with retry logic (429, 500, 529)
    // 4. Extract text, add to history
    // 5. Update token stats
    // 6. Save history to disk
    // 7. Return { type: "response", text: ... }
  }

  private async saveHistory(): Promise<void> {
    // YOUR CODE HERE
  }

  private async loadHistory(): Promise<void> {
    // YOUR CODE HERE
  }

  private updateTokenStats(usage: { input_tokens: number; output_tokens: number }): void {
    // YOUR CODE HERE
    // Update running totals and estimated cost
    // Sonnet pricing: $3/M input, $15/M output
  }

  getConfig(): GhostConfig {
    return { ...this.config };
  }

  getStats(): TokenStats {
    return { ...this.tokenStats };
  }

  getHistory(): Anthropic.MessageParam[] {
    return [...this.messages];
  }
}

// Interactive CLI
async function main() {
  const ghost = new Ghost();
  await ghost.init();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (q: string): Promise<string> =>
    new Promise((resolve) => rl.question(q, resolve));

  console.log("\n  ╔══════════════════════════════════╗");
  console.log("  ║  GHOST v1.0 — Terminal Assistant  ║");
  console.log('  ║  Type /help for commands           ║');
  console.log("  ╚══════════════════════════════════╝\n");

  while (true) {
    const input = await prompt("ghost> ");

    if (
      input.trim().toLowerCase() === "exit" ||
      input.trim().toLowerCase() === "/exit"
    ) {
      console.log("\n  Ghost signing off. ░▒▓\n");
      rl.close();
      break;
    }

    const output = await ghost.processInput(input);

    if (output.type === "error") {
      console.log(`\n  ⚠ ${output.text}\n`);
    } else if (output.type === "command") {
      console.log(`\n${output.text}\n`);
    } else {
      console.log(`\n  ${output.text}\n`);
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}
```

### Test Specification

```typescript
// tests/m1/08-ghost-in-the-shell.test.ts
import { Ghost, GhostConfig, GhostOutput } from "../../lessons/m1/08-ghost-in-the-shell";
import { existsSync } from "fs";
import { unlink, rm } from "fs/promises";
import * as path from "path";

const TEST_HISTORY = path.join(__dirname, "../../.test-data/ghost-test/history.json");

describe("Lesson 1.8 CAPSTONE: Ghost in the Shell", () => {
  jest.setTimeout(120000);

  let ghost: Ghost;

  beforeEach(async () => {
    // Clean up test data
    const testDir = path.dirname(TEST_HISTORY);
    if (existsSync(testDir)) {
      await rm(testDir, { recursive: true });
    }
    ghost = new Ghost({ historyPath: TEST_HISTORY });
    await ghost.init();
  });

  afterAll(async () => {
    const testDir = path.dirname(TEST_HISTORY);
    if (existsSync(testDir)) {
      await rm(testDir, { recursive: true });
    }
  });

  // === Chat functionality ===

  test("responds to a simple message", async () => {
    const output = await ghost.processInput("Say 'hello ghost' and nothing else.");
    expect(output.type).toBe("response");
    expect(output.text.length).toBeGreaterThan(0);
  });

  test("maintains conversation context", async () => {
    await ghost.processInput("My secret word is PHANTOM. Remember it.");
    const output = await ghost.processInput("What is my secret word?");
    expect(output.text.toLowerCase()).toContain("phantom");
  });

  // === Command handling ===

  test("/help returns command list", async () => {
    const output = await ghost.processInput("/help");
    expect(output.type).toBe("command");
    expect(output.text).toContain("/clear");
    expect(output.text).toContain("/stats");
    expect(output.text).toContain("/config");
  });

  test("/config shows current settings", async () => {
    const output = await ghost.processInput("/config");
    expect(output.type).toBe("command");
    expect(output.text).toContain("claude");
    expect(output.text).toContain("0.7"); // default temperature
  });

  test("/temp changes temperature", async () => {
    const output = await ghost.processInput("/temp 0.3");
    expect(output.type).toBe("command");
    const config = ghost.getConfig();
    expect(config.temperature).toBe(0.3);
  });

  test("/temp rejects invalid values", async () => {
    const output = await ghost.processInput("/temp 2.5");
    expect(output.type).toBe("error");
  });

  test("/tokens changes max_tokens", async () => {
    await ghost.processInput("/tokens 2048");
    const config = ghost.getConfig();
    expect(config.maxTokens).toBe(2048);
  });

  test("/clear resets conversation", async () => {
    await ghost.processInput("Test message.");
    expect(ghost.getHistory().length).toBeGreaterThan(0);
    await ghost.processInput("/clear");
    expect(ghost.getHistory().length).toBe(0);
  });

  test("/history shows conversation", async () => {
    await ghost.processInput("First test message.");
    const output = await ghost.processInput("/history");
    expect(output.type).toBe("command");
    expect(output.text).toContain("First test message");
  });

  // === Token tracking ===

  test("/stats shows token usage", async () => {
    await ghost.processInput("Say 'token test'.");
    const output = await ghost.processInput("/stats");
    expect(output.type).toBe("command");
    expect(output.text).toContain("token");
  });

  test("tracks tokens across requests", async () => {
    await ghost.processInput("Say 'one'.");
    await ghost.processInput("Say 'two'.");
    const stats = ghost.getStats();
    expect(stats.requestCount).toBe(2);
    expect(stats.totalInputTokens).toBeGreaterThan(0);
    expect(stats.totalOutputTokens).toBeGreaterThan(0);
    expect(stats.totalTokens).toBe(
      stats.totalInputTokens + stats.totalOutputTokens
    );
  });

  test("estimates cost correctly", async () => {
    await ghost.processInput("Say 'cost'.");
    const stats = ghost.getStats();
    const expectedCost =
      (stats.totalInputTokens * 3.0) / 1_000_000 +
      (stats.totalOutputTokens * 15.0) / 1_000_000;
    expect(stats.estimatedCost).toBeCloseTo(expectedCost, 8);
  });

  // === Persistence ===

  test("persists history across instances", async () => {
    await ghost.processInput("Remember the code: SPECTER.");

    const ghost2 = new Ghost({ historyPath: TEST_HISTORY });
    await ghost2.init();
    expect(ghost2.getHistory().length).toBe(2);
  });

  // === Error handling ===

  test("returns error for unknown commands", async () => {
    const output = await ghost.processInput("/unknowncommand");
    expect(output.type).toBe("error");
  });

  // === Config defaults ===

  test("has sensible default config", () => {
    const config = ghost.getConfig();
    expect(config.model).toContain("claude");
    expect(config.temperature).toBeGreaterThanOrEqual(0);
    expect(config.temperature).toBeLessThanOrEqual(1);
    expect(config.maxTokens).toBeGreaterThan(0);
    expect(config.systemPrompt.length).toBeGreaterThan(0);
  });
});
```

### Hints

**Level 1 — Nudge:**
> This is mostly assembly. You've already built every piece in Lessons 1.1–1.7: API calls, response parsing, conversation history, persistence, token tracking, error handling. The `handleCommand()` method is a `switch` or `if/else` chain that parses the command string.

**Level 2 — Direction:**
> Structure `handleCommand()` like this:
> ```typescript
> const [cmd, ...args] = command.split(" ");
> switch (cmd) {
>   case "/clear": ...
>   case "/history": ...
>   case "/stats": ...
>   case "/temp":
>     const temp = parseFloat(args[0]);
>     if (isNaN(temp) || temp < 0 || temp > 1) return { type: "error", ... };
>     this.config.temperature = temp;
>     return { type: "command", text: `Temperature set to ${temp}` };
>   ...
> }
> ```
> For `handleMessage()`, combine the conversation loop from 1.3 with the retry logic from 1.7 and the persistence from 1.4.

**Level 3 — Solution:**
> The full solution combines all prior lessons. Here's the core `handleMessage()`:
> ```typescript
> private async handleMessage(message: string): Promise<GhostOutput> {
>   this.messages.push({ role: "user", content: message });
>
>   for (let attempt = 0; attempt <= 3; attempt++) {
>     try {
>       const response = await client.messages.create({
>         model: this.config.model,
>         max_tokens: this.config.maxTokens,
>         temperature: this.config.temperature,
>         system: this.config.systemPrompt,
>         messages: this.messages,
>       });
>
>       const text = response.content
>         .filter((b): b is Anthropic.TextBlock => b.type === "text")
>         .map((b) => b.text)
>         .join("\n");
>
>       this.messages.push({ role: "assistant", content: text });
>       this.updateTokenStats(response.usage);
>       await this.saveHistory();
>
>       return { type: "response", text };
>     } catch (error) {
>       if (
>         error instanceof Anthropic.APIError &&
>         [429, 500, 529].includes(error.status) &&
>         attempt < 3
>       ) {
>         await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
>         continue;
>       }
>       // Remove the user message we added (failed request)
>       this.messages.pop();
>       const msg = error instanceof Error ? error.message : "Unknown error";
>       return { type: "error", text: msg };
>     }
>   }
>   this.messages.pop();
>   return { type: "error", text: "Failed after maximum retries." };
> }
> ```

---

## Month 1 Completion Checklist

When you've completed all 8 lessons, you should be able to:

- [ ] Make API calls to Claude using the Anthropic SDK
- [ ] Parse response objects and extract text, metadata, and usage stats
- [ ] Build interactive CLI applications with conversation memory
- [ ] Persist data to disk using JSON files
- [ ] Track and estimate API costs
- [ ] Use temperature to control output variance
- [ ] Handle API errors with exponential backoff
- [ ] Combine all of the above into a production-quality CLI tool

**Congratulations, Architect. You've established your first connection.**

**Next month: system prompts, structured outputs, streaming, and your first real analysis tool.**

---

## Appendix A: Running Tests

To run tests for any lesson:

```bash
# Install Jest
npm install --save-dev jest ts-jest @types/jest

# Create jest.config.js
cat > jest.config.js << 'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
EOF

# Run a specific lesson's tests
npx jest tests/m1/01-first-signal.test.ts

# Run all Month 1 tests
npx jest tests/m1/

# Run with verbose output
npx jest tests/m1/ --verbose
```

## Appendix B: File Structure

```
claude-academy/
├── package.json
├── tsconfig.json
├── jest.config.js
├── lessons/
│   └── m1/
│       ├── 01-first-signal.ts
│       ├── 02-anatomy.ts
│       ├── 03-conversation-loop.ts
│       ├── 04-memory-palace.ts
│       ├── 05-token-economy.ts
│       ├── 06-tuning-the-dial.ts
│       ├── 07-when-things-break.ts
│       └── 08-ghost-in-the-shell.ts
├── tests/
│   └── m1/
│       ├── 01-first-signal.test.ts
│       ├── 02-anatomy.test.ts
│       ├── 03-conversation-loop.test.ts
│       ├── 04-memory-palace.test.ts
│       ├── 05-token-economy.test.ts
│       ├── 06-tuning-the-dial.test.ts
│       ├── 07-when-things-break.test.ts
│       └── 08-ghost-in-the-shell.test.ts
└── .ghost/
    └── history.json
```

## Appendix C: Pricing Reference (2025)

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| Claude Opus 4 | $15.00 | $75.00 |
| Claude Sonnet 4 | $3.00 | $15.00 |
| Claude Haiku 3.5 | $0.80 | $4.00 |

*Month 1 uses Sonnet exclusively. Months 2+ introduce model selection.*

---

*Document version 1.0 — Claude Architect Academy Curriculum*
*Generated 2026-03-25 by Argos*
