import { readFileSync, readdirSync } from "fs";
import { join } from "path";

// ── Engine types ──

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

// ── Public types ──

export interface FactSchema {
  path: string;
  name: string;
  description: string;
  type: "Dollar" | "Int" | "Boolean" | "Enum" | "String";
  options?: string[];
}

export interface FactResult {
  path: string;
  name: string;
  value: string;
  kind: "writable" | "derived";
}

export interface TaxReturn {
  setFact(path: string, value: string): void;
  getFact(path: string): string;
  getDollar(path: string): number;
  getForm(formId: string): FactResult[];
}

// ── Form registry ──

const FORMS: Record<string, string> = {
  "1040": "1040.xml",
  eicWorksheet: "eic-worksheet.xml",
  f8889: "f8889.xml",
  f8995: "f8995.xml",
  schedule1: "schedule1.xml",
  schedule1A: "schedule1A.xml",
  schedule2: "schedule2.xml",
  schedule3: "schedule3.xml",
  schedule8812: "schedule8812.xml",
  scheduleA: "scheduleA.xml",
  scheduleB: "scheduleB.xml",
  scheduleC: "scheduleC.xml",
  scheduleE: "scheduleE.xml",
  scheduleSE: "scheduleSE.xml",
};

// ── XML directory ──

const XML_DIR = join(import.meta.dirname, "../public");

// ── XML parsing helpers ──

interface ParsedFact {
  path: string;
  name: string;
  description: string;
  type: "Dollar" | "Int" | "Boolean" | "Enum" | "String";
  isWritable: boolean;
  enumOptionsPath?: string;
}

function parseFacts(xml: string): ParsedFact[] {
  const facts: ParsedFact[] = [];
  const factRegex = /<Fact\s+path="([^"]+)"[^>]*>([\s\S]*?)<\/Fact>/g;
  let match;

  while ((match = factRegex.exec(xml)) !== null) {
    const path = match[1];
    const body = match[2];

    const nameMatch = body.match(/<Name>([\s\S]*?)<\/Name>/);
    const descMatch = body.match(/<Description>([\s\S]*?)<\/Description>/);
    const isWritable = /<Writable>/.test(body);

    let type: ParsedFact["type"] = "String";
    if (/<Dollar\s*\/>/.test(body)) type = "Dollar";
    else if (/<Int\s*\/>/.test(body)) type = "Int";
    else if (/<Boolean\s*\/>/.test(body)) type = "Boolean";
    else if (/<Enum\s/.test(body)) type = "Enum";

    const optionsPathMatch = body.match(/<Enum\s+optionsPath="([^"]+)"/);

    facts.push({
      path,
      name: nameMatch ? nameMatch[1].trim() : path,
      description: descMatch ? descMatch[1].trim() : "",
      type,
      isWritable,
      enumOptionsPath: optionsPathMatch ? optionsPathMatch[1] : undefined,
    });
  }

  return facts;
}

function extractFactsXml(xml: string): string {
  const start = xml.indexOf("<Facts>");
  const end = xml.indexOf("</Facts>");
  if (start === -1 || end === -1) return "";
  return xml.slice(start + "<Facts>".length, end);
}

function parseEnumOptions(xml: string): Map<string, string[]> {
  const enums = new Map<string, string[]>();
  const regex = /<Fact\s+path="([^"]+)"[^>]*>[\s\S]*?<EnumOptions>([\s\S]*?)<\/EnumOptions>[\s\S]*?<\/Fact>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const path = match[1];
    const body = match[2];
    const options: string[] = [];
    const strRegex = /<String>([^<]+)<\/String>/g;
    let strMatch;
    while ((strMatch = strRegex.exec(body)) !== null) {
      options.push(strMatch[1]);
    }
    enums.set(path, options);
  }
  return enums;
}

let _enumOptions: Map<string, string[]> | null = null;

function getEnumOptions(xml: string): Map<string, string[]> {
  if (_enumOptions) return _enumOptions;
  _enumOptions = parseEnumOptions(xml);
  return _enumOptions;
}

function resolveFormId(formId: string): string {
  const filename = FORMS[formId];
  if (!filename) {
    throw new Error(
      `Unknown form: "${formId}". Available forms: ${Object.keys(FORMS).join(", ")}`
    );
  }
  return filename;
}

function readFormXml(formId: string): string {
  const filename = resolveFormId(formId);
  return readFileSync(join(XML_DIR, filename), "utf-8");
}

// ── Cached state ──

let _fg: FgModule | null = null;
let _mergedXml: string | null = null;

async function loadFg(): Promise<FgModule> {
  if (_fg) return _fg;
  _fg = (await import("../public/fg.mjs")) as unknown as FgModule;
  return _fg;
}

function loadMergedXml(): string {
  if (_mergedXml) return _mergedXml;
  const xmlFiles = readdirSync(XML_DIR).filter(
    (f) => f.endsWith(".xml") && f !== "formtbd.xml"
  );
  const mergedFacts = xmlFiles
    .map((f) => extractFactsXml(readFileSync(join(XML_DIR, f), "utf-8")))
    .join("\n");
  _mergedXml = `<FactDictionaryModule><Facts>${mergedFacts}</Facts></FactDictionaryModule>`;
  return _mergedXml;
}

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

// ── Public API ──

export function listForms(): string[] {
  return Object.keys(FORMS);
}

export function getFormSchema(formId: string): FactSchema[] {
  const xml = readFormXml(formId);
  const mergedXml = loadMergedXml();
  const enumOpts = getEnumOptions(mergedXml);
  return parseFacts(xml)
    .filter((f) => f.isWritable)
    .map(({ path, name, description, type, enumOptionsPath }) => {
      const schema: FactSchema = { path, name, description, type };
      if (type === "Enum" && enumOptionsPath) {
        schema.options = enumOpts.get(enumOptionsPath);
      }
      return schema;
    });
}

export async function createReturn(): Promise<TaxReturn> {
  const fg = await loadFg();
  const xml = loadMergedXml();
  const dict = fg.FactDictionaryFactory.importFromXml(xml);
  const graph = fg.GraphFactory.apply(dict);

  initializeDefaults(xml, graph);

  // Build per-form fact metadata for getForm lookups
  const formFacts = new Map<string, ParsedFact[]>();
  const allFacts = new Map<string, ParsedFact>();
  for (const [formId, filename] of Object.entries(FORMS)) {
    const formXml = readFileSync(join(XML_DIR, filename), "utf-8");
    const parsed = parseFacts(formXml);
    formFacts.set(formId, parsed);
    for (const f of parsed) allFacts.set(f.path, f);
  }

  const enumOpts = getEnumOptions(xml);

  return {
    setFact(path: string, value: string) {
      const fact = allFacts.get(path);
      if (fact?.type === "Enum" && fact.enumOptionsPath) {
        const valid = enumOpts.get(fact.enumOptionsPath);
        if (valid && !valid.includes(value)) {
          throw new Error(
            `Invalid value "${value}" for ${path}. Valid options: ${valid.join(", ")}`
          );
        }
      }
      const result = graph.set(path, value);
      if (result.errorType) {
        throw new Error(
          `Error setting ${path}="${value}": ${result.errorType} - ${result.errorName}`
        );
      }
    },

    getFact(path: string): string {
      try {
        const result = graph.get(path);
        return result.get.toString();
      } catch (e) {
        throw new Error(`Error reading ${path}: ${e}`);
      }
    },

    getDollar(path: string): number {
      const raw = this.getFact(path);
      return Number(raw.replace(/[$,]/g, ""));
    },

    getForm(formId: string): FactResult[] {
      const facts = formFacts.get(formId);
      if (!facts) {
        throw new Error(
          `Unknown form: "${formId}". Available forms: ${Object.keys(FORMS).join(", ")}`
        );
      }
      return facts.map((f) => ({
        path: f.path,
        name: f.name,
        value: this.getFact(f.path),
        kind: f.isWritable ? ("writable" as const) : ("derived" as const),
      }));
    },
  };
}
