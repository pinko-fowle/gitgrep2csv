import { itMap } from "./streams.js"

const newlines = /\r?\n/

/**
 * Process an async-iterator of strings, splitting it on newlines
 */
export async function* lines(source: AsyncIterable<string>, split = newlines) {
  let buffer: string[] = [];
  for await (const text of source) {
    const frags = text.split(split);

    if (frags.length <= 1) {
      // no splits, buffer
      buffer.push(frags[0]);
      continue;
    }

    // add the last fragment to this line & yield
    buffer.push(frags[0]);
    const complete = buffer.join("")
    if (complete) yield complete

    // any frags in the middle are complete lines
    for (let i = 1; i < frags.length - 1; ++i) {
      // yield them
      if (frags[i]) yield frags[i];
    }

    // the last fragment still needs a newline
    buffer = [frags[frags.length - 1]];
  }

  // return leftovers
  if (buffer.length > 0 && buffer[0] !== "") {
    const tail = buffer.join("")
    if (tail) yield tail
  }
}
export default lines;

export function tabsToSpacesTransform(m: string) {
  return m.replaceAll("\t", "  ")
}

export const tabsToSpaces = itMap(tabsToSpacesTransform)
