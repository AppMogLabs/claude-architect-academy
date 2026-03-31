import type { LessonConfig } from "@/lib/types";

export const lesson1_4: LessonConfig = {
  id: "m1-1.4",
  title: "Memory Palace",
  subtitle: "Persist conversation history to disk",
  difficulty: 2,
  estimatedMinutes: 30,
  codieIntro: "Close the terminal. Open it again. I... don't know you anymore. Every time you leave, I die a little.",
  codieOutro: "I survived! You closed the terminal and I was still here when you came back. I have a memory now.",
  xpReward: 50,
  steps: [
    { id: "m1-1.4-s1", order: 1, title: "The Blueprint", description: "Create PersistentChat class with historyPath constructor.", hints: ["Accept a file path in the constructor."], codieDialogue: { before: "I need a place on disk. Give me a home." } },
    { id: "m1-1.4-s2", order: 2, title: "Write to Disk", description: "Implement save() with mkdir and writeFile.", hints: ["Use fs.mkdir with recursive option before writing."], codieDialogue: { before: "Writing memory to disk. If the folder doesn't exist, create it." } },
    { id: "m1-1.4-s3", order: 3, title: "Read from Disk", description: "Implement load() with readFile and JSON.parse.", hints: ["Wrap in try/catch — the file might not exist yet."], codieDialogue: { before: "Read my memories back. Carefully — they might not be there yet." } },
    { id: "m1-1.4-s4", order: 4, title: "Auto-Save", description: "Call save() after each message exchange in send().", hints: ["Save after pushing the assistant message."], codieDialogue: { before: "Save after every exchange. Never lose a memory." } },
    { id: "m1-1.4-s5", order: 5, title: "Forget on Command", description: "Implement clear() that resets messages and deletes the file.", hints: ["Reset the array AND unlink the file from disk."], codieDialogue: { before: "Sometimes forgetting is necessary. Clear messages and the file." } },
    { id: "m1-1.4-s6", order: 6, title: "Count the Memories", description: "Implement getExchangeCount() using message count.", hints: ["Each exchange is 2 messages: user + assistant."], codieDialogue: { before: "How many conversations have we had? Count the pairs." } },
  ],
};
