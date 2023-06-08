/**
 * A grep match. Listed vaguely in order of display in csv,
 */
export interface Match {
  // input data
  matchedPath: string; // not printed
  text: string; // displayed last in csv

  project: string;
  path: string;
  lineStart: number;
  lineEnd: number;
  commitSha: string;
  commitDate: string;
  commitPr: string;

  // unused
  matches: number[];
}

/**
 * Configuration for a run
 */
export interface Config {
  appName: string;
  appEnv?: string; // defaults to appName.toUpperCase
  input?: ReadInput;
  loadDotEnv?: boolean | Function;
  multilineSep?: string | RegExp | null;
  process?: Process;
}
