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

  const [matchedPath, lineStart] = line.split(":", 2);
  const text = line.substring(
    matchedPath.length + lineStart?.toString().length + 2
  );
  const parsed = {
    matchedPath,
    lineStart: parseInt(lineStart),
    text,
  };
  return parsed;
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
        const rejiggered = `${path}:${num}:${text}`;
        return rejiggered;
      })
      // reparse
      .map(parseLineNumbered);

    // smoosh all the other lines into the first line
    const result = parsed[0];
    const last = parsed[parsed.length - 1];
    result.lineEnd = last.lineStart;
    result.text = parsed.reduce((acc, cur) => (acc += "\n" + cur.text), "");
    result.matches = shortest.matches;
    return result;
  }

  // TODO: flag to support non-line number results too
  return itMap(c.multilineSep ? parseMultiline : parseLineNumbered); //as (source: AsyncIterable<string | string[]>
}
export default parse;

/**
 * Parse semgrep json input lines
 */
export async function parseSemgrepMatch(
  semgrep: Record<string, any>
): Promise<Partial<Match>> {
  const vars = Object.entries(semgrep.extra.metavars || {}).reduce(
    (mv, [key, val]) => {
      mv[key] = (val as any).abstract_content;
      return mv;
    },
    {} as Record<string, string>
  );

  const lineEnd = semgrep.end.line;
  const lineStart = semgrep.start.line;
  const lineLen = lineEnd - lineStart;
  const matches = new Array(lineEnd - lineStart);
  for (let i = 0; i < lineLen; ++i) {
    matches[i] = lineStart + i;
  }

  return {
    lineStart,
    lineEnd,
    text: semgrep.extra.lines,
    matchedPath: semgrep.path,
    matches,
    vars,
  };
}

/**
 */
export async function* parseSemgrep(source: AsyncIterable<string>) {
  // read all strings
  const buffer = [];
  for await (let str of source) {
    buffer.push(str);
  }

  // combine to json
  const semgrep = JSON.parse(buffer.join(""));
  // read out results
  for await (let result of semgrep.results) {
    yield parseSemgrepMatch(result);
  }
}
