import { useState, useCallback } from "react";
import { FORMS } from "@/forms/registry";

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

  const selectForm = useCallback(
    (id: string) => {
      if (id !== selectedId) {
        setSelectedId(id);
        setAnimKey((k) => k + 1);
        updateFormParam(id);
      }
      setSheetOpen(false);
    },
    [selectedId],
  );

  const entry = FORMS.find((f) => f.id === selectedId) ?? FORMS[0];
  const FormComponent = entry.component;

  return (
    <div className="md:flex md:min-h-screen">
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col shrink-0 w-40 border-r border-foreground/10 py-8 px-3 gap-1 font-mono">
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
  );
}
