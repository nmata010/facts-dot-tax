import { useFactGraphContext } from "@/App";

interface FactInputProps {
  path: string;
}

export function FactInput({ path }: FactInputProps) {
  const { setFact } = useFactGraphContext();

  return (
    <div className="flex items-center text-xs">
      <span className="text-muted-foreground/60">$</span>
      <input
        type="text"
        placeholder="0"
        defaultValue=""
        className="w-full bg-transparent text-right outline-none border-b border-foreground/10 focus:border-foreground/40 py-0.5 px-1 tabular-nums transition-colors"
        onChange={(e) => setFact(path, e.target.value || "0")}
      />
    </div>
  );
}
