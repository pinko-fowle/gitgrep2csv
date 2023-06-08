import type { Config } from "./types.js";
import { itMap } from "./streams.js";
import type { Match } from "./types.js";

/**
 * Parse a file:lineNumber:text line
 */
function parseLineNumbered(line: string | string[]): Partial<Match> {
  if (typeof line !== "string") {
    throw new Error("Expected string");
  }

  const [matchedPath, lineStart, text] = line.split(":");
  return {
    matchedPath,
    lineStart: parseInt(lineStart),
    text,
  };
}

export function parse(c: Config) {
  function parseMultiline(lines: string | string[]): Partial<Match> {
    if (typeof lines === "string") {
      throw new Error("Expected strings[]");
    }

    // parse each line individually
    const parsed = lines.map(parseLineNumbered);

    // smoosh all the other lines into the first line
    const line = parsed[0];
    line.lineEnd = parsed[parsed.length - 1].lineStart;
    line.text = parsed.reduce((acc, cur) => (acc += "\n" + cur), "");
    return line;
  }

  // TODO: flag to support non-line number results too
  return itMap(c.multilineSep ? parseMultiline : parseLineNumbered); //as (source: AsyncIterable<string | string[]>
}
export default parse;
