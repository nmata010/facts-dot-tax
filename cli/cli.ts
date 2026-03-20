import * as readline from "readline";
import { createReturn, getFormSchema, listForms } from "../lib/index.js";
import { handleLine, banner, rule, type Style, type CliApi, type CliSession } from "./shared.js";

const style: Style = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
};

const api: CliApi = { createReturn, getFormSchema, listForms };
const session: CliSession = { ret: null };

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "  tax >> ",
  });

  console.log(banner(style));
  console.log(rule(style));
  rl.prompt();

  for await (const line of rl) {
    const done = await handleLine(line, session, api, style, console.log);
    if (done) break;
    console.log(rule(style));
    rl.prompt();
  }

  rl.close();
}

main();
