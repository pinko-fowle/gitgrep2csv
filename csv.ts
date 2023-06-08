import { itMap } from "./streams.js";
import { Match } from "./types.js";

function writeCsv(m: Partial<Match>) {
  let output = [
    m.project,
    m.path,
    m.lineStart,
    m.lineEnd,
    m.commitSha,
    m.commitDate,
    m.commitPr,
  ];
  return output.join("\t")
}
export const csv = itMap(writeCsv);
export default csv;
