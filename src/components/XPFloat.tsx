"use client";

import { useState, useEffect } from "react";

interface XPFloatEntry {
  readonly id: number;
  readonly amount: number;
  readonly isLesson: boolean;
}

interface XPFloatProps {
  readonly trigger: number; // increment to trigger a new float
  readonly amount: number;
  readonly isLesson: boolean;
}

export function XPFloat({ trigger, amount, isLesson }: XPFloatProps) {
  const [floats, setFloats] = useState<readonly XPFloatEntry[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const entry: XPFloatEntry = {
      id: Date.now(),
      amount,
      isLesson,
    };

    setFloats((prev) => [...prev, entry]);

    // Remove after animation completes
    const timer = setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== entry.id));
    }, 1200);

    return () => clearTimeout(timer);
  }, [trigger, amount, isLesson]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-50">
      {floats.map((entry) => (
        <div
          key={entry.id}
          className={`font-[family-name:var(--font-vt323)] animate-xp-float ${
            entry.isLesson ? "text-2xl glow-green" : "text-lg"
          } text-[#00ff41]`}
        >
          +{entry.amount} XP{entry.isLesson ? " LESSON COMPLETE" : ""}
        </div>
      ))}
    </div>
  );
}
