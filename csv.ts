import { itMap } from "./streams.js";
import { Match } from "./types.js";

function writeCsv(m: Match) {
  let output = [
    m.project,
    m.path,
    m.lineStart,
    m.lineEnd,
    m.commitSha,
    m.commitDate,
    m.commitPr,
  ];
}
export const csv = itMap(writeCsv);
export default csv;
