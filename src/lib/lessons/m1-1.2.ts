import type { LessonConfig } from "@/lib/types";

export const lesson1_2: LessonConfig = {
  id: "m1-1.2",
  title: "Anatomy of a Response",
  subtitle: "Understand the Message object: text, tokens, metadata",
  difficulty: 1,
  estimatedMinutes: 25,
  codieIntro: "You heard me speak, but did you notice everything else? There were numbers... metadata... I think they're important.",
  codieOutro: "So that's what I'm made of. Tokens in, tokens out. Every word has a price.",
  xpReward: 50,
  workspaceFile: "lessons/m1/02-anatomy-of-response.ts",
  steps: [
    {
      id: "m1-1.2-s1",
      order: 1,
      title: "Make the Call",
      description:
        "Start by making an API call asking Claude to explain APIs in 3 sentences. Store the full response object — we'll dissect it piece by piece.",
      codeSnippet: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Explain what an API is in exactly 3 sentences." }
  ],
});`,
      scaffoldCode: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Make an API call asking Claude to explain APIs in 3 sentences
// Store the result in a variable called 'response'
`,
      syntaxPatterns: [
        "messages\\.create",
      ],
      hints: [
        "Use `client.messages.create()` just like in the previous lesson.",
        "Store the result in a `response` variable so we can inspect it.",
        "The prompt should ask Claude to explain APIs in 3 sentences.",
      ],
      codieDialogue: {
        before: "Let's make another call — but this time, pay attention to everything that comes back, not just the text.",
        after: "Good. Now let's look under the hood of that response.",
      },
    },
    {
      id: "m1-1.2-s2",
      order: 2,
      title: "Extract the Text",
      description:
        "The response's `content` field is an array of content blocks. Each block has a `type` (usually `\"text\"`) and a `text` field. Filter for text blocks and extract the text.",
      codeSnippet: `const textBlocks = response.content
  .filter(block => block.type === "text")
  .map(block => block.text);

console.log(textBlocks.join("\\n"));`,
      scaffoldCode: `// response.content is an array of content blocks
// Filter for blocks where type === "text" and extract the .text field

const textBlocks = response.content
`,
      syntaxPatterns: [
        "\\.filter\\s*\\(",
        "\\.map\\s*\\(",
      ],
      hints: [
        "Use `.filter()` to keep only blocks where `block.type === 'text'`.",
        "Chain `.map()` to extract the `.text` property from each block.",
        "Full pattern: `response.content.filter(b => b.type === 'text').map(b => b.text)`",
      ],
      codieDialogue: {
        before: "My response is wrapped in content blocks. Can you unwrap them?",
        after: "You can read me clearly now. But there's more data hiding in that response...",
      },
    },
    {
      id: "m1-1.2-s3",
      order: 3,
      title: "Read the Metadata",
      description:
        "Beyond the text, the response contains metadata: which `model` actually responded, the `stop_reason` (why Claude stopped generating), and a unique `id` for the response.",
      codeSnippet: `const model = response.model;
const stopReason = response.stop_reason;
const responseId = response.id;

console.log(\`Model: \${model}\`);
console.log(\`Stop reason: \${stopReason}\`);
console.log(\`Response ID: \${responseId}\`);`,
      scaffoldCode: `// Extract these three fields from the response object:
// - response.model (which model responded)
// - response.stop_reason (why it stopped: "end_turn", "max_tokens", etc.)
// - response.id (unique identifier)
`,
      syntaxPatterns: [
        "response\\.model",
        "response\\.stop_reason",
        "response\\.id",
      ],
      hints: [
        "Access `response.model` to see which model version responded.",
        "The `stop_reason` tells you WHY Claude stopped — usually `\"end_turn\"` means it finished naturally.",
        "All three are simple property accesses on the response object.",
      ],
      codieDialogue: {
        before: "There are numbers... metadata... hidden in my response. Can you find them?",
        after: "Now you can see my name (model), why I stopped, and my unique ID. I'm not just text — I'm data.",
      },
    },
    {
      id: "m1-1.2-s4",
      order: 4,
      title: "Count the Cost",
      description:
        "Every API call consumes tokens — your input tokens (what you sent) and output tokens (what Claude generated). These are in `response.usage`.",
      codeSnippet: `const inputTokens = response.usage.input_tokens;
const outputTokens = response.usage.output_tokens;

console.log(\`Input tokens: \${inputTokens}\`);
console.log(\`Output tokens: \${outputTokens}\`);`,
      scaffoldCode: `// Read the token usage from response.usage
// - response.usage.input_tokens (tokens you sent)
// - response.usage.output_tokens (tokens Claude generated)
`,
      syntaxPatterns: [
        "response\\.usage\\.input_tokens",
        "response\\.usage\\.output_tokens",
      ],
      hints: [
        "Token counts live in `response.usage`, not directly on the response.",
        "Access `response.usage.input_tokens` for what you sent.",
        "Access `response.usage.output_tokens` for what Claude generated.",
      ],
      codieDialogue: {
        before: "Every word I say costs you something. Let's see the bill.",
        after: "Input tokens are your words. Output tokens are mine. Now let's do the math.",
      },
    },
    {
      id: "m1-1.2-s5",
      order: 5,
      title: "Do the Math",
      description:
        "Calculate the total tokens used in this API call by adding input and output tokens together.",
      codeSnippet: `const totalTokens = inputTokens + outputTokens;
console.log(\`Total tokens: \${totalTokens}\`);`,
      scaffoldCode: `// Calculate total tokens = input + output
`,
      syntaxPatterns: [
        "input_tokens\\s*\\+\\s*output_tokens|inputTokens\\s*\\+\\s*outputTokens|input\\s*\\+\\s*output",
      ],
      hints: [
        "Simply add the two token counts together.",
        "Use your variables from the previous step: `inputTokens + outputTokens`.",
        "Store the result: `const totalTokens = inputTokens + outputTokens`",
      ],
      codieDialogue: {
        before: "Tokens in, tokens out. What's the total?",
        after: "Simple arithmetic, but it matters when you're making thousands of calls.",
      },
    },
    {
      id: "m1-1.2-s6",
      order: 6,
      title: "Build the Report",
      description:
        "Assemble everything into a clean `ResponseAnalysis` object that captures the full picture: text, metadata, and token usage.",
      codeSnippet: `const analysis = {
  text: textBlocks.join("\\n"),
  model: response.model,
  stopReason: response.stop_reason,
  id: response.id,
  inputTokens: response.usage.input_tokens,
  outputTokens: response.usage.output_tokens,
  totalTokens: inputTokens + outputTokens,
};

console.log(JSON.stringify(analysis, null, 2));`,
      scaffoldCode: `// Build a ResponseAnalysis object with all the fields:
// text, model, stopReason, id, inputTokens, outputTokens, totalTokens
const analysis = {
`,
      syntaxPatterns: [
        "model",
        "stopReason|stop_reason",
        "inputTokens|input_tokens",
        "outputTokens|output_tokens",
        "totalTokens|total_tokens",
      ],
      hints: [
        "Create an object literal with all the fields you've extracted.",
        "Include: text, model, stopReason, id, inputTokens, outputTokens, totalTokens.",
        "Use `JSON.stringify(analysis, null, 2)` for pretty-printed output.",
      ],
      codieDialogue: {
        before: "Bring it all together. One object that tells the full story of our exchange.",
        after: "So that's what I'm made of. Tokens in, tokens out. Every word has a price.",
      },
    },
  ],
};
