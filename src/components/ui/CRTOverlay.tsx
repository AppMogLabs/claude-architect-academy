"use client";

import { usePathname } from "next/navigation";

const GLITCH_DISABLED_ROUTES = ["/courses"];

export function CRTOverlay() {
  const pathname = usePathname();
  const showGlitch = !GLITCH_DISABLED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {/* Enhanced scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-50 crt-scanlines opacity-25"
        aria-hidden="true"
      />

      {/* Film grain — animated analog noise */}
      <div
        className="fixed inset-0 pointer-events-none z-50 film-grain opacity-[0.035]"
        aria-hidden="true"
      />

      {/* Vignette — dark cinematic edges */}
      <div
        className="fixed inset-0 pointer-events-none z-50 vignette"
        aria-hidden="true"
      />

      {/* Chromatic aberration — random RGB split glitch (disabled on some pages) */}
      {showGlitch && (
        <>
          <div
            className="fixed inset-0 pointer-events-none z-50 glitch-overlay"
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 pointer-events-none z-50 chroma-red"
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 pointer-events-none z-50 chroma-blue"
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}
