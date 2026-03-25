import Link from "next/link";
import { getAllLessonSummaries } from "@/lib/lessons";
import { MatrixRain } from "@/components/MatrixRain";
import { TerminalWindow } from "@/components/TerminalWindow";
import { GlowText } from "@/components/ui/GlowText";

const courses = [
  {
    id: "month-1",
    title: "FOUNDATION.CORE",
    level: "MONTH_01",
    status: "unlocked" as const,
    modules: 8,
    description: "Install the SDK and master the fundamentals of the Claude API",
  },
  {
    id: "month-2",
    title: "PROMPT_ENGINEERING.ADV",
    level: "MONTH_02",
    status: "locked" as const,
    modules: 8,
    description: "Advanced prompt patterns, chain-of-thought, and structured outputs",
  },
  {
    id: "month-3",
    title: "TOOL_USE.SYS",
    level: "MONTH_03",
    status: "locked" as const,
    modules: 8,
    description: "Function calling, tool use, and agentic architectures",
  },
  {
    id: "month-4",
    title: "RAG.PIPELINE",
    level: "MONTH_04",
    status: "locked" as const,
    modules: 10,
    description: "Retrieval-augmented generation and knowledge systems",
  },
  {
    id: "month-5",
    title: "MULTI_AGENT.NET",
    level: "MONTH_05",
    status: "locked" as const,
    modules: 10,
    description: "Multi-agent orchestration and autonomous workflows",
  },
  {
    id: "month-6",
    title: "PRODUCTION.DEPLOY",
    level: "MONTH_06",
    status: "locked" as const,
    modules: 12,
    description: "Production deployment, monitoring, and cost optimization",
  },
];

export default function CoursesPage() {
  const lessons = getAllLessonSummaries();
  const completedCount = 0;
  const totalLessons = lessons.length;

  return (
    <div className="relative flex-1 flex flex-col">
      <MatrixRain />

      <div className="relative z-10 flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <GlowText
              as="h1"
              color="green"
              className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-vt323)] mb-4"
            >
              &gt; TRAINING_MODULES
            </GlowText>
            <p className="font-[family-name:var(--font-jetbrains)] text-[#00ff41]/60 text-sm">
              SELECT A MODULE TO BEGIN // NEURAL ENHANCEMENT IN PROGRESS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <TerminalWindow
                key={course.id}
                title={course.level}
                className={
                  course.status === "locked" ? "opacity-40" : ""
                }
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-[family-name:var(--font-vt323)] text-[#00f0ff]">
                      {course.title}
                    </h3>
                    {course.status === "locked" ? (
                      <span className="text-[#ff0040] text-xs font-[family-name:var(--font-vt323)]">
                        LOCKED
                      </span>
                    ) : (
                      <span className="text-[#00ff41] text-xs font-[family-name:var(--font-vt323)]">
                        ONLINE
                      </span>
                    )}
                  </div>

                  <div className="text-sm space-y-2">
                    <p className="text-[#00ff41]/60">
                      {course.description}
                    </p>
                    <p className="text-[#00ff41]/40 text-xs">
                      MODULES: {course.modules} // STATUS:{" "}
                      {course.status.toUpperCase()}
                    </p>
                  </div>

                  {course.status === "unlocked" ? (
                    <Link
                      href="/"
                      className="block w-full text-center bg-[#00ff41] text-[#0a0a0f] py-2 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all font-[family-name:var(--font-vt323)] text-sm"
                    >
                      &gt; INITIALIZE_
                    </Link>
                  ) : (
                    <div className="block w-full text-center bg-[#1a1a2e] text-[#1a1a2e]/60 py-2 font-[family-name:var(--font-vt323)] text-sm cursor-not-allowed">
                      &gt; LOCKED
                    </div>
                  )}
                </div>
              </TerminalWindow>
            ))}
          </div>

          {/* Stats Panel */}
          <div className="mt-12">
            <TerminalWindow title="USER.STATS">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2 text-[#00ff41] font-[family-name:var(--font-vt323)] animate-pulse">
                    01
                  </div>
                  <div className="text-xs text-[#00ff41]/40 font-[family-name:var(--font-jetbrains)]">
                    MODULES UNLOCKED
                  </div>
                </div>
                <div>
                  <div className="text-3xl mb-2 text-[#00ff41] font-[family-name:var(--font-vt323)] animate-pulse">
                    {completedCount}
                  </div>
                  <div className="text-xs text-[#00ff41]/40 font-[family-name:var(--font-jetbrains)]">
                    LESSONS COMPLETED
                  </div>
                </div>
                <div>
                  <div className="text-3xl mb-2 text-[#00ff41] font-[family-name:var(--font-vt323)] animate-pulse">
                    {totalLessons}
                  </div>
                  <div className="text-xs text-[#00ff41]/40 font-[family-name:var(--font-jetbrains)]">
                    TOTAL LESSONS
                  </div>
                </div>
                <div>
                  <div className="text-3xl mb-2 text-[#ffb000] font-[family-name:var(--font-vt323)] animate-pulse">
                    0
                  </div>
                  <div className="text-xs text-[#00ff41]/40 font-[family-name:var(--font-jetbrains)]">
                    TOTAL XP
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </div>
  );
}
