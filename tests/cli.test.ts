import { describe, it, expect } from "vitest";
import { execFile } from "child_process";
import { join } from "path";

const BIN = join(import.meta.dirname, "../cli/bin.js");

function runCli(input: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const proc = execFile("node", [BIN], { timeout: 30000 }, (err, stdout, stderr) => {
      if (err && err.killed) return reject(new Error("CLI timed out"));
      resolve({ stdout, stderr: stderr || "" });
    });
    proc.stdin!.write(input);
    proc.stdin!.end();
  });
}

// Strip ANSI escape codes for assertions
function strip(s: string): string {
  return s.replace(/\x1b\[[0-9;]*m/g, "");
}

describe("CLI", () => {
  it("prints banner and exits", async () => {
    const { stdout } = await runCli("exit\n");
    const out = strip(stdout);
    expect(out).toContain("facts d");
    expect(out).toContain("Goodbye.");
  });

  it("list — shows supported forms", async () => {
    const { stdout } = await runCli("list\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("1040");
    expect(out).toContain("scheduleC");
    expect(out).toContain("scheduleSE");
  });

  it("schema — shows writable inputs for a form", async () => {
    const { stdout } = await runCli("schema scheduleC\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("/schCGrossReceipts");
    expect(out).toContain("Dollar");
  });

  it("schema — shows usage when no form given", async () => {
    const { stdout } = await runCli("schema\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("Usage");
  });

  it("create + set + get — round-trips a fact value", async () => {
    const { stdout } = await runCli("create\nset /wagesFromW2 50000\nget /wagesFromW2\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("Return created.");
    expect(out).toContain("/wagesFromW2 = 50000");
    expect(out).toContain("50000.00");
  });

  it("form — shows all lines for a form", async () => {
    const { stdout } = await runCli("create\nset /filingStatus single\nset /wagesFromW2 50000\nform 1040\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("/wagesFromW2");
    expect(out).toContain("/totalTax");
  });

  it("deps — shows writable dependencies", async () => {
    const { stdout } = await runCli("create\ndeps /totalIncome\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("depends on");
    expect(out).toContain("/wagesFromW2");
  });

  it("help — shows command list", async () => {
    const { stdout } = await runCli("help\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("Commands");
    expect(out).toContain("list");
    expect(out).toContain("schema");
    expect(out).toContain("create");
    expect(out).toContain("set");
    expect(out).toContain("get");
    expect(out).toContain("form");
    expect(out).toContain("deps");
  });

  it("unknown command — shows error", async () => {
    const { stdout } = await runCli("foobar\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("Unknown command");
  });

  it("set before create — warns user", async () => {
    const { stdout } = await runCli("set /wagesFromW2 50000\nexit\n");
    const out = strip(stdout);
    expect(out).toContain("Run 'create' first");
  });
});
