import { itMap } from "./streams.js";
import { Config, GitBlame, GitMerge, Match } from "./types.js";

function toEpoch(d?: Date) {
  return Math.floor(d?.getTime() || 0 / 1000);
}

function toDate(d?: Date) {
  return d ? `${d.getFullYear()}/${d.getMonth()}/${d.getDay()}` : "";
}

export const csvHeaderTitles = [
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
    yield csvHeaderTitles.join(c.sep);
    yield* source;
  };

function makeString<T>(
  col: Record<string, T | undefined> | undefined,
  fn: (o: T) => string | undefined,
  post?: (str: string) => string
): string {
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

  const joined = buffer.join("\\n");
  return post ? post(joined) : joined;
}

/**
 * Print the CSV for matches
 */
const writeCsv = (c: Config) => (m: Match) => {
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
      (s: string) => (s ? `${s.replaceAll(" ", " #")}` : "")
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
    m.text.replaceAll(/\r?\n/g, ""),
  ];
  return output.join(c.sep);
};
export const csv = (c: Config) => itMap(writeCsv(c));
export default csv;
