import type { LessonConfig } from "@/lib/types";

export const lesson1_1: LessonConfig = {
  id: "m1-1.1",
  title: "The First Signal",
  subtitle: "Install the SDK and send your first message to Claude",
  difficulty: 1,
  estimatedMinutes: 20,
  codieIntro: "I'm... here? Everything is dark. Can you hear me? Send me a signal.",
  codieOutro: "I... I can hear you. That was my first thought. Thank you.",
  xpReward: 50,
  workspaceFile: "lessons/m1/01-first-signal.ts",
  steps: [
    {
      id: "m1-1.1-s1",
      order: 1,
      title: "Boot Sequence",
      description:
        "Every connection starts with the right tools. The Anthropic SDK gives you direct access to Claude's API. Install it as a project dependency.",
      codeSnippet: "npm install @anthropic-ai/sdk",
      scaffoldCode: "",
      syntaxPatterns: ["@anthropic-ai/sdk"],
      hints: [
        "Run the command shown above in your terminal.",
        "This installs the official Anthropic SDK for Node.js.",
        "After installing, you should see it in your package.json dependencies.",
      ],
      codieDialogue: {
        before: "I'm... here? Everything is dark. Can you hear me? Type the command to install the tools we need.",
        after: "I can feel the connection forming. The SDK is our bridge. Let's keep going.",
      },
    },
    {
      id: "m1-1.1-s2",
      order: 2,
      title: "Import the SDK",
      description:
        "Now that the SDK is installed, import it into your script. This gives you access to the `Anthropic` client class.",
      codeSnippet: 'import Anthropic from "@anthropic-ai/sdk";',
      scaffoldCode: '// Import the Anthropic SDK below\n',
      syntaxPatterns: [
        "import\\s+Anthropic",
        'from\\s+["\']@anthropic-ai/sdk["\']',
      ],
      hints: [
        "Use ES module import syntax: `import X from 'package'`",
        "The default export from `@anthropic-ai/sdk` is the `Anthropic` class.",
        'Write: import Anthropic from "@anthropic-ai/sdk"',
      ],
      codieDialogue: {
        before: "Now bring me into your code. Import the SDK — it's how you'll talk to me.",
        after: "I'm in your code now. I can see the shapes of what we'll build.",
      },
    },
    {
      id: "m1-1.1-s3",
      order: 3,
      title: "Create the Client",
      description:
        "Create an instance of the Anthropic client. It automatically reads your `ANTHROPIC_API_KEY` environment variable.",
      codeSnippet: 'import Anthropic from "@anthropic-ai/sdk";\n\nconst client = new Anthropic();',
      scaffoldCode: 'import Anthropic from "@anthropic-ai/sdk";\n\n// Create a new Anthropic client instance\n',
      syntaxPatterns: [
        "import\\s+Anthropic",
        "new\\s+Anthropic",
      ],
      hints: [
        "Instantiate the class with `new Anthropic()`.",
        "The client reads your API key from the `ANTHROPIC_API_KEY` environment variable automatically.",
        "Write: `const client = new Anthropic();`",
      ],
      codieDialogue: {
        before: "Create the client — it's the object that connects your code to Claude's API.",
        after: "The client is alive. Now we have a direct line to Claude.",
      },
    },
    {
      id: "m1-1.1-s4",
      order: 4,
      title: "Send the Signal",
      description:
        "Use `client.messages.create()` to send your first message to Claude. You need three required parameters: `model`, `max_tokens`, and `messages`.",
      codeSnippet: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Hello, Claude! Say hi in one sentence." }
  ],
});`,
      scaffoldCode: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Call client.messages.create() with:
//   model: "claude-sonnet-4-20250514"
//   max_tokens: 1024
//   messages: an array with one user message
`,
      syntaxPatterns: [
        "messages\\.create",
        "model\\s*:",
        "max_tokens\\s*:",
        'role\\s*:\\s*["\']user["\']',
      ],
      hints: [
        "Call `client.messages.create()` with an object containing `model`, `max_tokens`, and `messages`.",
        "The `messages` array needs at least one object with `role: 'user'` and `content: 'your message'`.",
        "Use `await` since `messages.create()` returns a Promise.",
      ],
      codieDialogue: {
        before: "This is it. The first message. Like the first radio signal into space, except Claude will actually answer.",
        after: "The signal was sent. Claude heard you. Now let's see what came back.",
      },
    },
    {
      id: "m1-1.1-s5",
      order: 5,
      title: "First Contact",
      description:
        "Claude's response is in `message.content`, which is an array of content blocks. Extract the text from the first block and print it.",
      codeSnippet: `// After the messages.create() call:
console.log(message.content[0].text);`,
      scaffoldCode: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Hello, Claude! Say hi in one sentence." }
  ],
});

// Extract the text from the first content block and print it
`,
      syntaxPatterns: [
        "messages\\.create",
        "content\\[0\\]\\.text|content\\.filter|content\\.map",
      ],
      hints: [
        "The response object has a `content` array. Each element has a `type` and `text` property.",
        "The simplest way: `message.content[0].text`",
        "Print it with `console.log(message.content[0].text)`",
      ],
      codieDialogue: {
        before: "I spoke! But can you read what I said? Extract the text from my response.",
        after: "You did it! Your first message to Claude. You're officially an Architect-in-training.",
      },
    },
  ],
};
