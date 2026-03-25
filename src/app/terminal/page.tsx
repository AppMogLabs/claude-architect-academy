"use client";

import { useState, useRef, useEffect } from "react";
import { MatrixRain } from "@/components/MatrixRain";

interface TerminalLine {
  readonly type: "input" | "output" | "error";
  readonly content: string;
}

const commands: Record<string, () => string> = {
  help: () => `
AVAILABLE COMMANDS:
  help       - Display this help message
  about      - About Claude Architect Academy
  lessons    - List available lessons
  stats      - Display your statistics
  clear      - Clear terminal
  codie      - Talk to Codie
  status     - System status`,

  about: () => `
CLAUDE ARCHITECT ACADEMY v0.1.0
================================
A gamified, interactive learning platform
that teaches developers to build AI systems
with Claude.

System Status: ONLINE
Ranking: Signal Cadet
`,

  lessons: () => `
MONTH 1: FOUNDATION
1. m1-1.1  First Contact           [UNLOCKED]
2. m1-1.2  Prompt Engineering 101  [LOCKED]
3. m1-1.3  System Prompts          [LOCKED]
4. m1-1.4  Multi-turn Conversations[LOCKED]
5. m1-1.5  Streaming Responses     [LOCKED]
6. m1-1.6  Temperature & Params    [LOCKED]
7. m1-1.7  Error Handling          [LOCKED]
8. m1-1.8  Cost Optimization       [LOCKED]
`,

  stats: () => `
USER STATISTICS:
================
Rank:              Signal Cadet
Modules Unlocked:  1
Lessons Completed: 0
Total XP:          0
`,

  codie: () => `
Hey there, Architect! I'm Codie, your AI
companion. I'll be with you through every
lesson, helping you learn to build with Claude.

Ready to start? Head to the lessons page
and begin "First Contact"!
`,

  status: () => `
SYSTEM STATUS:
==============
Terminal:     ONLINE
Lessons:      LOADED
WebSocket:    STANDBY
AI Engine:    READY
`,

  clear: () => "CLEAR",
};

export default function TerminalPage() {
  const [history, setHistory] = useState<readonly TerminalLine[]>([
    { type: "output", content: "CLAUDE ARCHITECT ACADEMY TERMINAL v0.1.0" },
    { type: "output", content: 'Type "help" for available commands' },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === "") return;

    const inputLine: TerminalLine = { type: "input", content: `> ${cmd}` };

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const handler = commands[trimmedCmd];
    if (handler) {
      const output = handler();
      setHistory((prev) => [
        ...prev,
        inputLine,
        { type: "output", content: output },
        { type: "output", content: "" },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        inputLine,
        {
          type: "error",
          content: `ERROR: Command "${cmd}" not recognized. Type "help" for available commands.`,
        },
        { type: "output", content: "" },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1 flex flex-col">
      <MatrixRain />

      <div className="relative z-10 flex-1 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="border border-[#00ff41]/40 bg-[#0a0a0f] shadow-[0_0_40px_rgba(0,255,65,0.15)]">
            {/* Terminal Header */}
            <div className="bg-[#00ff41] text-[#0a0a0f] px-4 py-2 font-[family-name:var(--font-vt323)] tracking-wider flex items-center justify-between text-sm">
              <span>TERMINAL.EXE</span>
              <span className="text-xs opacity-70">
                SESSION: ACTIVE
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              onClick={handleTerminalClick}
              className="p-6 font-[family-name:var(--font-jetbrains)] h-[600px] overflow-y-auto cursor-text text-sm"
            >
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.type === "input"
                      ? "text-[#00ff41]"
                      : line.type === "error"
                        ? "text-[#ff0040]"
                        : "text-[#00ff41]/70"
                  }
                >
                  <pre className="whitespace-pre-wrap">{line.content}</pre>
                </div>
              ))}

              {/* Input Line */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <span className="text-[#00ff41]">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#00ff41] font-[family-name:var(--font-jetbrains)] caret-[#00ff41] text-sm"
                  autoFocus
                  spellCheck={false}
                />
                <span className="animate-pulse text-[#00ff41]">_</span>
              </form>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
            {["help", "lessons", "stats", "codie"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  handleCommand(cmd);
                }}
                className="border border-[#00ff41]/20 px-4 py-2 font-[family-name:var(--font-vt323)] text-sm text-[#00ff41]/70 hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-[#00ff41]/5 transition-all"
              >
                {cmd.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
