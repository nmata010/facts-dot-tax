import * as readline from "readline";
import { createReturn, getFormSchema, listForms, type TaxReturn } from "./lib";

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;

const BANNER = `
  ${bold("facts d\u25CFt tax")}
  ${dim("Open-source TY2025 tax computation")}
  ${dim("https://facts.tax/")}
  ${dim("Type 'help' for commands")}
`;

let ret: TaxReturn | null = null;

async function handleLine(line: string): Promise<boolean> {
  const [cmd, ...args] = line.trim().split(/\s+/);

  try {
    switch (cmd) {
      case "list": {
        const forms = listForms();
        console.log(`\n  ${bold("Supported forms")} ${dim(`(${forms.length})`)}\n`);
        for (const f of forms) {
          console.log(`  ${cyan(f)}`);
        }
        console.log();
        break;
      }

      case "schema": {
        if (!args[0]) { console.log(`\n  Usage: ${cyan("schema <formId>")}\n`); break; }
        const schema = getFormSchema(args[0]);
        console.log(`\n  ${bold(args[0])} ${dim("— writable inputs")}\n`);
        for (const f of schema) {
          console.log(`  ${cyan(f.path)} ${dim(`(${f.type})`)} — ${f.name}`);
        }
        console.log(`\n  ${dim(`${schema.length} inputs`)}\n`);
        break;
      }

      case "create":
        ret = await createReturn();
        console.log(`\n  ${green("Return created.")} Set facts with ${cyan("set <path> <value>")}\n`);
        break;

      case "set": {
        if (!ret) { console.log(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (args.length < 2) { console.log(`\n  Usage: ${cyan("set <path> <value>")}\n`); break; }
        ret.setFact(args[0], args.slice(1).join(" "));
        console.log(`  ${dim(args[0])} ${green("=")} ${args.slice(1).join(" ")}`);
        break;
      }

      case "get": {
        if (!ret) { console.log(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (!args[0]) { console.log(`\n  Usage: ${cyan("get <path>")}\n`); break; }
        console.log(`  ${dim(args[0])} ${bold(ret.getFact(args[0]))}`);
        break;
      }

      case "form": {
        if (!ret) { console.log(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (!args[0]) { console.log(`\n  Usage: ${cyan("form <formId>")}\n`); break; }
        const facts = ret.getForm(args[0]);
        const incomplete = facts.filter((f) => f.value === "—");
        console.log(`\n  ${bold(args[0])}\n`);
        for (const f of facts) {
          const line = f.line ? dim(`L${f.line}`.padEnd(6)) : dim("      ");
          const tag = f.kind === "writable" ? yellow("input") : dim("     ");
          if (f.value === "—") {
            console.log(`  ${line} ${tag} ${cyan(f.path)} ${dim("|")} ${f.name} ${dim("|")} ${red("—")}`);
          } else {
            const val = f.kind === "derived" ? bold(f.value) : f.value;
            console.log(`  ${line} ${tag} ${cyan(f.path)} ${dim("|")} ${f.name} ${dim("|")} ${val}`);
          }
        }
        if (incomplete.length > 0) {
          console.log(`\n  ${red(`${incomplete.length} incomplete lines.`)} Run ${cyan(`deps <path>`)} to see why.`);
        }
        console.log(`\n  ${dim(`${facts.length} lines`)}\n`);
        break;
      }

      case "deps": {
        if (!ret) { console.log(`\n  ${yellow("Run 'create' first.")}\n`); break; }
        if (!args[0]) { console.log(`\n  Usage: ${cyan("deps <path>")}\n`); break; }
        const deps = ret.getDependencies(args[0]);
        console.log(`\n  ${bold(args[0])} ${dim("depends on:")}\n`);
        for (const d of deps) {
          const hasValue = d.value !== undefined;
          const status = hasValue ? green(d.value!) : red("not set");
          console.log(`  ${cyan(d.path)} ${dim(`(${d.type})`)} ${status} — ${d.name}`);
        }
        console.log(`\n  ${dim(`${deps.length} writable dependencies`)}\n`);
        break;
      }

      case "help":
        console.log(`
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
        console.log(`\n  ${dim("Goodbye.")}\n`);
        return true;

      default:
        console.log(`\n  ${red("Unknown command:")} ${cmd}. Type ${cyan("help")} for commands.\n`);
    }
  } catch (e: unknown) {
    console.log(`\n  ${red("Error:")} ${e instanceof Error ? e.message : e}\n`);
  }

  return false;
}

async function main() {
  const rule = dim("  ──────────────────────────────────────");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "  tax >> ",
  });

  console.log(BANNER);
  console.log(rule);
  rl.prompt();

  for await (const line of rl) {
    const done = await handleLine(line);
    if (done) break;
    console.log(rule);
    rl.prompt();
  }

  rl.close();
}

main();
