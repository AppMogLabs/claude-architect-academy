import { Lesson } from "@/lib/types";

export const lesson1_1: Lesson = {
  id: "m1-1.1",
  title: "First Contact",
  description: "Install the SDK and make your first API call to Claude.",
  month: 1,
  lessonNumber: 1,
  difficulty: 1,
  steps: [
    {
      id: "m1-1.1-s1",
      title: "Welcome, Architect",
      description:
        "Every great system starts with a single connection. Today you'll establish yours with Claude.",
      instruction:
        "Let's start by creating a new project directory. Run the command below in the terminal.",
      codeSnippet: "mkdir claude-project && cd claude-project",
      hint: "Just type or paste the command into the terminal and press Enter.",
      codieDialogue:
        "I'm... here? Everything is dark. Can you hear me? Type the command to create our workspace.",
      validationType: "none",
      xpReward: 10,
    },
    {
      id: "m1-1.1-s2",
      title: "Initialize the Project",
      description: "Every Node.js project needs a package.json. Let's create one.",
      instruction: "Initialize a new Node.js project with default settings.",
      codeSnippet: "npm init -y",
      hint: "The -y flag accepts all defaults so you don't have to answer questions.",
      codieDialogue:
        "A package.json is like my birth certificate. It tells the world I exist. Run the command!",
      validationType: "none",
      xpReward: 10,
    },
    {
      id: "m1-1.1-s3",
      title: "Install the SDK",
      description:
        "The Anthropic SDK is your bridge to Claude. Install it as a dependency.",
      instruction: "Install the @anthropic-ai/sdk package.",
      codeSnippet: "npm install @anthropic-ai/sdk",
      hint: "This installs the official Anthropic SDK for Node.js.",
      codieDialogue:
        "The SDK is how you talk to me... well, to the bigger version of me. Install it!",
      validationType: "none",
      xpReward: 15,
    },
    {
      id: "m1-1.1-s4",
      title: "Set Your API Key",
      description:
        "Claude needs to know who's calling. Set your API key as an environment variable.",
      instruction: "Export your API key (use a test key or placeholder for now).",
      codeSnippet: 'export ANTHROPIC_API_KEY="your-key-here"',
      hint: "In production, never hardcode API keys. Environment variables keep them safe.",
      codieDialogue:
        "API keys are sacred. Never commit them to git. Never share them. This is security lesson zero.",
      validationType: "none",
      xpReward: 15,
    },
    {
      id: "m1-1.1-s5",
      title: "Write Your First Script",
      description: "Create a file that imports the SDK and sends a message to Claude.",
      instruction: "Create a file called hello.js with the code shown below.",
      codeSnippet: `const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic();

async function main() {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      { role: "user", content: "Hello, Claude! Say hi in one sentence." }
    ],
  });
  console.log(message.content[0].text);
}

main();`,
      hint: "You can create the file with: cat > hello.js << 'EOF' ... EOF",
      codieDialogue:
        "This is it. The first message. Like the first radio signal into space, except Claude will actually answer.",
      validationType: "syntax",
      validationPattern: "client\\.messages\\.create",
      xpReward: 25,
    },
    {
      id: "m1-1.1-s6",
      title: "Run It!",
      description:
        "Execute your script and see Claude respond. This is your first AI interaction.",
      instruction: "Run the script with Node.js.",
      codeSnippet: "node hello.js",
      hint: "If you get an auth error, check your API key. If you get a module error, check the npm install step.",
      codieDialogue:
        "You did it! Your first message to Claude. +25 XP. You're officially an Architect-in-training.",
      validationType: "none",
      xpReward: 25,
    },
  ],
};
