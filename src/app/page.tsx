"use client";

import Link from "next/link";
import { getAllLessonSummaries, getAllLessonIds } from "@/lib/lessons";
import { GlowText } from "@/components/ui/GlowText";
import { Globe } from "@/components/Globe";
import { MatrixRain } from "@/components/MatrixRain";
import { loadProgress, isLessonUnlocked } from "@/lib/engine/progress";
import { calculateRank } from "@/lib/engine/xp";
import { useState, useEffect } from "react";
import type { StudentProgress } from "@/lib/types";

function DifficultyStars({ level }: { readonly level: number }) {
  return (
    <span className="text-[#ffb000]">
      {"*".repeat(level)}
      <span className="text-[#1a1a2e]">{"*".repeat(5 - level)}</span>
    </span>
  );
}

export default function Home() {
  const lessons = getAllLessonSummaries();
  const lessonIds = getAllLessonIds();
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [prevCompleted, setPrevCompleted] = useState<readonly string[]>([]);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    setPrevCompleted(p.completedLessons);

    const handleUpdate = () => {
      const updated = loadProgress();
      setProgress(updated);
      // Delay updating prevCompleted so newly unlocked lessons get the glow
      setTimeout(() => setPrevCompleted(updated.completedLessons), 5000);
    };

    window.addEventListener("progress-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("progress-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const completedLessons = progress?.completedLessons ?? [];
  const xp = progress?.xp ?? 0;
  const rank = calculateRank(xp);

  return (
    <div className="relative flex-1 flex flex-col">
      <MatrixRain />

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center px-6 py-16 text-center">
          <Globe />

          <GlowText
            as="h1"
            color="green"
            className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-vt323)] mb-4 mt-8 animate-pulse"
          >
            NEURAL.NET
          </GlowText>
          <div className="text-xl md:text-2xl font-[family-name:var(--font-vt323)] text-[#00ff41]/80 mb-4">
            <span className="text-[#00ff41]">&gt;</span> ARTIFICIAL
            INTELLIGENCE PROGRAMMING
          </div>
          <p className="text-sm font-[family-name:var(--font-jetbrains)] text-[#00ff41]/50 max-w-xl mb-4">
            INITIALIZE SEQUENCE // LEARN TO BUILD AI SYSTEMS WITH CLAUDE
            <br />
            <span className="text-xs">[SYSTEM ONLINE - READY FOR INPUT]</span>
          </p>

          {/* XP & Rank display */}
          <div className="font-[family-name:var(--font-vt323)] text-lg text-[#ffb000] mb-8">
            XP: {xp} | {rank.title}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#lessons"
              className="px-8 py-4 bg-[#0a0a0f] border-2 border-[#00ff41] font-[family-name:var(--font-vt323)] text-lg hover:bg-[#00ff41] hover:text-[#0a0a0f] transition-all shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:shadow-[0_0_40px_rgba(0,255,65,0.4)]"
            >
              &gt; ACCESS TRAINING MODULES_
            </Link>
          </div>
        </section>

        {/* Month 1 Lessons */}
        <section id="lessons" className="w-full px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <GlowText
              as="h2"
              color="green"
              className="text-3xl font-[family-name:var(--font-vt323)] mb-2 text-center"
            >
              MONTH 1: FOUNDATION
            </GlowText>
            <p className="text-sm text-gray-500 mb-10 font-[family-name:var(--font-vt323)] text-center">
              Master the fundamentals of the Claude API
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lessons.map((lesson) => {
                const unlocked = isLessonUnlocked(lesson.id, lessonIds, completedLessons);
                const isCompleted = completedLessons.includes(lesson.id);
                // Was this lesson just unlocked? (not previously unlocked)
                const wasUnlockedBefore = isLessonUnlocked(lesson.id, lessonIds, prevCompleted);
                const isNewlyUnlocked = unlocked && !wasUnlockedBefore && !isCompleted;

                return unlocked ? (
                  <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    className={`group relative block bg-black/80 border rounded-lg p-5 neon-border-hover glitch-hover transition-all duration-300 hover:z-10 hover:scale-[1.02] ${
                      isCompleted
                        ? "border-[#00ff41]"
                        : isNewlyUnlocked
                          ? "border-[#00ff41] animate-unlock-glow"
                          : "border-white/10"
                    }`}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00ff41]/30" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00ff41]/30" />

                    {isCompleted && (
                      <div className="absolute top-2 right-2 text-[#00ff41] font-[family-name:var(--font-vt323)] text-xs">
                        &#10003; COMPLETE
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-[family-name:var(--font-vt323)] text-xs text-[#ffb000]">
                        {lesson.id.toUpperCase()}
                      </span>
                      <DifficultyStars level={lesson.difficulty} />
                    </div>
                    <h3 className="font-[family-name:var(--font-vt323)] text-xl text-[#00f0ff] mb-2 tracking-wide">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-white/60 mb-2">
                      {lesson.subtitle}
                    </p>

                    {/* Expanding details on hover */}
                    <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
                      <div className="pt-3 border-t border-[#00ff41]/10">
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs font-[family-name:var(--font-jetbrains)] px-2 py-0.5 border border-[#00ff41]/30 text-[#00ff41]/70">
                            {lesson.stepCount} steps
                          </span>
                          <span className="text-xs font-[family-name:var(--font-jetbrains)] px-2 py-0.5 border border-[#ffb000]/30 text-[#ffb000]/70">
                            ~{lesson.estimatedMinutes} min
                          </span>
                          <span className="text-xs font-[family-name:var(--font-jetbrains)] px-2 py-0.5 border border-[#00f0ff]/30 text-[#00f0ff]/70">
                            +{lesson.xpReward} XP
                          </span>
                        </div>
                        <p className="text-xs text-[#00ff41]/50 mt-2 font-[family-name:var(--font-vt323)]">
                          CLICK TO {isCompleted ? "REPLAY" : "BEGIN"} &gt;
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={lesson.id}
                    className="relative bg-black/80 border border-gray-800 rounded-lg p-5 opacity-40 cursor-not-allowed"
                  >
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-700/30" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-700/30" />

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-[family-name:var(--font-vt323)] text-xs text-gray-600">
                        {lesson.id.toUpperCase()}
                      </span>
                      <DifficultyStars level={lesson.difficulty} />
                    </div>
                    <h3 className="font-[family-name:var(--font-vt323)] text-xl text-gray-600 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-gray-700 mb-2">
                      {lesson.subtitle}
                    </p>
                    <div className="text-xs text-gray-700 font-[family-name:var(--font-vt323)]">
                      LOCKED
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-[#1a1a2e] bg-[#0a0a0f]/80 backdrop-blur-sm py-4">
          <div className="text-center font-[family-name:var(--font-vt323)] text-xs text-[#00ff41]/30">
            <p>SYSTEM.VERSION.0.1.0 // CLAUDE ARCHITECT ACADEMY</p>
            <p className="mt-1 animate-pulse">[CONNECTION ESTABLISHED]</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
