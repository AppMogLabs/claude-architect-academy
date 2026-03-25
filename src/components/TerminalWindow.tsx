"use client";

import type { ReactNode } from "react";

interface TerminalWindowProps {
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function TerminalWindow({
  title = "SYSTEM.EXE",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`bg-[#0a0a0f] border border-[#00ff41]/40 shadow-[0_0_20px_rgba(0,255,65,0.15)] ${className}`}
    >
      {/* Terminal Header */}
      <div className="bg-[#00ff41] text-[#0a0a0f] px-4 py-2 flex items-center justify-between font-[family-name:var(--font-vt323)]">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#0a0a0f]" />
          <span className="w-2.5 h-2.5 bg-[#0a0a0f]" />
          <span className="w-2.5 h-2.5 bg-[#0a0a0f]" />
        </span>
        <span className="tracking-wider text-sm">{title}</span>
        <span className="opacity-0 text-sm">...</span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-[family-name:var(--font-jetbrains)] text-[#00ff41] min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
