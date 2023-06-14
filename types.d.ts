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
  commits?: Record<string, GitBlame>; // rev->blame
  merges?: Record<string, GitMerge>; // rev->merge
  vars?: Record<string, string>; // semgrep can capture variables for us
  head: string; // rev that head is on

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
  semgrep: boolean;
  sep: string;
  process?: Process;
}

/**
 * A single line parsed git blame
 */
export interface GitBlame {
  rev: string;
  //subsequent?: number; // blame only
  author: string;
  authorEmail: string;
  authorTime: Date;
  authorTz?: number; // blame only
  committer: string;
  committerEmail: string;
  committerTime: Date;
  committerTz?: number; // blame only
  previous?: string; // TODO: merge
  summary: string;
  lines?: number[]; // blame only
}

export interface GitMerge extends GitBlame {
  parent: string[]; // merge commit
  pr?: number;
  branch?: string;
}
