import { useRef, useState, useEffect, useCallback } from "react";

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

// Default values for writable facts
const DOLLAR_FACTS = [
  "/wagesFromW2",
  "/householdEmployeeWages",
  "/unreportedTipIncome",
  "/medicaidWaiverPayments",
  "/taxableDependentCareBenefits",
  "/employerAdoptionBenefits",
  "/wagesFrom8919",
  "/otherEarnedIncome",
  "/taxExemptInterest",
  "/taxableInterest",
  "/qualifiedDividends",
  "/ordinaryDividends",
  "/iraDistributions",
  "/taxableIraDistributions",
  "/pensionsAndAnnuities",
  "/taxablePensionsAndAnnuities",
  "/socialSecurityBenefits",
  "/taxableSocialSecurityBenefits",
  "/capitalGainOrLoss",
  "/otherIncome",
  "/adjustmentsToIncome",
  "/qbiDeduction",
  "/additionalDeductions",
  "/tax",
];

const BOOLEAN_FACTS = [
  "/filerBornBefore1961",
  "/filerBlind",
  "/spouseBornBefore1961",
  "/spouseBlind",
];

export function useFactGraph() {
  const graphRef = useRef<FactGraph | null>(null);
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
        const [fg, xmlResponse] = await Promise.all([
          loadFgModule(),
          fetch("/1040.xml"),
        ]);

        if (cancelled) return;

        const xml = await xmlResponse.text();
        const dict = fg.FactDictionaryFactory.importFromXml(xml);
        const graph = fg.GraphFactory.apply(dict);

        // Initialize defaults
        for (const path of DOLLAR_FACTS) {
          graph.set(path, "0");
        }
        for (const path of BOOLEAN_FACTS) {
          graph.set(path, "false");
        }
        graph.set("/filingStatus", "single");

        graphRef.current = graph;
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

  return { loading, error, setFact, getFact, version };
}
