import process from "node:process";
import isMain from "is-main";
import { pipe } from "it-pipe";

import config, { processConfig } from "./config.js";
import { csv, csvHeaders } from "./csv.js";
import { gitBlame, gitHead, gitProject, githubPr } from "./git.js";
import group from "./group.js";
import { lines, tabsToSpaces } from "./lines.js";
import { parse, parseSemgrep } from "./parse.js";
import { readInput, replace, unpartial } from "./streams.js";
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
  return c.semgrep ? semgrepMain(c) : grepMain(c);
}
export default main;

export function grepMain(c: Config = config(process.argv, { process })) {
  const input = readInput(c.input || "-", process);
  return pipe(
    input,
    tabsToSpaces,
    lines,
    group(c),
    parse(c) as (source: unknown) => AsyncIterable<Partial<Match>>,
    gitProject,
    gitBlame,
    gitHead(),
    githubPr,
    unpartial<Match>,
    csv(c),
    csvHeaders(c)
    //replace(/\r?\n/g, "\\n")
  );
}

export function semgrepMain(c: Config = config(process.argv, { process })) {
  const input = readInput(c.input || "-", process);
  return pipe(
    input,
    tabsToSpaces,
    parseSemgrep,
    gitProject,
    gitBlame,
    gitHead(),
    githubPr,
    unpartial<Match>,
    csv(c),
    csvHeaders(c)
    //replace(/\r?\n/g, "\\n")
  );
}

export async function print(source: AsyncIterable<any>) {
  for await (let item of source) {
    console.log(item);
  }
}

if (isMain(import.meta)) {
  print(main());
}
