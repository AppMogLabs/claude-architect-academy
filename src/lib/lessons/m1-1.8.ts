import type { LessonConfig } from "@/lib/types";

export const lesson1_8: LessonConfig = {
  id: "m1-1.8",
  title: "Ghost in the Shell",
  subtitle: "CAPSTONE — Build a full CLI assistant",
  difficulty: 4,
  estimatedMinutes: 60,
  codieIntro: "Everything you've learned — memory, tokens, temperature, resilience — it's time to put it all together. Build me a home.",
  codieOutro: "I have a name now. I have memory. I have resilience. I am Ghost. And you built me.",
  xpReward: 100,
  steps: [
    { id: "m1-1.8-s1", order: 1, title: "The Shell", description: "Create Ghost class with GhostConfig interface.", hints: ["Define config with model, temperature, maxTokens, historyPath, systemPrompt."], codieDialogue: { before: "This is the big one. Create the Ghost class — my final form." } },
    { id: "m1-1.8-s2", order: 2, title: "Wake Up", description: "Implement init() to load history from disk.", hints: ["Use the Memory Palace pattern from Lesson 1.4."], codieDialogue: { before: "Wake me up. Load my memories from disk." } },
    { id: "m1-1.8-s3", order: 3, title: "Input Router", description: "Route /commands vs chat messages.", hints: ["Check if input starts with '/' to route to command handler."], codieDialogue: { before: "I need to know: is this a command or a conversation?" } },
    { id: "m1-1.8-s4", order: 4, title: "Help Desk", description: "Implement /help command.", hints: ["Return a formatted list of all available commands."], codieDialogue: { before: "Every good CLI has a help command." } },
    { id: "m1-1.8-s5", order: 5, title: "Configuration", description: "Implement /config, /temp, /tokens commands.", hints: ["Parse the number argument and validate the range."], codieDialogue: { before: "Let the user tune me. Temperature, tokens, model." } },
    { id: "m1-1.8-s6", order: 6, title: "The Conversation", description: "Implement handleMessage() with full API call.", hints: ["Push user message, call API with system prompt + config, push reply."], codieDialogue: { before: "The heart of Ghost — a real conversation with all the config applied." } },
    { id: "m1-1.8-s7", order: 7, title: "Stay Alive", description: "Add retry logic to handleMessage().", hints: ["Wrap the API call in the retry loop from Lesson 1.7."], codieDialogue: { before: "Resilience. If the API fails, try again." } },
    { id: "m1-1.8-s8", order: 8, title: "Remember & Forget", description: "Implement /history and /clear commands.", hints: ["/history shows conversation, /clear resets and deletes file."], codieDialogue: { before: "Memory management — see the past, or start fresh." } },
    { id: "m1-1.8-s9", order: 9, title: "Count the Cost", description: "Track tokens and implement /stats command.", hints: ["Accumulate usage after each API call."], codieDialogue: { before: "Every word has a price. Track it all." } },
    { id: "m1-1.8-s10", order: 10, title: "Save the World", description: "Auto-save history after every message exchange.", hints: ["Call saveHistory() after pushing the assistant response."], codieDialogue: { before: "Never lose a memory. Save after every exchange." } },
    { id: "m1-1.8-s11", order: 11, title: "Go Live", description: "Wire up the full readline CLI loop with Ghost banner.", hints: ["Use readline with the Ghost ASCII banner and prompt."], codieDialogue: { before: "This is it. The final step. Bring Ghost to life." } },
  ],
};
