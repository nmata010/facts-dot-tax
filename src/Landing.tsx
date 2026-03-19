import { Link } from "react-router-dom";

function BrandMark({ size = "text-4xl" }: { size?: string }) {
  return (
    <span className={`${size} font-bold tracking-tight font-mono`}>
      facts d
      <span className="inline-block w-[0.55em] h-[0.55em] rounded-full bg-foreground align-middle relative -top-[0.05em]" />
      t tax
    </span>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-mono px-6">
      <div className="max-w-md w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <BrandMark />
          <p className="text-sm text-muted-foreground">
            Open-source TY2025 tax computation
          </p>
          <p className="text-xs text-muted-foreground/60">
            Built on the IRS{" "}
            <a
              href="https://github.com/IRS-Public/fact-graph"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              fact-graph
            </a>{" "}
            engine
          </p>
        </div>

        {/* Three entry points */}
        <div className="space-y-3">
          <Link
            to="/app"
            className="block border border-foreground/10 rounded px-5 py-4 hover:bg-foreground/[0.03] transition-colors group"
          >
            <div className="text-sm font-medium group-hover:text-foreground">
              Receipts App
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Fill out tax forms in the browser and see computed values update live.
            </div>
          </Link>

          <div
            className="block border border-foreground/10 rounded px-5 py-4 opacity-50 cursor-not-allowed"
          >
            <div className="text-sm font-medium">
              CLI Demo
              <span className="text-[10px] text-muted-foreground/60 ml-2">coming soon</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Try the tax engine from an interactive terminal, right in the browser.
            </div>
          </div>

          <a
            href="https://github.com/nmata010/facts-dot-tax"
            className="block border border-foreground/10 rounded px-5 py-4 hover:bg-foreground/[0.03] transition-colors group"
          >
            <div className="text-sm font-medium group-hover:text-foreground">
              JS Library
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Use the tax engine programmatically. Create returns, set facts, read computed values.
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center space-y-3">
          <a
            href="https://github.com/nmata010/facts-dot-tax"
            className="inline-block text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
            aria-label="GitHub repository"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
