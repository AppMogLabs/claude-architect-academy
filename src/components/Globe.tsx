"use client";

export function Globe() {
  return (
    <div className="relative w-32 h-32 mx-auto" style={{ perspective: "400px" }}>
      <div
        className="w-full h-full rounded-full border border-[#00ff41]/30 relative"
        style={{
          transformStyle: "preserve-3d",
          animation: "spin-globe 10s linear infinite",
        }}
      >
        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0 rounded-full border border-[#00ff41]/20"
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        ))}

        {/* Latitude lines */}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute left-1/2 -translate-x-1/2 rounded-full border border-[#00f0ff]/15"
            style={{
              width: `${Math.sin((pct / 100) * Math.PI) * 100}%`,
              height: "1px",
              top: `${pct}%`,
            }}
          />
        ))}

        {/* Core glow */}
        <div className="absolute inset-4 rounded-full bg-[#00ff41]/5 blur-sm" />
      </div>
    </div>
  );
}
