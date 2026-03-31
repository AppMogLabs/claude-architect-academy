"use client";

import { GlowText } from "@/components/ui/GlowText";
import Link from "next/link";

interface LessonCompleteOverlayProps {
  readonly lessonTitle: string;
  readonly stepXpTotal: number;
  readonly bonusXp: number;
  readonly codieOutro: string;
  readonly nextLessonId?: string;
  readonly onDismiss: () => void;
}

export function LessonCompleteOverlay({
  lessonTitle,
  stepXpTotal,
  bonusXp,
  codieOutro,
  nextLessonId,
  onDismiss,
}: LessonCompleteOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-sm animate-fade-in">
      {/* CRT glitch effect on completion */}
      <div className="absolute inset-0 animate-completion-glitch pointer-events-none" />

      <div className="relative text-center max-w-lg px-8 py-12">
        {/* Main title */}
        <GlowText
          as="h1"
          color="green"
          className="text-5xl md:text-6xl font-[family-name:var(--font-vt323)] mb-2 animate-pulse"
        >
          LESSON COMPLETE
        </GlowText>

        <p className="font-[family-name:var(--font-vt323)] text-xl text-[#00f0ff] mb-8">
          {lessonTitle}
        </p>

        {/* XP breakdown */}
        <div className="bg-[#0d1117] border border-[#1a1a2e] rounded-lg p-6 mb-8 text-left">
          <h3 className="font-[family-name:var(--font-vt323)] text-[#ffb000] text-sm mb-4">
            XP EARNED
          </h3>
          <div className="space-y-2 font-[family-name:var(--font-jetbrains)] text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Steps completed</span>
              <span className="text-[#00ff41]">+{stepXpTotal} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Lesson bonus</span>
              <span className="text-[#00ff41]">+{bonusXp} XP</span>
            </div>
            <div className="border-t border-[#1a1a2e] pt-2 flex justify-between font-bold">
              <span className="text-[#ffb000]">Total</span>
              <span className="text-[#00ff41] glow-green">
                +{stepXpTotal + bonusXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Codie outro */}
        <div className="mb-8 flex items-start gap-3 text-left">
          <span className="text-[#00f0ff] font-[family-name:var(--font-vt323)] text-lg shrink-0">
            [^_^]
          </span>
          <p className="text-sm italic text-[#00ff41]/80 leading-relaxed">
            {codieOutro}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {nextLessonId ? (
            <Link
              href={`/lesson/${nextLessonId}`}
              className="px-6 py-3 bg-[#00ff41]/10 border-2 border-[#00ff41] font-[family-name:var(--font-vt323)] text-lg text-[#00ff41] hover:bg-[#00ff41]/20 transition-all glow-green rounded"
            >
              NEXT LESSON &rarr;
            </Link>
          ) : null}
          <Link
            href="/"
            onClick={onDismiss}
            className="px-6 py-3 border border-[#1a1a2e] font-[family-name:var(--font-vt323)] text-lg text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41] transition-all rounded"
          >
            BACK TO MAP
          </Link>
        </div>
      </div>
    </div>
  );
}
