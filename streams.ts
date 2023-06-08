import { createReadStream } from "node:fs";
import type { FileHandle } from "node:fs/promises";
import type process from "node:process";
import { Transform } from "node:stream";
import type { Readable } from "node:stream";

type Process = typeof process;

/**
 * Either a specifier or an actual input to read
 */
export type ReadInput = string | FileHandle | AsyncIterable<string>;

/**
 * Read an input path, Node fs.FileHandle, or AsyncIterable (implemented by Node stream.Readable)
 */
export function readInput(
  readable: ReadInput,
  process?: Process
): AsyncIterable<string> {
  let output: ReadInput | undefined = readable;
  if (output === "-") {
    output = process?.stdin;
  }
  if (typeof output === "string") {
    // path
    output = createReadStream(output, "utf8");
  } else if (output && "createReadStream" in output) {
    // filehandle
    output = output.createReadStream({ encoding: "utf8" });
  }

  if (!output) {
    throw new Error("Couldn't open input");
  }
  return output;
}

/**
 * Create an async generator on an input iterable which will transform each value with a `mapper` function.
 */
export function itMap<I, O>(mapper: (i: I) => O) {
  return async function* itMapper(source: AsyncIterable<I>): AsyncIterable<O> {
    for await (let val of source) {
      yield mapper(val);
    }
  };
}

/**
 * Helper which passes through a value
 */
export function identity<I>(source: I) {
  return source;
}
