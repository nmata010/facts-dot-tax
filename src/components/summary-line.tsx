import { DerivedValue } from "@/components/derived-value";
import { XmlSnippet } from "@/components/xml-snippet";
import { useView } from "@/components/receipt-layout";

interface SummaryLineProps {
  line: string;
  label: string;
  path: string;
  bold?: boolean;
}

export function SummaryLine({ line, label, path, bold = false }: SummaryLineProps) {
  const view = useView();
  const showXml = view === "xml";

  return (
    <div className="relative">
      {/* Form view */}
      <div
        className={`flex items-baseline gap-2 text-xs leading-7 transition-all duration-300 ${bold ? "border-t border-double border-foreground/30 mt-1 pt-1" : ""}`}
        style={{
          opacity: showXml ? 0 : 1,
          maxHeight: showXml ? 0 : 100,
          overflow: "hidden",
        }}
      >
        <span className="w-6 shrink-0 text-muted-foreground/40">{line}</span>
        <span className={`shrink min-w-0 ${bold ? "font-bold" : ""}`}>{label}</span>
        <span className="flex-1 border-b border-dotted border-foreground/15 self-end mb-[5px]" />
        <DerivedValue path={path} className={`shrink-0 text-right text-xs ${bold ? "font-bold" : ""}`} />
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
          <XmlSnippet path={path} className="flex-1 min-w-0" />
        </div>
      </div>
    </div>
  );
}
