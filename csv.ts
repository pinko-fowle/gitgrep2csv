import { itMap } from "./streams.js";
import { Config, Match } from "./types.js";

const writeCsv = (c: Config) => (m: Partial<Match>) => {
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
  return output.join();
}
export const csv = (c: Config) => itMap(writeCsv(c));
export default csv;
