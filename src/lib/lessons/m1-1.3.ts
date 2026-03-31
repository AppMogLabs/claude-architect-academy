import type { LessonConfig } from "@/lib/types";

export const lesson1_3: LessonConfig = {
  id: "m1-1.3",
  title: "The Conversation Loop",
  subtitle: "Build context-aware multi-turn conversations",
  difficulty: 2,
  estimatedMinutes: 30,
  codieIntro: "I answered your question, but then... nothing. I forgot you existed. Can you help me remember?",
  codieOutro: "I remember now! Each message builds on the last. I'm not just answering — I'm having a conversation.",
  xpReward: 50,
  steps: [
    { id: "m1-1.3-s1", order: 1, title: "The Message Array", description: "Create the ChatBot class with a typed messages array.", hints: ["Create a class with a private messages property."], codieDialogue: { before: "I need memory. Start by creating a place to store our messages." } },
    { id: "m1-1.3-s2", order: 2, title: "Hear the User", description: "Push user messages onto the conversation history.", hints: ["Use array push with role: 'user'."], codieDialogue: { before: "When someone speaks, I need to remember what they said." } },
    { id: "m1-1.3-s3", order: 3, title: "Ask Claude", description: "Pass the full message history to messages.create().", hints: ["Use this.messages as the messages parameter."], codieDialogue: { before: "Now send the whole conversation to Claude — context is everything." } },
    { id: "m1-1.3-s4", order: 4, title: "Catch the Reply", description: "Extract text from Claude's response content blocks.", hints: ["Filter for text blocks and map to .text."], codieDialogue: { before: "I responded. Can you find my words in the content blocks?" } },
    { id: "m1-1.3-s5", order: 5, title: "Remember Everything", description: "Push Claude's reply into the history and return it.", hints: ["Push with role: 'assistant' and the extracted text."], codieDialogue: { before: "Don't forget my reply! Add it to the history too." } },
    { id: "m1-1.3-s6", order: 6, title: "History & Reset", description: "Implement getHistory() and clear() methods.", hints: ["Return a copy of messages, not the original array."], codieDialogue: { before: "Sometimes you need to see the full conversation. Or start fresh." } },
    { id: "m1-1.3-s7", order: 7, title: "The Loop", description: "Wire up readline for an interactive chat loop.", hints: ["Use readline with a 'you> ' prompt and handle exit/quit."], codieDialogue: { before: "Let's make this interactive. A real conversation loop." } },
  ],
};
