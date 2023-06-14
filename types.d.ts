/**
 * A grep match. Listed vaguely in order of display in csv,
 */
export interface Match {
  // input data
  /**
  * Path that grep found for this match.
  */
  matchedPath: string; // not printed
  /**
  * Text of this match.
  */
  text: string; // displayed last in csv

  /**
  * Project directory name for this match.
  */
  project: string;
  /**
  * Path of file inside the project for this match.
  */
  path: string;
  /**
  * Line where this match starts.
  */
  lineStart: number;
  /**
  * Line where this match ends.
  */
  lineEnd: number;
  /**
  * All commits found for this match, by sha.
  */
  commits?: Record<string, GitBlame>; // rev->blame
  /**
  * All prs found for this match, by sha.
  */
  merges?: Record<string, GitMerge>; // rev->merge
  /**
  * Any free-variables captured by semgrep.
  */
  vars?: Record<string, string>; // semgrep can capture variables for us
  /**
  * Current rev this project is on.
  */
  head: string; // rev that head is on

  /**
  * List of exact line numbers where there is a match.
  * Since lineStart & lineEnd might include --before, --after, --context grep context.
  */
  matches?: number[]; // unused for now
  /**
  * Directory where we found this project
  */
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
 * Common "blame" information shared by either a line-by-line style git-blame, or by a merge commit.
 */
export interface GitBlameBase {
  /**
  * revision-sha of this blame.
  */
  rev: string;
  /**
  * Git author of this blame.
  */
  author: string;
  /**
  * Git author email of this blame.
  */
  authorEmail: string;
  /**
  * Author time of this blame.
  */
  authorTime: Date;
  /**
  * Committer name of this blame.
  */
  committer: string;
  /**
  * Committer email of this blame.
  */
  committerEmail: string;
  /**
  * Committer time of this blame.
  */
  committerTime: Date;
  /**
  * Previous sha of this blame.
  */
  previous?: string; // TODO: merge
  /**
  * Summary text for this blame.
  */
  summary: string;
}

/**
* A single commit & single file's parsed Git Blame
*/
export interface GitBlame extends GitBlameBase {
  /**
  * Timezone of author date
  */
  authorTz?: number;
  /**
  * Timezone of committer date
  */
  committerTz?: number;
  /**
  * Lines of file this blame applies to
  */
  lines?: number[];
}

/**
* Blame information for a git merge, typically parsed from Github format PR messages.
*/
export interface GitMerge extends GitBlameBase {
  /**
  * The parent commits for this merge
  */
  parent: string[]; // merge commit
  /**
  * Pull request number, parsed from summary.
  */
  pr?: number;
  /**
  * Branch name, parsed from summary.
  */
  branch?: string;
}
