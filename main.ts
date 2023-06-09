import process from "node:process";
import isMain from "is-main";
import { pipe } from "it-pipe";

import config, { processConfig } from "./config.js";
import { csv, csvHeaders } from "./csv.js";
import { gitBlame, gitProject, githubPr } from "./git.js";
import group from "./group.js";
import { lines, tabsToSpaces } from "./lines.js";
import parse from "./parse.js";
import { readInput } from "./streams.js";
import { Config, Match } from "./types.js";

/**
 * Helper to generate a Config from `process` & run
 */
export function mainProcess(p = process) {
  const c = processConfig(process);
  return main(c);
}

/**
 * Run from a config
 */
export function main(c: Config = config(process.argv, { process })) {
  const input = readInput(c.input || "-", process);
  return pipe(
    input,
    tabsToSpaces,
    lines,
    group(c),
    parse(c) as (source: unknown) => AsyncIterable<Partial<Match>>,
    gitProject,
    gitBlame,
    githubPr,
    csv(c)
  );
}
export default main;

export async function print(source: AsyncIterable<any>) {
  console.log(csvHeaders.join("\t")); // womp womp no config#sep
  for await (let item of source) {
    console.log(item?.replaceAll(/\r?\n/g, "\\n"));
  }
}

if (isMain(import.meta)) {
  print(main());
}
