import type { ReactNode } from "react";

interface FormLineProps {
  line: string;
  label: string;
  children: ReactNode;
}

export function FormLine({ line, label, children }: FormLineProps) {
  return (
    <div className="flex items-center gap-2 text-xs leading-6">
      <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px]">{line}</span>
      <span className="shrink-0">{label}</span>
      <span className="flex-1 border-b border-dotted border-foreground/15 self-end mb-[5px]" />
      <div className="w-28 shrink-0">{children}</div>
    </div>
  );
}
