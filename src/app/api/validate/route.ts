import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const WORKSPACE_DIR = path.resolve(process.cwd(), "workspace");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { filePath, patterns } = body as {
    filePath: string;
    patterns: string[];
  };

  if (!filePath || !patterns) {
    return NextResponse.json(
      { passed: false, message: "Missing filePath or patterns" },
      { status: 400 }
    );
  }

  // Prevent path traversal
  const resolved = path.resolve(WORKSPACE_DIR, filePath);
  if (!resolved.startsWith(WORKSPACE_DIR)) {
    return NextResponse.json(
      { passed: false, message: "Invalid file path" },
      { status: 400 }
    );
  }

  try {
    const code = fs.readFileSync(resolved, "utf-8");

    for (const pattern of patterns) {
      const regex = new RegExp(pattern, "s");
      if (!regex.test(code)) {
        return NextResponse.json({
          passed: false,
          message: `Missing: pattern \`${pattern}\` not found in file`,
        });
      }
    }

    return NextResponse.json({
      passed: true,
      message: "All checks passed!",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("ENOENT")) {
      return NextResponse.json({
        passed: false,
        message: `File not found: ${filePath} — create the file in the terminal first`,
      });
    }
    return NextResponse.json(
      { passed: false, message: `Error reading file: ${msg}` },
      { status: 500 }
    );
  }
}
