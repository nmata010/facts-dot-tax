import { useFactGraphContext } from "@/App";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface FactSelectProps {
  path: string;
  options: Option[];
  defaultValue?: string;
}

export function FactSelect({ path, options, defaultValue }: FactSelectProps) {
  const { setFact } = useFactGraphContext();

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => setFact(path, value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
