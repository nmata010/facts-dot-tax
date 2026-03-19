import { useState, useCallback, useEffect, useRef, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { FORMS } from "@/forms/registry";

const FormNavContext = createContext<(id: string, section?: string) => void>(() => {});
export function useFormNav() {
  return useContext(FormNavContext);
}

function getInitialFormId(): string {
  const params = new URLSearchParams(window.location.search);
  const form = params.get("form");
  if (form && FORMS.some((f) => f.id === form)) return form;
  return FORMS[0].id;
}

function updateFormParam(id: string) {
  const url = new URL(window.location.href);
  if (id === FORMS[0].id) {
    url.searchParams.delete("form");
  } else {
    url.searchParams.set("form", id);
  }
  window.history.replaceState(null, "", url.toString());
}

export function AppShell() {
  const [selectedId, setSelectedId] = useState(getInitialFormId);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const scrollTargetRef = useRef<string | null>(null);

  // After every form switch (and initial mount), scroll to top or target section
  // once the unfold animation (400ms) completes
  useEffect(() => {
    const timer = setTimeout(() => {
      const section = scrollTargetRef.current;
      scrollTargetRef.current = null;
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0 });
      }
    }, 420);
    return () => clearTimeout(timer);
  }, [animKey]);

  const selectForm = useCallback(
    (id: string, section?: string) => {
      scrollTargetRef.current = section ?? null;
      if (id !== selectedId) {
        setSelectedId(id);
        setAnimKey((k) => k + 1);
        updateFormParam(id);
      } else {
        // Same form — scroll immediately
        if (section) {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setSheetOpen(false);
    },
    [selectedId],
  );

  const entry = FORMS.find((f) => f.id === selectedId) ?? FORMS[0];
  const FormComponent = entry.component;

  return (
    <FormNavContext.Provider value={selectForm}>
    <div className="md:flex md:min-h-screen">
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col shrink-0 w-40 border-r border-foreground/10 py-8 px-3 gap-1 font-mono">
        <Link
          to="/"
          className="text-[9px] text-muted-foreground/40 hover:text-muted-foreground px-2 mb-3 transition-colors flex items-center gap-1.5"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          facts.tax
        </Link>
        <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 mb-2 px-2">
          Forms
        </div>
        {FORMS.map((form) => (
          <button
            key={form.id}
            onClick={() => selectForm(form.id)}
            className={`text-left text-[11px] px-2 py-1.5 rounded transition-colors ${
              form.id === selectedId
                ? "bg-foreground/5 text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
            }`}
          >
            {form.label}
          </button>
        ))}
      </nav>

      {/* Mobile home link */}
      <Link
        to="/"
        className="md:hidden fixed top-3 left-3 z-50 text-[9px] text-muted-foreground/40 hover:text-muted-foreground transition-colors flex items-center gap-1.5 font-mono"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        facts.tax
      </Link>

      {/* Receipt area */}
      <main className="flex-1 min-w-0 pb-14 md:pb-0">
        <div
          key={animKey}
          className="receipt-unfold md:receipt-unfold-left"
          style={{ transformOrigin: "left center" }}
        >
          <FormComponent />
        </div>
      </main>

      {/* Mobile bottom sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Handle / current form indicator */}
        <button
          onClick={() => setSheetOpen(!sheetOpen)}
          className="w-full bg-background/95 backdrop-blur border-t border-foreground/10 px-4 py-3 flex items-center justify-between font-mono"
        >
          <span className="text-[11px] text-muted-foreground">{entry.label}</span>
          <span
            className="text-[10px] text-muted-foreground/60 transition-transform duration-200"
            style={{ transform: sheetOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▲
          </span>
        </button>

        {/* Sheet content */}
        <div
          className="bg-background/95 backdrop-blur border-t border-foreground/10 overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: sheetOpen ? "50vh" : 0 }}
        >
          <div className="px-4 py-2 space-y-1 font-mono">
            {FORMS.map((form) => (
              <button
                key={form.id}
                onClick={() => selectForm(form.id)}
                className={`w-full text-left text-[11px] px-2 py-2 rounded transition-colors ${
                  form.id === selectedId
                    ? "bg-foreground/5 text-foreground font-medium"
                    : "text-muted-foreground active:bg-foreground/5"
                }`}
              >
                {form.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
    </FormNavContext.Provider>
  );
}
