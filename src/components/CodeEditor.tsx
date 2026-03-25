"use client";

import { useState } from "react";

interface CodeEditorProps {
  readonly initialCode: string;
  readonly expectedOutput: string;
  readonly onSuccess?: () => void;
}

export function CodeEditor({
  initialCode,
  expectedOutput,
  onSuccess,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      const outputStr = String(result);
      setOutput(outputStr);

      if (outputStr.includes(expectedOutput)) {
        setIsSuccess(true);
        onSuccess?.();
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      setOutput(
        `ERROR: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setIsSuccess(false);
    }
  };

  const reset = () => {
    setCode(initialCode);
    setOutput("");
    setIsSuccess(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#0a0a0f] border border-[#00ff41]/40 shadow-[0_0_20px_rgba(0,255,65,0.15)]">
        <div className="bg-[#00ff41] text-[#0a0a0f] px-4 py-2 font-[family-name:var(--font-vt323)] tracking-wider flex items-center justify-between">
          <span className="text-sm">CODE_EDITOR.EXE</span>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="bg-[#0a0a0f] text-[#00ff41] px-3 py-1 text-xs hover:bg-[#0d1117] transition-colors font-[family-name:var(--font-vt323)]"
            >
              RESET
            </button>
            <button
              onClick={runCode}
              className="bg-[#0a0a0f] text-[#00ff41] px-3 py-1 text-xs hover:bg-[#0d1117] transition-colors font-[family-name:var(--font-vt323)]"
            >
              RUN
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-[#0a0a0f] text-[#00ff41] font-[family-name:var(--font-jetbrains)] p-4 min-h-[300px] focus:outline-none resize-none text-sm"
          spellCheck={false}
        />
      </div>

      {output && (
        <div className="bg-[#0a0a0f] border border-[#00ff41]/40 shadow-[0_0_20px_rgba(0,255,65,0.15)]">
          <div
            className={`${isSuccess ? "bg-[#00ff41]" : "bg-[#ff0040]"} text-[#0a0a0f] px-4 py-2 font-[family-name:var(--font-vt323)] tracking-wider text-sm`}
          >
            OUTPUT {isSuccess && "// SUCCESS"}
          </div>
          <div
            className={`font-[family-name:var(--font-jetbrains)] p-4 text-sm ${isSuccess ? "text-[#00ff41]" : "text-[#ff0040]"}`}
          >
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
