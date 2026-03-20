// ── Types (defined here so both Node CLI and browser can import without pulling in lib/index.ts) ──

export interface FactSchema {
  path: string;
  name: string;
  description: string;
  type: "Dollar" | "Int" | "Boolean" | "Enum" | "String";
  options?: string[];
}

export interface FactResult {
  path: string;
  name: string;
  value: string;
  kind: "writable" | "derived";
  line?: string;
}

export interface DependencyInfo {
  path: string;
  name: string;
  type: string;
  isWritable: boolean;
  value?: string;
}

export interface TaxReturn {
  setFact(path: string, value: string): void;
  getFact(path: string): string;
  getDollar(path: string): number;
  getForm(formId: string): FactResult[];
  getDependencies(path: string): DependencyInfo[];
}

// ── Injected dependencies ──

export interface Style {
  dim: (s: string) => string;
  bold: (s: string) => string;
  green: (s: string) => string;
  yellow: (s: string) => string;
  cyan: (s: string) => string;
  red: (s: string) => string;
}

export interface CliApi {
  listForms: () => string[];
  getFormSchema: (formId: string) => FactSchema[];
  createReturn: () => Promise<TaxReturn>;
}

export interface CliSession {
  ret: TaxReturn | null;
}

// ── Shared UI strings ──

export function banner(style: Style): string {
  return `\n  ${style.bold("facts d\u25CFt tax")}\n  ${style.dim("Open-source TY2025 tax computation")}\n  ${style.dim("https://facts.tax/")}\n  ${style.dim("Type 'help' for commands")}\n`;
}

export function rule(style: Style): string {
  return style.dim("  ──────────────────────────────────────");
}

// ── Command handler ──

export async function handleLine(
  line: string,
  session: CliSession,
  api: CliApi,
  style: Style,
  write: (s: string) => void,
): Promise<boolean> {
  const { dim, bold, green, yellow, cyan, red } = style;
  const [cmd, ...args] = line.trim().split(/\s+/);

  try {
    switch (cmd) {
      case "list": {
        const forms = api.listForms();
        write(`\n  ${bold("Supported forms")} ${dim(`(${forms.length})`)}\n`);
        for (const f of forms) {
          write(`  ${cyan(f)}`);
        }
        write("");
        break;
      }

      case "schema": {
        if (!args[0]) { write(`\n  Usage: ${cyan("schema <formId>")}\n`); break; }
        const schema = api.getFormSchema(args[0]);
        write(`\n  ${bold(args[0])} ${dim("— writable inputs")}\n`);
        for (const f of schema) {
          write(`  ${cyan(f.path)} ${dim(`(${f.type})`)} — ${f.name}`);
        }
        write(`\n  ${dim(`${schema.length} inputs`)}\n`);
        break;
      }

      case "create":
        session.ret = await api.createReturn();
        write(`\n  ${green("Return created.")} Set facts with ${cyan("set <path> <value>")}\n`);
        break;

      case "set": {
        if (!session.ret) { write(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (args.length < 2) { write(`\n  Usage: ${cyan("set <path> <value>")}\n`); break; }
        session.ret.setFact(args[0], args.slice(1).join(" "));
        write(`  ${dim(args[0])} ${green("=")} ${args.slice(1).join(" ")}`);
        break;
      }

      case "get": {
        if (!session.ret) { write(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (!args[0]) { write(`\n  Usage: ${cyan("get <path>")}\n`); break; }
        write(`  ${dim(args[0])} ${bold(session.ret.getFact(args[0]))}`);
        break;
      }

      case "form": {
        if (!session.ret) { write(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (!args[0]) { write(`\n  Usage: ${cyan("form <formId>")}\n`); break; }
        const facts = session.ret.getForm(args[0]);
        const incomplete = facts.filter((f) => f.value === "—");
        write(`\n  ${bold(args[0])}\n`);
        for (const f of facts) {
          const ln = f.line ? dim(`L${f.line}`.padEnd(6)) : dim("      ");
          const tag = f.kind === "writable" ? yellow("input") : dim("     ");
          if (f.value === "—") {
            write(`  ${ln} ${tag} ${cyan(f.path)} ${dim("|")} ${f.name} ${dim("|")} ${red("—")}`);
          } else {
            const val = f.kind === "derived" ? bold(f.value) : f.value;
            write(`  ${ln} ${tag} ${cyan(f.path)} ${dim("|")} ${f.name} ${dim("|")} ${val}`);
          }
        }
        if (incomplete.length > 0) {
          write(`\n  ${red(`${incomplete.length} incomplete lines.`)} Run ${cyan(`deps <path>`)} to see why.`);
        }
        write(`\n  ${dim(`${facts.length} lines`)}\n`);
        break;
      }

      case "deps": {
        if (!session.ret) { write(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (!args[0]) { write(`\n  Usage: ${cyan("deps <path>")}\n`); break; }
        const deps = session.ret.getDependencies(args[0]);
        write(`\n  ${bold(args[0])} ${dim("depends on:")}\n`);
        for (const d of deps) {
          const hasValue = d.value !== undefined;
          const status = hasValue ? green(d.value!) : red("not set");
          write(`  ${cyan(d.path)} ${dim(`(${d.type})`)} ${status} — ${d.name}`);
        }
        write(`\n  ${dim(`${deps.length} writable dependencies`)}\n`);
        break;
      }

      case "help":
        write(`
  ${bold("Commands")}

  ${cyan("list")}                    Show supported forms
  ${cyan("schema")} ${dim("<form>")}           Show writable inputs for a form
  ${cyan("create")}                  Initialize a blank return
  ${cyan("set")} ${dim("<path> <value>")}     Set a writable fact
  ${cyan("get")} ${dim("<path>")}             Read a computed value
  ${cyan("form")} ${dim("<form>")}            Show all facts for a form
  ${cyan("deps")} ${dim("<path>")}            Show writable dependencies for a fact
  ${cyan("exit")}                    Quit
`);
        break;

      case "exit":
      case "quit":
      case undefined:
        write(`\n  ${dim("Goodbye.")}\n`);
        return true;

      default:
        write(`\n  ${red("Unknown command:")} ${cmd}. Type ${cyan("help")} for commands.\n`);
    }
  } catch (e: unknown) {
    write(`\n  ${red("Error:")} ${e instanceof Error ? e.message : e}\n`);
  }

  return false;
}
