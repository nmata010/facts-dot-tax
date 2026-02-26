import { useFactGraphContext } from "@/App";

interface DerivedValueProps {
  path: string;
  className?: string;
}

export function DerivedValue({ path, className = "" }: DerivedValueProps) {
  const { getFact, version: _version } = useFactGraphContext();
  void _version;
  const value = getFact(path);

  return <span className={`tabular-nums ${className}`}>${value}</span>;
}
