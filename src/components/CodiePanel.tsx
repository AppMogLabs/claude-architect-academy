"use client";

import { useState, useEffect, useRef } from "react";
import type { CodieState } from "@/lib/codie/dialogue";

interface CodiePanelProps {
  readonly dialogue: string;
  readonly state: CodieState;
}

export function CodiePanel({ dialogue, state }: CodiePanelProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const prevDialogueRef = useRef("");

  useEffect(() => {
    if (dialogue === prevDialogueRef.current) return;
    prevDialogueRef.current = dialogue;

    setIsTyping(true);
    setDisplayedText("");

    let index = 0;
    const timer = setInterval(() => {
      index++;
      if (index <= dialogue.length) {
        setDisplayedText(dialogue.slice(0, index));
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [dialogue]);

  const glowClass =
    state === "celebrating"
      ? "glow-green"
      : state === "failing"
        ? "glow-amber"
        : isTyping
          ? "glow-cyan"
          : "";

  return (
    <div className="flex items-start gap-3 px-6 py-3 bg-[#0d1117]/50 border-t border-[#1a1a2e]">
      {/* Codie avatar */}
      <div
        className={`shrink-0 font-[family-name:var(--font-vt323)] text-lg leading-none ${
          isTyping ? "animate-pulse" : ""
        }`}
      >
        <span className={`text-[#00f0ff] ${glowClass}`}>
          {state === "celebrating" ? "[^_^]" : state === "failing" ? "[o_o]" : "[._.]"}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <span className="font-[family-name:var(--font-vt323)] text-[#00f0ff] text-xs mr-2">
          CODIE &gt;
        </span>
        <span className={`text-sm italic text-[#00ff41]/80 leading-relaxed ${glowClass}`}>
          {displayedText}
          {isTyping && (
            <span className="inline-block w-1.5 h-3.5 bg-[#00ff41] ml-0.5 animate-pulse align-middle" />
          )}
        </span>
      </div>
    </div>
  );
}
