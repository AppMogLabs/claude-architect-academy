import { WebSocketServer, WebSocket } from "ws";
import * as path from "path";
import * as fs from "fs";
import { spawn, type ChildProcess } from "child_process";

const PORT = parseInt(process.env.TERMINAL_PORT ?? "3001", 10);
const WORKSPACE_DIR = path.resolve(__dirname, "../../workspace");

// Ensure workspace directory exists
fs.mkdirSync(path.join(WORKSPACE_DIR, "lessons/m1"), { recursive: true });

// Build a clean env (filter out undefined values)
function cleanEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) {
      env[key] = value;
    }
  }
  env.TERM = "xterm-256color";
  return env;
}

interface PtyLike {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  kill(): void;
  onData(callback: (data: string) => void): void;
  onExit(callback: () => void): void;
  isPty: boolean;
}

// Try node-pty first, fall back to child_process
function spawnTerminal(cwd: string): PtyLike {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pty = require("node-pty");
    const shell = process.env.SHELL ?? "/bin/bash";
    const ptyProcess = pty.spawn(shell, [], {
      name: "xterm-256color",
      cols: 80,
      rows: 24,
      cwd,
      env: cleanEnv(),
    });
    console.log("[terminal-server] Using node-pty");
    return { ...ptyProcess, isPty: true };
  } catch {
    console.log("[terminal-server] node-pty unavailable, using child_process fallback");
    return spawnFallback(cwd);
  }
}

function spawnFallback(cwd: string): PtyLike {
  const shell = process.env.SHELL ?? "/bin/bash";
  const proc: ChildProcess = spawn(shell, ["-i"], {
    cwd,
    env: cleanEnv(),
    stdio: ["pipe", "pipe", "pipe"],
  });

  const dataCallbacks: ((data: string) => void)[] = [];
  const exitCallbacks: (() => void)[] = [];

  proc.stdout?.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    for (const cb of dataCallbacks) cb(text);
  });

  proc.stderr?.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    for (const cb of dataCallbacks) cb(text);
  });

  proc.on("exit", () => {
    for (const cb of exitCallbacks) cb();
  });

  return {
    isPty: false,
    write(data: string) {
      proc.stdin?.write(data);
    },
    resize() {},
    kill() {
      proc.kill();
    },
    onData(callback: (data: string) => void) {
      dataCallbacks.push(callback);
    },
    onExit(callback: () => void) {
      exitCallbacks.push(callback);
    },
  };
}

const wss = new WebSocketServer({ port: PORT });

console.log(`[terminal-server] WebSocket server listening on ws://localhost:${PORT}`);
console.log(`[terminal-server] Workspace: ${WORKSPACE_DIR}`);

wss.on("connection", (ws: WebSocket) => {
  console.log("[terminal-server] Client connected");

  const ptyProcess = spawnTerminal(WORKSPACE_DIR);

  // Tell client whether to use local echo
  ws.send(JSON.stringify({ type: "config", localEcho: !ptyProcess.isPty }));

  // pty → ws
  ptyProcess.onData((data: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "output", data }));
    }
  });

  // ws → pty
  ws.on("message", (raw: Buffer | string) => {
    try {
      const msg = JSON.parse(raw.toString());

      if (msg.type === "input") {
        ptyProcess.write(msg.data);
      } else if (msg.type === "resize") {
        ptyProcess.resize(
          Math.max(1, msg.cols ?? 80),
          Math.max(1, msg.rows ?? 24)
        );
      }
    } catch {
      ptyProcess.write(raw.toString());
    }
  });

  ptyProcess.onExit(() => {
    console.log("[terminal-server] PTY process exited");
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  });

  ws.on("close", () => {
    console.log("[terminal-server] Client disconnected");
    ptyProcess.kill();
  });

  ws.on("error", (err: Error) => {
    console.error("[terminal-server] WebSocket error:", err.message);
    ptyProcess.kill();
  });
});

process.on("SIGINT", () => {
  console.log("[terminal-server] Shutting down...");
  wss.close();
  process.exit(0);
});
