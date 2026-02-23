import { useFactGraphContext } from "@/App";
import { Checkbox } from "@/components/ui/checkbox";

interface FactCheckboxProps {
  path: string;
  label: string;
}

export function FactCheckbox({ path, label }: FactCheckboxProps) {
  const { setFact } = useFactGraphContext();

  return (
    <label className="flex items-center gap-1.5 cursor-pointer">
      <Checkbox
        className="h-3 w-3 rounded-[2px]"
        onCheckedChange={(checked) => setFact(path, checked.toString())}
      />
      <span className="text-[11px]">{label}</span>
    </label>
  );
}
