import { readFileSync, readdirSync } from "fs";
import { join } from "path";

interface SetResult {
  errorType?: string;
  errorName?: string;
}

interface GetResult {
  get: { toString(): string };
  complete: boolean;
}

interface FactGraph {
  set(path: string, value: string): SetResult;
  get(path: string): GetResult;
}

interface FgModule {
  FactDictionaryFactory: { importFromXml(xml: string): unknown };
  GraphFactory: { apply(dict: unknown): FactGraph };
}

let _fg: FgModule | null = null;
let _mergedXml: string | null = null;

function extractFacts(xml: string): string {
  const start = xml.indexOf("<Facts>");
  const end = xml.indexOf("</Facts>");
  if (start === -1 || end === -1) return "";
  return xml.slice(start + "<Facts>".length, end);
}

async function loadFg(): Promise<FgModule> {
  if (_fg) return _fg;
  _fg = (await import("../../public/fg.mjs")) as unknown as FgModule;
  return _fg;
}

function loadMergedXml(): string {
  if (_mergedXml) return _mergedXml;
  const xmlDir = join(import.meta.dirname, "../../public");
  const xmlFiles = readdirSync(xmlDir).filter((f) => f.endsWith(".xml"));
  const mergedFacts = xmlFiles
    .map((f) => extractFacts(readFileSync(join(xmlDir, f), "utf-8")))
    .join("\n");
  _mergedXml = `<FactDictionaryModule><Facts>${mergedFacts}</Facts></FactDictionaryModule>`;
  return _mergedXml;
}

/**
 * Initialize writable defaults on a graph, matching the app's behavior.
 * Sets all Dollar writables to "0" and Boolean writables to "false".
 */
function initializeDefaults(xml: string, graph: FactGraph) {
  const factRegex = /<Fact\s+path="([^"]+)"[^>]*>[\s\S]*?<\/Fact>/g;
  let match;
  while ((match = factRegex.exec(xml)) !== null) {
    const path = match[1];
    const body = match[0];
    if (!/<Writable>/.test(body)) continue;
    if (/<Dollar\s*\/>/.test(body)) {
      graph.set(path, "0");
    } else if (/<Boolean\s*\/>/.test(body)) {
      graph.set(path, "false");
    }
  }
}

/**
 * Create a fresh fact graph with all XML files loaded.
 * Returns helpers for setting inputs and reading outputs.
 */
export async function createTestGraph() {
  const fg = await loadFg();
  const xml = loadMergedXml();
  const dict = fg.FactDictionaryFactory.importFromXml(xml);
  const graph = fg.GraphFactory.apply(dict);

  initializeDefaults(xml, graph);

  return {
    /** Set a writable fact. Value should be a string ("50000", "single", "true"). */
    set(path: string, value: string) {
      const result = graph.set(path, value);
      if (result.errorType) {
        throw new Error(
          `Error setting ${path}=${value}: ${result.errorType} - ${result.errorName}`
        );
      }
    },

    /** Get the string value of a fact. Returns the raw toString() output. */
    get(path: string): string {
      try {
        return graph.get(path).get.toString();
      } catch {
        return "—";
      }
    },

    /** Get a Dollar fact as a number (e.g. "$1,234.00" → 1234). */
    getDollar(path: string): number {
      const raw = this.get(path);
      return Number(raw.replace(/[$,]/g, ""));
    },
  };
}
