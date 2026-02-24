import { createContext, useContext } from "react";
import { useFactGraph } from "@/hooks/use-fact-graph";
import { AppShell } from "@/components/app-shell";

interface FactGraphContextValue {
  setFact: (path: string, value: string) => void;
  getFact: (path: string) => string;
  getXml: () => string;
  version: number;
}

export const FactGraphContext = createContext<FactGraphContextValue | null>(null);

export function useFactGraphContext() {
  const ctx = useContext(FactGraphContext);
  if (!ctx) throw new Error("useFactGraphContext must be used within FactGraphContext.Provider");
  return ctx;
}

function App() {
  const { loading, error, setFact, getFact, getXml, version } = useFactGraph();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error loading fact graph: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading fact graph...</p>
      </div>
    );
  }

  return (
    <FactGraphContext.Provider value={{ setFact, getFact, getXml, version }}>
      <AppShell />
    </FactGraphContext.Provider>
  );
}

export default App;
