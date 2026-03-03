import { useFactGraphContext } from "@/App";

interface FactIntInputProps {
  path: string;
}

export function FactIntInput({ path }: FactIntInputProps) {
  const { setFact, getFact } = useFactGraphContext();

  const stored = getFact(path);
  const initial = stored === "\u2014" || stored === "0" ? "" : stored;

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="0"
      defaultValue={initial}
      key={path}
      className="w-full bg-transparent text-right outline-none border-b border-foreground/10 focus:border-foreground/40 py-0.5 px-1 text-xs tabular-nums transition-colors"
      onChange={(e) => setFact(path, e.target.value || "0")}
    />
  );
}
