interface FormSectionProps {
  title: string;
  lines: string;
}

export function FormSection({ title, lines }: FormSectionProps) {
  return (
    <div className="mt-8 mb-3">
      <div className="flex items-baseline justify-between border-b border-dashed border-foreground/20 pb-1">
        <span className="text-xs font-bold uppercase tracking-[0.2em]">{title}</span>
        <span className="text-[10px] text-muted-foreground">{lines}</span>
      </div>
    </div>
  );
}
