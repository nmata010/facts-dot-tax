import { readFileSync } from "fs";
import { join } from "path";
import { expect, it } from "vitest";
import { createTestGraph } from "./fact-graph";

interface ScenarioRow {
  fact: string;
  type: "input" | "output";
  values: Record<string, string>;
}

interface Scenario {
  name: string;
  inputs: Array<{ fact: string; value: string }>;
  outputs: Array<{ fact: string; value: string }>;
}

/**
 * Parse a per-form CSV file into structured scenarios.
 *
 * CSV format:
 *   fact,type,scenario1,scenario2,...
 *   /netNonfarmProfitWritable,input,20000,100000,...
 *   /seTotalTax,output,$2826,$14129,...
 *
 * - "fact" column: the fact path
 * - "type" column: "input" or "output"
 * - remaining columns: one per scenario, named by the header row
 * - empty cells are skipped (fact not set for that scenario)
 * - dollar signs and commas in values are stripped for output comparison
 */
export function parseScenarioCSV(csvPath: string): Scenario[] {
  const raw = readFileSync(csvPath, "utf-8");
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  const headers = lines[0].split(",");
  const scenarioNames = headers.slice(2);

  const rows: ScenarioRow[] = lines.slice(1).map((line) => {
    const cols = line.split(",");
    const fact = cols[0];
    const type = cols[1] as "input" | "output";
    const values: Record<string, string> = {};
    for (let i = 2; i < cols.length; i++) {
      if (cols[i] !== "") {
        values[scenarioNames[i - 2]] = cols[i];
      }
    }
    return { fact, type, values };
  });

  return scenarioNames.map((name) => ({
    name,
    inputs: rows
      .filter((r) => r.type === "input" && r.values[name] !== undefined)
      .map((r) => ({ fact: r.fact, value: r.values[name] })),
    outputs: rows
      .filter((r) => r.type === "output" && r.values[name] !== undefined)
      .map((r) => ({ fact: r.fact, value: r.values[name] })),
  }));
}

/**
 * Run all scenarios from a CSV file as Vitest tests.
 * Call this inside a describe() block.
 */
export function runScenarios(csvFile: string) {
  const csvPath = join(import.meta.dirname, "../data", csvFile);
  const scenarios = parseScenarioCSV(csvPath);

  for (const scenario of scenarios) {
    if (scenario.inputs.length === 0 && scenario.outputs.length === 0) continue;

    it(scenario.name, async () => {
      const graph = await createTestGraph();

      // Set all inputs
      for (const { fact, value } of scenario.inputs) {
        graph.set(fact, value);
      }

      // Assert all outputs
      for (const { fact, value } of scenario.outputs) {
        const expected = Number(value.replace(/[$,]/g, ""));
        const actual = graph.getDollar(fact);
        expect(actual, `${fact}`).toBe(expected);
      }
    });
  }
}
