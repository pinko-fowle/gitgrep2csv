import { itMap } from "./streams.js";
import { Config, GitBlame, GitMerge, Match } from "./types.js";

function sortBlames<B extends GitBlame>(
  blames: Record<string, B | undefined>
): (B | undefined)[] {
  const arr = Object.values(blames);
  return arr.sort((a, b) =>
    (a?.authorTime || -1) <= (b?.authorTime || -1) ? -1 : 1
  );
}

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
  //"rev",
  "date",
  //"mergeRev",
  "mergeDate",
  "pr",
  "branch",
  "commit message",
  "code link",
  "pr link",
  "text",
];

/**
 * Maps over blame generating output
 */
function makeString<T extends GitBlame>(
  col: Record<string, T | undefined> | undefined,
  fn: (o: T) => string | undefined,
  post?: (str: string[]) => string[]
): string[] {
  if (col === undefined) {
    return [];
  }

  const sorted = sortBlames(col);
  // map but also ignore anything without a value
  const mapped = sorted.reduce((agg, cur) => {
    if (cur) {
      const val = fn(cur);
      if (val) {
        agg.push(val);
      }
    }
    return agg;
  }, [] as string[]);
  return post ? post(mapped) : mapped;
}

function curryMap<T>(fn: (t: T) => T) {
  return (arr: T[]) => arr.map(fn);
}

/**
 * Extract array of data for each match that we want to render
 */
const extractCsv = (c: Config) => (m: Match) => {
  let output = [
    m.project,
    m.path,
    m.lineStart,
    m.lineEnd,
    //makeString(m.commits, (c: GitBlame) => c.rev),
    makeString(m.commits, (c: GitBlame) => toDate(c.authorTime).toString()),
    //makeString(m.merges, (c: GitMerge) => c.rev),
    makeString(m.merges, (c: GitMerge) => toDate(c.authorTime).toString()),
    makeString(
      m.merges,
      (c: GitMerge) => String(c.pr),
      curryMap((s) => `${s.replaceAll(" ", " #")}`)
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

const COL_SOURCE = 9;
const COL_PR = 10;
const COL_TEXT = 11;

/**
 * Extract raw data for markdown format. Extends `extractCsv` and adds some markdown formatting.
 */
const extractMarkdown = (c: Config) => {
  const extract = extractCsv(c);
  return function extractMarkdown(m: Match) {
    const data = extract(m);

    // create friendly markdown link for each source link
    data[COL_SOURCE] = `[\`${m.path}\`](${data[COL_SOURCE]})`;

    // create friendly markdown link for each pr #
    data[COL_PR] = makeString(
      m.merges,
      (c: GitMerge) =>
        `[#${c.pr}](https://github.com/socialtables/${m.project}/pulls/${c.pr})`
    );

    // alas block quotes don't work in markdown
    // and don't know if there's a way to trick pre into rendering with style
    // TODO: html table output
    data[COL_TEXT] = `<pre>${data[COL_TEXT]}</pre>`;

    return data;
  };
};

/**
 * Render a single column of csv data.
 */
function csvItem(col: any, quote = true) {
  let output = col;
  const typeOf = typeof col;

  if (typeOf === "string") {
    output = col
      // convert to common line ending... meh never mind
      //.replaceAll(/\r?\n/g, "\n")
      // change quotes to single quote
      .replaceAll(/"/g, "'");
  } else if (Array.isArray(col)) {
    output = col
      // escape each column
      .map((item) => csvItem(item, false))
      // join array
      .join("\n");
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
  const extract = extractCsv(c);
  return async function* renderCsv(source: AsyncIterable<Match>) {
    yield headerTitles.join(c.sep);
    for await (let m of source) {
      const rawRow = extract(m);
      // map each column via csvItem
      const escapedRow = rawRow.map((col) => csvItem(col));
      yield escapedRow.join(c.sep);
    }
  };
};
export default csv;

/**
 * Render a single column of markdown data.
 */
function mdItem(col: any): string {
  if (typeof col === "string") {
    return col.replaceAll(/\r?\n/g, "<br/>");
  } else if (Array.isArray(col)) {
    return col.map(mdItem).join("<br/>");
  }
  return String(col);
}

function mdRowPrint(row: any[]) {
  return `|${row.join("|")}|`;
}

export const md = (c: Config) => {
  const extract = extractMarkdown(c);
  return async function* renderMarkdown(source: AsyncIterable<Match>) {
    yield mdRowPrint(headerTitles);
    const headerBar = headerTitles.map(() => "----");
    yield mdRowPrint(headerBar);
    for await (let m of source) {
      const rawRow = extract(m);
      // map each column via csvItem
      const escapedRow = rawRow.map((col) => mdItem(col));
      yield `|${escapedRow.join("|")}|`;
    }
  };
};
