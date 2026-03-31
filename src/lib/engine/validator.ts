import type { ValidationResult } from "@/lib/types";

export function validateStep(
  code: string,
  patterns: readonly string[]
): ValidationResult {
  for (const pattern of patterns) {
    const regex = new RegExp(pattern, "s");
    if (!regex.test(code)) {
      const hint = describePattern(pattern);
      return {
        passed: false,
        message: `Missing: ${hint}`,
      };
    }
  }

  return {
    passed: true,
    message: "All checks passed!",
  };
}

function describePattern(pattern: string): string {
  const descriptions: Record<string, string> = {
    "import\\s+Anthropic": "`import Anthropic` — import the SDK",
    'from\\s+["\']@anthropic-ai/sdk["\']': "`@anthropic-ai/sdk` — import from the correct package",
    "new\\s+Anthropic": "`new Anthropic()` — create the client instance",
    "client\\.messages\\.create": "`client.messages.create()` — make the API call",
    "messages\\.create": "`messages.create()` — make the API call",
    "model\\s*:": "`model` parameter — specify which Claude model to use",
    "max_tokens\\s*:": "`max_tokens` parameter — set the response length limit",
    'role\\s*:\\s*["\']user["\']': "`role: 'user'` — set the message role",
    "content\\s*:": "`content` — provide the message content",
    "response\\.content": "`response.content` — access the response content blocks",
    "\\.filter\\s*\\(": "`.filter()` — filter the content blocks",
    "\\.map\\s*\\(": "`.map()` — transform the content blocks",
    "response\\.model": "`response.model` — access the model name",
    "response\\.stop_reason": "`response.stop_reason` — access the stop reason",
    "response\\.id": "`response.id` — access the response ID",
    "response\\.usage\\.input_tokens": "`response.usage.input_tokens` — read input token count",
    "response\\.usage\\.output_tokens": "`response.usage.output_tokens` — read output token count",
    "input_tokens\\s*\\+\\s*output_tokens|inputTokens\\s*\\+\\s*outputTokens": "calculate `totalTokens = inputTokens + outputTokens`",
  };

  for (const [key, desc] of Object.entries(descriptions)) {
    if (pattern === key || pattern.includes(key)) {
      return desc;
    }
  }

  return `pattern \`${pattern}\``;
}
