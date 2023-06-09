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
  blame?: GitBlame;

  // not displayed
  matches?: number[]; // unused for now
  rootDir: string; // directory for project
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

/**
 * A single line parsed git blame
 */
export interface GitBlame {
  rev: string;
  lineNum: number;
  lineNumNew: number;
  subsequent: number;
  author: string;
  authorMail: string;
  authorTime: Date;
  authorTz: number;
  committer: string;
  committerMail: string;
  committerTime: Date;
  committerTz: number;
  summary: string;
}
