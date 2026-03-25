"use client";

export function TerminalPanel() {
  return (
    <div className="flex flex-col h-full bg-black border-l border-[#1a1a2e]">
      <div className="flex items-center px-4 py-2 bg-[#0d1117] border-b border-[#1a1a2e]">
        <span className="font-[family-name:var(--font-vt323)] text-sm text-[#ffb000]">
          TERMINAL
        </span>
        <div className="ml-auto flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff0040]" />
          <div className="w-2 h-2 rounded-full bg-[#ffb000]" />
          <div className="w-2 h-2 rounded-full bg-[#00ff41]" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-[#00ff41]/40 font-[family-name:var(--font-jetbrains)] text-sm text-center">
          Terminal will appear here.
          <br />
          <span className="text-xs text-[#00ff41]/20">
            xterm.js integration coming in Phase 3
          </span>
        </p>
      </div>
    </div>
  );
}
