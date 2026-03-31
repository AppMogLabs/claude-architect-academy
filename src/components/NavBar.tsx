"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { loadProgress } from "@/lib/engine/progress";
import { calculateRank } from "@/lib/engine/xp";

export function NavBar() {
  const [xp, setXp] = useState(0);
  const [rankTitle, setRankTitle] = useState("Signal Cadet");
  const [rankChanged, setRankChanged] = useState(false);
  const prevRankRef = useRef("Signal Cadet");

  useEffect(() => {
    const updateFromProgress = () => {
      const progress = loadProgress();
      const newRank = calculateRank(progress.xp);

      setXp(progress.xp);

      if (newRank.title !== prevRankRef.current) {
        setRankChanged(true);
        setTimeout(() => setRankChanged(false), 1500);
        prevRankRef.current = newRank.title;
      }

      setRankTitle(newRank.title);
    };

    updateFromProgress();

    window.addEventListener("storage", updateFromProgress);
    window.addEventListener("progress-updated", updateFromProgress);
    return () => {
      window.removeEventListener("storage", updateFromProgress);
      window.removeEventListener("progress-updated", updateFromProgress);
    };
  }, []);

  // XP progress within current rank (for visual bar)
  const RANK_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1800, 2500];
  const currentRankIndex = RANK_THRESHOLDS.findIndex((_, i) =>
    i === RANK_THRESHOLDS.length - 1 || xp < RANK_THRESHOLDS[i + 1]
  );
  const currentThreshold = RANK_THRESHOLDS[currentRankIndex];
  const nextThreshold = RANK_THRESHOLDS[currentRankIndex + 1] ?? RANK_THRESHOLDS[currentRankIndex] + 500;
  const progressPercent = Math.min(
    100,
    ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  );

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[#1a1a2e] bg-[#0a0a0f]/80 backdrop-blur-sm z-20 relative">
      <Link
        href="/"
        className="font-[family-name:var(--font-vt323)] text-2xl tracking-wider glow-green hover:opacity-80 transition-opacity"
      >
        CLAUDE ARCHITECT ACADEMY
      </Link>
      <nav className="flex items-center gap-4 font-[family-name:var(--font-vt323)] text-sm">
        <Link
          href="/"
          className="text-[#00ff41]/70 hover:text-[#00ff41] hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)] transition-all"
        >
          &gt; HOME
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[#ffb000]">XP: {xp}</span>
          {/* XP progress bar */}
          <div className="w-20 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00ff41] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span
            className={`transition-all duration-500 ${
              rankChanged
                ? "text-[#ffb000] scale-110 glow-amber"
                : "text-[#ffb000]/70"
            }`}
          >
            {rankTitle}
          </span>
        </div>
      </nav>
    </header>
  );
}
