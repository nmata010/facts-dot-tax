import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { handleLine, banner, rule, type Style, type CliApi, type CliSession } from "../../cli/shared";
import { createBrowserApi } from "./browser-api";

// ── ANSI style (same codes as Node CLI) ──

const style: Style = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
};

// ── ANSI → HTML converter ──

const ANSI_CLASSES: Record<string, string> = {
  "1": "cli-bold",
  "2": "cli-dim",
  "31": "cli-red",
  "32": "cli-green",
  "33": "cli-yellow",
  "36": "cli-cyan",
};

function ansiToHtml(str: string): string {
  let html = "";
  let open = false;
  let i = 0;
  while (i < str.length) {
    if (str[i] === "\x1b" && str[i + 1] === "[") {
      const end = str.indexOf("m", i);
      if (end === -1) { i++; continue; }
      const code = str.slice(i + 2, end);
      if (open) { html += "</span>"; open = false; }
      const cls = ANSI_CLASSES[code];
      if (cls) { html += `<span class="${cls}">`; open = true; }
      i = end + 1;
    } else {
      const ch = str[i];
      html += ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch === "&" ? "&amp;" : ch;
      i++;
    }
  }
  if (open) html += "</span>";
  return html;
}

// ── Component ──

export default function CliPage() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [ready, setReady] = useState(false);
  const [exited, setExited] = useState(false);

  const apiRef = useRef<CliApi | null>(null);
  const sessionRef = useRef<CliSession>({ ret: null });
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const write = useCallback((s: string) => {
    setLines((prev) => [...prev, s]);
  }, []);

  // Load engine, show banner, run demo commands
  useEffect(() => {
    let cancelled = false;
    createBrowserApi().then(async (api) => {
      if (cancelled) return;
      apiRef.current = api;
      const session = sessionRef.current;
      const out: string[] = [banner(style), rule(style)];
      const collect = (s: string) => out.push(s);
      for (const cmd of ["help", "list"]) {
        out.push(`  ${style.dim("tax >>")} ${cmd}`);
        await handleLine(cmd, session, api, style, collect);
        out.push(rule(style));
      }
      if (!cancelled) {
        setLines(out);
        setReady(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Auto-focus
  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const api = apiRef.current;
    if (!api || !input.trim() || exited) return;

    const cmd = input;
    setInput("");
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    // Echo the command
    write(`  ${style.dim("tax >>")} ${cmd}`);

    const done = await handleLine(cmd, sessionRef.current, api, style, write);
    if (done) {
      setExited(true);
    } else {
      write(rule(style));
    }
  }, [input, exited, write]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setInput(history[history.length - 1 - newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[history.length - 1 - newIdx]);
      }
    }
  }, [history, historyIdx]);

  return (
    <div
      className="h-dvh flex flex-col font-mono text-sm"
      style={{ background: "#0d1117", color: "#c9d1d9" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs select-none shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span style={{ color: "#6e7681" }}>facts.tax/cli</span>
        <Link to="/" className="hover:underline" style={{ color: "#6e7681" }}>
          back
        </Link>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 whitespace-pre-wrap break-words"
      >
        {!ready && (
          <div style={{ color: "#6e7681" }}>  Loading engine...</div>
        )}
        {lines.map((line, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: ansiToHtml(line) }} />
        ))}
      </div>

      {/* Input */}
      <div
        className="shrink-0 px-4 py-3 flex items-center gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span style={{ color: "#6e7681" }}>tax &gt;&gt;</span>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1); }}
            onKeyDown={handleKeyDown}
            disabled={!ready || exited}
            className="w-full bg-transparent outline-none caret-current"
            style={{ color: "#c9d1d9" }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>

      {/* Terminal color styles */}
      <style>{`
        .cli-bold { font-weight: 700; color: #f0f6fc; }
        .cli-dim { color: #6e7681; }
        .cli-red { color: #f85149; }
        .cli-green { color: #3fb950; }
        .cli-yellow { color: #d29922; }
        .cli-cyan { color: #58a6ff; }
      `}</style>
    </div>
  );
}
