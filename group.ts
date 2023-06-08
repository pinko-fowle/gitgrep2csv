import type { Config, Match } from "./types.js";
import { identity } from "./streams.js";

/**
 * Batch lines together until a config.multilineSep appears
 * Or pass through if no multilineSep configured
 */
export function multilineGroup(c: Config) {
  if (!c.multilineSep) return identity;

  const isSepString = typeof c.multilineSep === "string";
  return async function* groupingTransform(lines: AsyncIterable<string>) {
    let buffer = [];
    for await (let line of lines) {
      if (isSepString && line === c.multilineSep) {
        yield buffer;
        buffer = [];
      } else {
        buffer.push(line);
      }
    }
    yield buffer;
  };
}
export default multilineGroup;
