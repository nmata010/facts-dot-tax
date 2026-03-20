import type { CliApi, TaxReturn, FactSchema } from "../../cli/shared";

// ── Engine types ──

interface FactGraph {
  set(path: string, value: string): { errorType?: string; errorName?: string };
  get(path: string): { get: { toString(): string }; complete: boolean };
}

interface FgModule {
  FactDictionaryFactory: { importFromXml(xml: string): unknown };
  GraphFactory: { apply(dict: unknown): FactGraph };
}

// ── Form registry (mirrors lib/index.ts) ──

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

// ── XML parsing (duplicated from lib — pure string ops, no Node deps) ──

interface ParsedFact {
  path: string;
  name: string;
  description: string;
  type: "Dollar" | "Int" | "Boolean" | "Enum" | "String";
  isWritable: boolean;
  enumOptionsPath?: string;
  line?: string;
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
    const lineMatch = body.match(/<Line>([\s\S]*?)<\/Line>/);
    facts.push({
      path,
      name: nameMatch ? nameMatch[1].trim() : path,
      description: descMatch ? descMatch[1].trim() : "",
      type,
      isWritable,
      enumOptionsPath: optionsPathMatch ? optionsPathMatch[1] : undefined,
      line: lineMatch ? lineMatch[1].trim() : undefined,
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
    const body = match[2];
    const options: string[] = [];
    const strRegex = /<String>([^<]+)<\/String>/g;
    let strMatch;
    while ((strMatch = strRegex.exec(body)) !== null) {
      options.push(strMatch[1]);
    }
    enums.set(match[1], options);
  }
  return enums;
}

function parseDependencyGraph(xml: string): Map<string, string[]> {
  const deps = new Map<string, string[]>();
  const factRegex = /<Fact\s+path="([^"]+)"[^>]*>([\s\S]*?)<\/Fact>/g;
  let match;
  while ((match = factRegex.exec(xml)) !== null) {
    const body = match[2];
    if (/<Writable>/.test(body)) continue;
    const depPaths: string[] = [];
    const depRegex = /<Dependency\s+path="([^"]+)"\s*\/>/g;
    let depMatch;
    while ((depMatch = depRegex.exec(body)) !== null) {
      depPaths.push(depMatch[1]);
    }
    if (depPaths.length > 0) {
      deps.set(match[1], depPaths);
    }
  }
  return deps;
}

function initializeDefaults(xml: string, graph: FactGraph) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  for (const fact of doc.querySelectorAll("Fact")) {
    const path = fact.getAttribute("path");
    if (!path) continue;
    const writable = fact.querySelector("Writable");
    if (!writable) continue;
    if (writable.querySelector("Dollar")) graph.set(path, "0");
    else if (writable.querySelector("Boolean")) graph.set(path, "false");
  }
}

// ── Load fg.mjs in the browser ──

async function loadFgModule(): Promise<FgModule> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import * as fg from "${import.meta.env.BASE_URL}fg.mjs";
      window.__fgCli = fg;
      window.dispatchEvent(new Event("fg-cli-loaded"));
    `;
    const onLoad = () => {
      window.removeEventListener("fg-cli-loaded", onLoad);
      resolve((window as unknown as Record<string, FgModule>).__fgCli);
    };
    window.addEventListener("fg-cli-loaded", onLoad);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ── Factory ──

export async function createBrowserApi(): Promise<CliApi> {
  // Load engine + all XMLs in parallel
  const xmlFilenames = [...new Set(Object.values(FORMS))];
  const [fg, ...xmlResponses] = await Promise.all([
    loadFgModule(),
    ...xmlFilenames.map((f) => fetch(`${import.meta.env.BASE_URL}${f}`)),
  ]);
  const xmlTexts = await Promise.all(xmlResponses.map((r) => r.text()));
  const xmlMap = new Map<string, string>();
  xmlFilenames.forEach((f, i) => xmlMap.set(f, xmlTexts[i]));

  // Merge all facts
  const mergedFacts = xmlTexts.map(extractFactsXml).join("\n");
  const mergedXml = `<FactDictionaryModule><Facts>${mergedFacts}</Facts></FactDictionaryModule>`;
  const enumOpts = parseEnumOptions(mergedXml);

  return {
    listForms: () => Object.keys(FORMS),

    getFormSchema: (formId: string): FactSchema[] => {
      const filename = FORMS[formId];
      if (!filename) {
        throw new Error(`Unknown form: "${formId}". Available: ${Object.keys(FORMS).join(", ")}`);
      }
      return parseFacts(xmlMap.get(filename)!)
        .filter((f) => f.isWritable)
        .map(({ path, name, description, type, enumOptionsPath }) => {
          const schema: FactSchema = { path, name, description, type };
          if (type === "Enum" && enumOptionsPath) {
            schema.options = enumOpts.get(enumOptionsPath);
          }
          return schema;
        });
    },

    createReturn: async (): Promise<TaxReturn> => {
      const dict = fg.FactDictionaryFactory.importFromXml(mergedXml);
      const graph = fg.GraphFactory.apply(dict);
      initializeDefaults(mergedXml, graph);

      // Build per-form metadata
      const formFacts = new Map<string, ParsedFact[]>();
      const allFacts = new Map<string, ParsedFact>();
      for (const [formId, filename] of Object.entries(FORMS)) {
        const parsed = parseFacts(xmlMap.get(filename)!);
        formFacts.set(formId, parsed);
        for (const f of parsed) allFacts.set(f.path, f);
      }

      const depGraph = parseDependencyGraph(mergedXml);

      function traceWritableDeps(path: string, visited = new Set<string>()): string[] {
        if (visited.has(path)) return [];
        visited.add(path);
        const fact = allFacts.get(path);
        if (fact?.isWritable) return [path];
        const deps = depGraph.get(path);
        if (!deps) return [];
        return deps.flatMap((dep) => traceWritableDeps(dep, visited));
      }

      function getFact(path: string): string {
        try {
          return graph.get(path).get.toString();
        } catch (e) {
          throw new Error(`Error reading ${path}: ${e}`);
        }
      }

      return {
        setFact(path: string, value: string) {
          const fact = allFacts.get(path);
          if (!fact) throw new Error(`Unknown fact: "${path}"`);
          if (!fact.isWritable) throw new Error(`"${path}" is derived and cannot be set directly.`);
          if (fact.type === "Enum" && fact.enumOptionsPath) {
            const valid = enumOpts.get(fact.enumOptionsPath);
            if (valid && !valid.includes(value)) {
              throw new Error(`Invalid "${value}" for ${path}. Valid: ${valid.join(", ")}`);
            }
          }
          const result = graph.set(path, value);
          if (result.errorType) {
            throw new Error(`Error setting ${path}="${value}": ${result.errorType} - ${result.errorName}`);
          }
        },
        getFact,
        getDollar(path: string) {
          return Number(getFact(path).replace(/[$,]/g, ""));
        },
        getForm(formId: string) {
          const facts = formFacts.get(formId);
          if (!facts) throw new Error(`Unknown form: "${formId}"`);
          return facts
            .filter((f) => f.line !== undefined)
            .sort((a, b) => {
              const aNum = parseFloat(a.line!);
              const bNum = parseFloat(b.line!);
              if (isNaN(aNum) || isNaN(bNum)) return a.line!.localeCompare(b.line!);
              return aNum - bNum;
            })
            .map((f) => {
              let value: string;
              try { value = getFact(f.path); } catch { value = "—"; }
              return {
                path: f.path,
                name: f.name,
                value,
                kind: f.isWritable ? ("writable" as const) : ("derived" as const),
                line: f.line,
              };
            });
        },
        getDependencies(path: string) {
          const fact = allFacts.get(path);
          if (!fact) throw new Error(`Unknown fact: "${path}"`);
          const writablePaths = [...new Set(traceWritableDeps(path))];
          return writablePaths.map((p) => {
            const f = allFacts.get(p)!;
            let value: string | undefined;
            try { value = getFact(p); } catch { value = undefined; }
            return { path: p, name: f.name, type: f.type, isWritable: true, value };
          });
        },
      };
    },
  };
}
