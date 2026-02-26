import type { ReactNode } from "react";
import { XmlSnippet } from "@/components/xml-snippet";
import { useView } from "@/components/receipt-layout";

interface FormLineProps {
  line: string;
  label: string;
  path?: string;
  children: ReactNode;
}

export function FormLine({ line, label, path, children }: FormLineProps) {
  const view = useView();
  const showXml = view === "xml";

  return (
    <div className="relative">
      {/* Form view */}
      <div
        className="flex items-baseline gap-2 text-xs leading-6 transition-all duration-300"
        style={{
          opacity: showXml ? 0 : 1,
          maxHeight: showXml ? 0 : 100,
          overflow: "hidden",
        }}
      >
        <span className="w-6 shrink-0 text-muted-foreground/40">{line}</span>
        <span className="shrink min-w-0">{label}</span>
        <span className="shrink-0 min-w-[1.5em] flex-1 border-b border-dotted border-foreground/15 self-end mb-[5px]" />
        <div className="w-28 shrink-0">{children}</div>
      </div>

      {/* XML view */}
      <div
        className="transition-all duration-300"
        style={{
          opacity: showXml ? 1 : 0,
          maxHeight: showXml ? 500 : 0,
          overflow: "hidden",
        }}
      >
        <div className="flex gap-2 min-w-0">
          <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px] leading-6">{line}</span>
          {path && <XmlSnippet path={path} className="flex-1 min-w-0" />}
        </div>
      </div>
    </div>
  );
}
