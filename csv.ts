import { itMap } from "./streams.js";
import { Config, GitBlame, GitMerge, Match } from "./types.js";

function toEpoch(d?: Date) {
  return Math.floor(d?.getTime() || 0 / 1000);
}

function toDate(d?: Date) {
  return d ? `${d.getFullYear()}/${d.getMonth()}/${d.getDay()}` : "";
}

export const headerTitles = [
  "project",
  "path",
  "line",
  "lineEnd",
  "rev",
  "date",
  "mergeRev",
  "mergeDate",
  "pr",
  "branch",
  "commit message",
  "code link",
  "pr link",
  "text",
];

export const csvHeaders = (c: Config) =>
  async function* csvHeaderInjector(source: AsyncIterable<string>) {
    yield headerTitles.join(c.sep);
    yield* source;
  };

function makeString<T>(
  col: Record<string, T | undefined> | undefined,
  fn: (o: T) => string | undefined,
  post?: (str: string[]) => string[]
): string[] {
  const buffer = [];
  for (let i in col) {
    const input = col[i];
    if (!input) {
      continue;
    }

    const output = fn(input);
    if (!output) {
      continue;
    }
    buffer.push(output);
  }

  //const joined = `"${buffer.join("\n")}"`;
  return post ? post(buffer) : buffer;
}

function curryMap<T>(fn: (t: T) => T) {
  return (arr: T[]) => arr.map(fn)
}

/**
 * Extract array of data for each match that we want to render
 */
const extractData = (c: Config) => (m: Match) => {
  let output = [
    m.project,
    m.path,
    m.lineStart,
    m.lineEnd,
    makeString(m.commits, (c: GitBlame) => c.rev),
    makeString(m.commits, (c: GitBlame) => toDate(c.authorTime).toString()),
    makeString(m.merges, (c: GitMerge) => c.rev),
    makeString(m.merges, (c: GitMerge) => toDate(c.authorTime).toString()),
    makeString(
      m.merges,
      (c: GitMerge) => String(c.pr),
      curryMap(s => `${s.replaceAll(" ", " #")}`)
    ),
    makeString(m.merges, (c: GitMerge) => c.branch),
    // TODO: separate summaries better
    makeString(m.commits, (c: GitBlame) => c.summary),
    // TODO: read in org or let user set it
    `https://github.com/socialtables/${m.project}/blob/${m.head}${m.path}#L${m.lineStart}-L${m.lineEnd}`,
    //`[\`${m.path}\`](https://github.com/socialtables/${m.project}/blob/${m.head}${m.path}`,
    makeString(
      m.merges,
      (c: GitMerge) =>
        `https://github.com/socialtables/${m.project}/pulls/${c.pr}`
    ),

    //m.merge &&
    //  `[\`#${m.merge?.pr}\`](https://github.com/socialtables/${m.project}/pulls/${m.merge?.pr})`,
    m.text,
  ];
  return output;
};

/**
 * Render a single column of csv data.
 */
function csvItem(col: any, quote = true) {
  let output = col;
  const typeOf = typeof(col);

  if (typeOf === "string") {
    output = col 
      // convert to common line ending... meh never mind
      //.replaceAll(/\r?\n/g, "\n")
      // change quotes to single quote
      .replaceAll(/"/g, "'")
  } else if (Array.isArray(col)) {
    output = col 
      // escape each column
      .map(item => csvItem(item, false))
      // join array
      .join("\n")
  }
  if (typeOf === "number") {
    quote = false;
  }
  return quote ? `"${output}"` : output;
}

/**
 * Extra & write csv data
 */
export const csv = (c: Config) => {
  const extract = extractData(c)
  return async function *renderCsv(source: AsyncIterable<Match>) {
    yield headerTitles.join(c.sep);
    for await (let m of source) {
      const rawRow = extract(m)
      // map each column via csvItem
      const escapedRow = rawRow.map(col => csvItem(col));
      yield escapedRow.join(c.sep);
    }
  }
}
export default csv;
