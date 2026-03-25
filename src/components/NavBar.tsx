import Link from "next/link";

export function NavBar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[#1a1a2e] bg-[#0a0a0f]/80 backdrop-blur-sm z-20 relative">
      <Link
        href="/"
        className="font-[family-name:var(--font-vt323)] text-2xl tracking-wider glow-green hover:opacity-80 transition-opacity"
      >
        CLAUDE ARCHITECT ACADEMY
      </Link>
      <nav className="flex items-center gap-6 font-[family-name:var(--font-vt323)] text-sm">
        <Link
          href="/"
          className="text-[#00ff41]/70 hover:text-[#00ff41] hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)] transition-all"
        >
          &gt; HOME
        </Link>
        <Link
          href="/courses"
          className="text-[#00ff41]/70 hover:text-[#00ff41] hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)] transition-all"
        >
          &gt; COURSES
        </Link>
        <Link
          href="/terminal"
          className="text-[#00ff41]/70 hover:text-[#00ff41] hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)] transition-all"
        >
          &gt; TERMINAL
        </Link>
        <div className="font-[family-name:var(--font-vt323)] text-lg text-[#ffb000]">
          XP: 0 | Signal Cadet
        </div>
      </nav>
    </header>
  );
}
