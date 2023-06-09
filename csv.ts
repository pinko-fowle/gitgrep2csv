import { itMap } from "./streams.js";
import { Match } from "./types.js";

function writeCsv(m: Partial<Match>) {
  let output = [
    m.project,
    m.path,
    m.lineStart,
    m.lineEnd,
    m.blame?.rev,
    Math.floor(m.blame?.authorTime?.getTime() || 0 / 1000),
    m.pr,
    m.text,
  ];
  return output.join("\t");
}
export const csv = itMap(writeCsv);
export default csv;
