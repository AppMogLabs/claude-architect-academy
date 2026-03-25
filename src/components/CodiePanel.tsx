"use client";

interface CodiePanelProps {
  readonly dialogue: string;
}

export function CodiePanel({ dialogue }: CodiePanelProps) {
  return (
    <div className="flex items-start gap-3 px-6 py-3 bg-[#0d1117]/50 border-t border-[#1a1a2e]">
      <span className="font-[family-name:var(--font-vt323)] text-[#00f0ff] text-sm shrink-0">
        CODIE &gt;
      </span>
      <p className="text-sm italic text-[#00ff41]/80 leading-relaxed">
        {dialogue}
      </p>
    </div>
  );
}
