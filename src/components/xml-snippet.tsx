import { useMemo } from "react";
import { useFactGraphContext } from "@/App";

export function getXmlForPath(xml: string, path: string): string {
  const opener = `<Fact path="${path}">`;
  const start = xml.indexOf(opener);
  if (start === -1) return "";
  const end = xml.indexOf("</Fact>", start);
  if (end === -1) return "";
  const raw = xml.slice(start, end + "</Fact>".length);
  const lines = raw.split("\n");
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => l.match(/^(\s*)/)?.[1].length ?? 0);
  const minIndent = Math.min(...indents);
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

const DEP_RE = /<Dependency\s+path="([^"]+)"\s*\/>/;
const LINE_CLASS = "text-[9px] leading-[1.4]";

interface XmlSnippetProps {
  path: string;
  className?: string;
}

export function XmlSnippet({ path, className = "" }: XmlSnippetProps) {
  const { getXml, getFact, version: _version } = useFactGraphContext();
  void _version;
  const snippet = useMemo(() => getXmlForPath(getXml(), path), [getXml, path]);
  const value = getFact(path);

  if (!snippet) return null;

  const lines = snippet.split("\n");

  return (
    <div className={`flex gap-2 min-w-0 ${className}`}>
      {/* Scrollable XML column */}
      <pre className={`${LINE_CLASS} text-muted-foreground overflow-x-auto whitespace-pre min-w-0 flex-1`}>
        {snippet}
      </pre>

      {/* Fixed value column — one div per line, heights match the pre lines */}
      <div className="shrink-0 w-20">
        {lines.map((line, i) => {
          const depMatch = line.match(DEP_RE);
          const depValue = depMatch ? getFact(depMatch[1]) : null;
          const isFirstLine = i === 0;

          return (
            <div key={i} className={`${LINE_CLASS} text-right tabular-nums`}>
              {isFirstLine && value !== "\u2014" ? (
                <span className="text-foreground/80 font-medium">{value}</span>
              ) : depValue ? (
                <span className="text-muted-foreground/60">{depValue}</span>
              ) : (
                "\u00A0"
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
