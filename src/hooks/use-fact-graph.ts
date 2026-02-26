import { useRef, useState, useEffect, useCallback } from "react";
import { FORMS } from "@/forms/registry";

// Minimal types for the Scala.js fact-graph API
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

interface FactDictionaryFactoryType {
  importFromXml(xml: string): unknown;
}

interface GraphFactoryType {
  apply(dict: unknown): FactGraph;
}

interface FgModule {
  FactDictionaryFactory: FactDictionaryFactoryType;
  GraphFactory: GraphFactoryType;
}

/**
 * Extract the inner content of <Facts>...</Facts> from an XML string.
 */
function extractFacts(xml: string): string {
  const start = xml.indexOf("<Facts>");
  const end = xml.indexOf("</Facts>");
  if (start === -1 || end === -1) return "";
  return xml.slice(start + "<Facts>".length, end);
}

/**
 * Parse writable fact paths and their types from a merged XML string,
 * then initialize defaults on the graph.
 */
function initializeDefaults(xml: string, graph: FactGraph) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const facts = doc.querySelectorAll("Fact");

  for (const fact of facts) {
    const path = fact.getAttribute("path");
    if (!path) continue;

    const writable = fact.querySelector("Writable");
    if (!writable) continue;

    if (writable.querySelector("Dollar")) {
      graph.set(path, "0");
    } else if (writable.querySelector("Boolean")) {
      graph.set(path, "false");
    }
    // Enum writables are skipped — components provide their own defaultValue
  }
}

export function useFactGraph() {
  const graphRef = useRef<FactGraph | null>(null);
  const xmlRef = useRef<string>("");
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFgModule(): Promise<FgModule> {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
          import * as fg from "${import.meta.env.BASE_URL}fg.mjs";
          window.__fg = fg;
          window.dispatchEvent(new Event("fg-loaded"));
        `;
        const onLoad = () => {
          window.removeEventListener("fg-loaded", onLoad);
          const fg = (window as unknown as Record<string, FgModule>).__fg;
          resolve(fg);
        };
        window.addEventListener("fg-loaded", onLoad);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    async function init() {
      try {
        // Collect unique XML filenames from the registry
        const xmlFiles = [...new Set(FORMS.map((f) => f.xmlFile))];

        // Fetch all XML files in parallel alongside the fg module
        const [fg, ...xmlResponses] = await Promise.all([
          loadFgModule(),
          ...xmlFiles.map((file) => fetch(`${import.meta.env.BASE_URL}${file}`)),
        ]);

        if (cancelled) return;

        const xmlTexts = await Promise.all(xmlResponses.map((r) => r.text()));

        // Merge all <Fact> elements into a single dictionary
        const mergedFacts = xmlTexts.map(extractFacts).join("\n");
        const mergedXml = `<FactDictionaryModule><Facts>${mergedFacts}</Facts></FactDictionaryModule>`;

        const dict = (fg as FgModule).FactDictionaryFactory.importFromXml(mergedXml);
        const graph = (fg as FgModule).GraphFactory.apply(dict);

        // Auto-detect and initialize writable defaults from the XML
        initializeDefaults(mergedXml, graph);

        graphRef.current = graph;
        xmlRef.current = mergedXml;
        setLoading(false);
        setVersion(1);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setLoading(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const setFact = useCallback((path: string, value: string) => {
    const graph = graphRef.current;
    if (!graph) return;
    const result = graph.set(path, value);
    if (result.errorType) {
      console.warn(`Error setting ${path}: ${result.errorType} - ${result.errorName}`);
    }
    setVersion((v) => v + 1);
  }, []);

  const getFact = useCallback((path: string): string => {
    const graph = graphRef.current;
    if (!graph) return "\u2014";
    try {
      return graph.get(path).get.toString();
    } catch {
      return "\u2014";
    }
  }, []);

  const getXml = useCallback(() => xmlRef.current, []);

  return { loading, error, setFact, getFact, getXml, version };
}
