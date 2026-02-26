import { useState, useCallback, createContext, useContext, type ReactNode } from "react";

type View = "form" | "xml";

const ViewContext = createContext<View>("form");

export function useView() {
  return useContext(ViewContext);
}

function getInitialView(): View {
  const params = new URLSearchParams(window.location.search);
  return params.get("view") === "xml" ? "xml" : "form";
}

interface ReceiptLayoutProps {
  subtitle: string;
  formName: string;
  children: ReactNode;
}

export function ReceiptLayout({ subtitle, formName, children }: ReceiptLayoutProps) {
  const [view, setViewState] = useState<View>(getInitialView);
  const showXml = view === "xml";

  const setView = useCallback((v: View) => {
    setViewState(v);
    const url = new URL(window.location.href);
    if (v === "xml") {
      url.searchParams.set("view", "xml");
    } else {
      url.searchParams.delete("view");
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  return (
    <ViewContext.Provider value={view}>
      <div className="max-w-md mx-auto my-12 font-mono">
        {/* Receipt paper */}
        <div className="bg-background border border-foreground/10 shadow-sm px-8 py-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-lg font-bold tracking-tight">
              facts d
              <span className="inline-block w-[0.55em] h-[0.55em] rounded-full bg-foreground align-middle relative -top-[0.05em]" />
              t tax
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
              {subtitle}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {formName} · Tax Year 2025
            </div>
            <div className="mt-2 border-t border-foreground/10" />
            <div className="mt-2 flex items-center justify-center gap-3">
              <p className="text-[10px] text-muted-foreground/50">
                Modeled as a{" "}
                <a
                  href="https://github.com/IRS-Public/fact-graph"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  fact-graph
                </a>{" "}
                dictionary
              </p>
              <button
                onClick={() => setView(view === "form" ? "xml" : "form")}
                className={`text-[10px] px-2 py-0.5 border rounded transition-colors ${
                  showXml
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 text-muted-foreground hover:border-foreground/40"
                }`}
              >
                &lt;/&gt;
              </button>
            </div>
          </div>

          {/* Form content */}
          {children}

          {/* Footer */}
          <div className="mt-8 border-t border-foreground/10 pt-3 text-center space-y-2">
            <div className="text-[9px] text-muted-foreground/40 tracking-wider">
              facts d
              <span className="inline-block w-[0.4em] h-[0.4em] rounded-full bg-muted-foreground/40 align-middle relative -top-[0.03em]" />
              t tax — thank you
            </div>
            <a
              href="https://github.com/nmata010/facts-dot-tax"
              className="inline-block text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
              aria-label="GitHub repository"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </ViewContext.Provider>
  );
}
