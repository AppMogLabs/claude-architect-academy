"use client";

import { useEffect, useRef, useCallback } from "react";

interface TerminalPanelProps {
  readonly lessonId?: string;
  readonly lessonTitle?: string;
  readonly workspaceFile?: string;
  readonly validationError: string;
}

export function TerminalPanel({
  lessonId,
  lessonTitle,
  workspaceFile,
  validationError,
}: TerminalPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<import("@xterm/xterm").Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const fitAddonRef = useRef<import("@xterm/addon-fit").FitAddon | null>(null);
  const initializedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const localEchoRef = useRef(false);

  const connect = useCallback(async () => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const { Terminal } = await import("@xterm/xterm");
    const { FitAddon } = await import("@xterm/addon-fit");
    const { WebLinksAddon } = await import("@xterm/addon-web-links");

    await import("@xterm/xterm/css/xterm.css");

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: "'JetBrains Mono', monospace",
      theme: {
        background: "#000000",
        foreground: "#00ff41",
        cursor: "#00ff41",
        selectionBackground: "#00ff4133",
        black: "#0a0a0f",
        red: "#ff0040",
        green: "#00ff41",
        yellow: "#ffb000",
        blue: "#00f0ff",
        magenta: "#ff0040",
        cyan: "#00f0ff",
        white: "#e0e0e0",
      },
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(containerRef.current);

    requestAnimationFrame(() => fitAddon.fit());
    setTimeout(() => {
      fitAddon.fit();
      term.focus();
    }, 300);

    termRef.current = term;
    fitAddonRef.current = fitAddon;

    // Connect to WebSocket terminal server
    const wsUrl = `ws://localhost:${process.env.NEXT_PUBLIC_TERMINAL_PORT ?? "3001"}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "resize",
        cols: term.cols,
        rows: term.rows,
      }));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "output") {
          term.write(msg.data);
        } else if (msg.type === "config") {
          localEchoRef.current = msg.localEcho ?? false;
        }
      } catch {
        // Ignore parse errors
      }
    };

    ws.onclose = () => {
      term.write("\r\n\x1b[33m[Connection closed. Refresh to reconnect.]\x1b[0m\r\n");
    };

    ws.onerror = () => {
      term.write("\r\n\x1b[31m[Terminal server not available. Run: npm run dev:terminal]\x1b[0m\r\n");
    };

    // Track line buffer for local echo mode
    let lineBuffer = "";

    // Terminal input → WebSocket
    term.onData((data) => {
      if (ws.readyState !== WebSocket.OPEN) return;

      if (localEchoRef.current) {
        // Local echo mode: echo chars locally, send full line on Enter
        if (data === "\r") {
          // Enter pressed — send the full line + newline
          term.write("\r\n");
          ws.send(JSON.stringify({ type: "input", data: lineBuffer + "\n" }));
          lineBuffer = "";
        } else if (data === "\x7f" || data === "\b") {
          // Backspace
          if (lineBuffer.length > 0) {
            lineBuffer = lineBuffer.slice(0, -1);
            term.write("\b \b");
          }
        } else if (data === "\x03") {
          // Ctrl+C
          lineBuffer = "";
          term.write("^C\r\n");
          ws.send(JSON.stringify({ type: "input", data: "\x03" }));
        } else if (data >= " " || data === "\t") {
          // Printable character or tab
          lineBuffer += data;
          term.write(data);
        }
      } else {
        // PTY mode: send raw input, server handles echo
        ws.send(JSON.stringify({ type: "input", data }));
      }
    });

    // Handle resize
    term.onResize(({ cols, rows }) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "resize", cols, rows }));
      }
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    cleanupRef.current = () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    connect();

    return () => {
      cleanupRef.current?.();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (termRef.current) {
        termRef.current.dispose();
        termRef.current = null;
      }
      initializedRef.current = false;
    };
  }, [connect]);

  useEffect(() => {
    const timer = setTimeout(() => fitAddonRef.current?.fit(), 100);
    return () => clearTimeout(timer);
  }, [validationError]);

  return (
    <div className="flex flex-col h-full bg-black border-l border-[#1a1a2e]">
      <div className="flex items-center px-4 py-2 bg-[#0d1117] border-b border-[#1a1a2e]">
        <span className="font-[family-name:var(--font-vt323)] text-sm text-[#ffb000]">
          TERMINAL
        </span>
        {workspaceFile && (
          <span className="ml-3 text-xs text-[#00f0ff]/60 font-[family-name:var(--font-jetbrains)]">
            {workspaceFile}
          </span>
        )}
        <div className="ml-auto flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff0040]" />
          <div className="w-2 h-2 rounded-full bg-[#ffb000]" />
          <div className="w-2 h-2 rounded-full bg-[#00ff41]" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-hidden"
        style={{ minHeight: "200px" }}
      />

      {validationError && (
        <div className="px-4 py-2 bg-[#0d1117] border-t border-[#ff0040]/30 text-sm text-[#ff0040] font-[family-name:var(--font-jetbrains)]">
          <span className="text-[#ffb000] mr-2">ERROR:</span>
          {validationError}
        </div>
      )}
    </div>
  );
}
