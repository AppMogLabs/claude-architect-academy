"use client";

import type { FlashType } from "@/lib/types";

interface FlashFeedbackProps {
  readonly type: FlashType;
}

export function FlashFeedback({ type }: FlashFeedbackProps) {
  if (type === null) return null;

  const animClass =
    type === "success" ? "animate-flash-green" : "animate-flash-amber";

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-40 ${animClass}`}
      aria-hidden="true"
    />
  );
}
