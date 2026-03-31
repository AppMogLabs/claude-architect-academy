import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const WORKSPACE_DIR = path.resolve(process.cwd(), "workspace");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { filePath, content } = body as {
    filePath: string;
    content: string;
  };

  if (!filePath) {
    return NextResponse.json(
      { created: false, message: "Missing filePath" },
      { status: 400 }
    );
  }

  // Prevent path traversal
  const resolved = path.resolve(WORKSPACE_DIR, filePath);
  if (!resolved.startsWith(WORKSPACE_DIR)) {
    return NextResponse.json(
      { created: false, message: "Invalid file path" },
      { status: 400 }
    );
  }

  // Only create if file doesn't already exist
  if (fs.existsSync(resolved)) {
    return NextResponse.json({ created: false, message: "File already exists" });
  }

  try {
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.writeFileSync(resolved, content ?? "", "utf-8");
    return NextResponse.json({ created: true, message: `Created ${filePath}` });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { created: false, message: `Error creating file: ${msg}` },
      { status: 500 }
    );
  }
}
