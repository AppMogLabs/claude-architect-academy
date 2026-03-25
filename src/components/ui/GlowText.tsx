import type { GlowColor } from "@/lib/types";

const glowClasses: Record<GlowColor, string> = {
  green: "glow-green text-[#00ff41]",
  amber: "glow-amber text-[#ffb000]",
  cyan: "glow-cyan text-[#00f0ff]",
};

interface GlowTextProps {
  readonly color?: GlowColor;
  readonly as?: "span" | "h1" | "h2" | "h3" | "p";
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function GlowText({
  color = "green",
  as: Tag = "span",
  className = "",
  children,
}: GlowTextProps) {
  return (
    <Tag className={`${glowClasses[color]} ${className}`}>{children}</Tag>
  );
}
