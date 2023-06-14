import { itMap } from "./streams.js";
import { Config, Match } from "./types.js";

function toEpoch(d?: Date) {
  return Math.floor(d?.getTime() || 0 / 1000);
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
  "code link",
  "pr link",
  "text",
];

export const csvHeaders = (c: Config) =>
  async function* csvHeaderInjector(source: AsyncIterable<string>) {
    yield csvHeaderTitles.join(c.sep);
    yield* source;
  };

/**
 * Print the CSV for matches
 */
const writeCsv = (c: Config) => (m: Match) => {
  let output = [
    m.project,
    m.path,
    m.lineStart,
    m.lineEnd,
    Object.values(m.commits || []).map(c => c.rev).join(", "),
    Object.values(m.commits || []).map(c => toEpoch(c.authorTime)),
    m.merge?.rev,
    toEpoch(m.merge?.authorTime),
    m.merge?.pr,
    m.merge?.branch,
    `[\`${m.path}\`](https://github.com/socialtables/${m.project}/blob/${m.head}${m.path}`,
    m.merge &&
      `[\`#${m.merge?.pr}\`](https://github.com/socialtables/pulls/${m.merge?.pr})`,
    m.text,
  ];
  return output.join(c.sep);
};
export const csv = (c: Config) => itMap(writeCsv(c));
export default csv;
