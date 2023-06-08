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

  const [matchedPath, lineStart, text] = line.split(":", 2);
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

    // parse each line individually (but we'll kind of fail at this)
    const badParsed = lines.map(parseLineNumbered);

    // lines might -C context we want
    // the matched line has : seperators , the others have a -... find the shortest first divider
    const shortest = badParsed.reduce(
      (short, cur, i) => {
        const length = cur.matchedPath?.length || Number.POSITIVE_INFINITY;
        if (short.length >= length) {
          if (short.length === length) {
            short.matches.push(i);
          } else {
            return {
              length,
              matches: [i],
            };
          }
        }
        return short;
      },
      { length: Number.POSITIVE_INFINITY, matches: [] } as {
        length: number;
        matches: number[];
      }
    );
    // TODO: maybe we should do something with matches? ignore for now

    const parsed = lines
      // rejigger each line
      .map((line) => {
        const path = line.substring(0, shortest.length);
        const postPath = line.substring(shortest.length + 1);
        const num = Number.parseInt(postPath).toString();
        const text = line.substring(shortest.length + num.length + 2);
        line = `${path}:${num}:${text}`;
        return line;
      })
      // reparse
      .map(parseLineNumbered);

    // smoosh all the other lines into the first line
    const result = parsed[0];
    const last = parsed[parsed.length - 1];
    console.log({ parsed, last });
    result.lineEnd = last.lineStart;
    result.text = parsed.reduce((acc, cur) => (acc += "\n" + cur.text), "");
    result.matches = shortest.matches;
    return result;
  }

  // TODO: flag to support non-line number results too
  return itMap(c.multilineSep ? parseMultiline : parseLineNumbered); //as (source: AsyncIterable<string | string[]>
}
export default parse;
