import process from "node:process";
import isMain from "is-main";
import { pipe } from "it-pipe";

import config, { processConfig } from "./config.js";
import csv from "./csv.js";
import { gitBlame, gitProject } from "./git.js";
import group from "./group.js";
import lines from "./lines.js";
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
export function main(
  c: Config = config(process.argv, { process })
): AsyncIterable<Match> {
  const input = readInput(c.input || "-", process);
  return pipe(
    input,
    lines,
    group(c),
    parse(c) as (source: unknown) => AsyncIterable<Partial<Match>>,
    //gitProject,
    //gitBlame,
    csv
  );
}
export default main;

export async function print(source: AsyncIterable<any>) {
  for await (let item of source) {
    console.log(item);
  }
}

if (isMain(import.meta)) {
  print(main());
}
