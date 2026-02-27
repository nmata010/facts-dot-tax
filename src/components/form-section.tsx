interface FormSectionProps {
  title: string;
  id?: string;
}

export function FormSection({ title, id }: FormSectionProps) {
  return (
    <div className="mt-8 mb-3" id={id}>
      <div className="border-b border-dashed border-foreground/20 pb-1">
        <span className="text-xs font-bold uppercase tracking-[0.2em]">{title}</span>
      </div>
    </div>
  );
}
