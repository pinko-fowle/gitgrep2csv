export interface Match {
  matchedPath: string;
  text: string;
  project: string;
  path: string;
  lineStart: number;
  lineEnd: number;
  commitSha: string;
  commitDate: string;
  commitPr: string;
}

export interface Config {
  appName: string;
  appEnv?: string; // defaults to appName.toUpperCase
  input?: ReadInput;
  loadDotEnv?: boolean | Function;
  multilineSep?: string | RegExp | null;
  process?: Process;
}
