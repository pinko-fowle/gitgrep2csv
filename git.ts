import * as path from "node:path";
import * as fs from "node:fs/promises";
import { camelCase } from "camel-case";
import { execa } from "execa";
import { itMap } from "./streams.js";
import { Config, GitBlame, Match } from "./types.js";

/**
 * Find the root of the project, and path of the file inside the project
 */
async function gitProjectMatch(m: Partial<Match>): Promise<Partial<Match>> {
  // get directory from the match
  const cwd = process.cwd() + path.sep + path.dirname(m.matchedPath || "");
  // ask git for the project directory
  const rootDir = (
    await execa("git", ["rev-parse", "--show-toplevel"], { cwd })
  ).stdout;
  m.rootDir = rootDir;

  // get the project from the path
  const project = path.basename(rootDir);
  m.project = project;

  // get the file path inside the project dir
  const projectStart = m.matchedPath?.indexOf(rootDir) || 0;
  m.path = m.matchedPath?.substring(projectStart + project.length + 1);

  return m;
}

// keywords indicating a git blame header
const blameHeaders = ["author", "committer", "summary", "previous", "filename"];

/**
 * Extract a git blame --porcelain for a single line only
 * If we need blame on multiple lines this will need to be heavily rebuilt
 */
async function parseGitBlame(
  lines: string[],
  start = 0
): Promise<Record<string, GitBlame>> {
  let commits: Record<string, GitBlame> = {};
  for (let i = 0; i < lines.length; ++i) {
    // read header line
    const header = lines[i];
    const headerSplit = header.split(" ");
    const rev = headerSplit[0];
    const line = Number.parseInt(headerSplit[1]);
    //const lineNew = Number.parseInt(headerSplit[2]);
    const subsequent = Number.parseInt(headerSplit[3]);

    // find blame to add these line to
    let blame = commits[rev];

    // if there is no blame for this commit/rev yet, it's a new commit. read it's info.
    if (!blame) {
      // build blame
      blame = commits[rev] = {
        rev,
        lines: [],
      } as unknown as GitBlame;

      // read info lines
      for (i++; i < lines.length; ++i) {
        const info = lines[i];
        // split info line
        const infoSplit = info.split(" ");

        // get "author" from "author-email" info
        const infoKeyStart = infoSplit[0].split("-")[0];
        // make sure this is an info line
        if (blameHeaders.indexOf(infoKeyStart) == -1) {
          // or we're done, this is the code line
          break;
        }

        // extract info key/value
        const key = camelCase(infoSplit[0]);
        let value: any = info.substring(infoSplit[0].length + 1);
        const numberify = Number.parseInt(value);
        if (numberify) value = numberify;
        if (numberify && key.endsWith("Time"))
          value = new Date(numberify * 1000);

        (blame as any)[key] = value;
      }
    } else {
      // already know this commit
      // ignore the output line
      i++;
    }

    // add lines
    const end = line + subsequent;
    for (let i = line; i < end; ++i) {
      blame.lines?.push(i);
    }
  }

  return commits;
}

const ignorePaths = new Map<string, boolean>();

/**
 * Gather git --ignore-revs-file information
 */
async function ignoreArgs(rootDir: string) {
  let ignorePath: string | undefined;
  let hasIgnore = ignorePaths.get(rootDir);

  if (hasIgnore === undefined) {
    ignorePath = path.resolve(rootDir, ".git-blame-ignore-revs");
    let ignore: string[] = [];
    try {
      await fs.stat(ignorePath);
      hasIgnore = true;
      ignorePaths.set(rootDir, true);
    } catch {
      ignorePaths.set(rootDir, false);
    }
  }

  if (hasIgnore) {
    if (!ignorePath) {
      ignorePath = path.resolve(rootDir, ".git-blame-ignore-revs");
    }
    return ["--ignore-revs-file", ignorePath];
  }
}

/**
 * Build git blame info on partial Match.
 */
async function gitBlameMatch(m: Partial<Match>): Promise<Partial<Match>> {
  if (!m?.path || !m?.rootDir) {
    return m;
  }

  const ignore = (await ignoreArgs(m.rootDir)) || [];
  const args = [
    "blame",
    "--porcelain", // machine output
    "-L",
    `${m.lineStart},${m.lineEnd}`, // a specific line number
    ...ignore,
    m.path.substring(1),
  ];

  const blameLines = await execa("git", args, { cwd: m.rootDir });

  m.commits = await parseGitBlame(blameLines.stdout.split(/\r?\n/));
  return m;
}

const mergeFormat = [
  "%H", // commit hash/rev
  "%aN", // author name
  "%ae", // author email
  "%at", // author date timestamp
  "%cN", // committer name
  "%ce", // committer email
  "%ct", // commiter date timestamp
  "%P", // parent hashes
  "%s", // summary
].join("\t");

async function githubPrMatch(m: Partial<Match>): Promise<Match> {
  const cwd = process.cwd() + path.sep + path.dirname(m.matchedPath || "");
  const cmd = `git log --merges --format='${mergeFormat}' --ancestry-path ${commit}..main | grep 'pull request' | head -n1`;
  const mergeLog = await execa(cmd, { cwd, shell: true });
  const [
    rev,
    author,
    authorEmail,
    authorTime,
    committer,
    committerEmail,
    committerTime,
    parent,
    summary,
  ] = mergeLog.stdout.trim().split("\t");

  const pr = /pull request #(\d+)/.exec(summary);
  const branch = /from (.*)/.exec(summary);
  m.merge = {
    rev,
    author,
    authorEmail,
    authorTime: new Date(Number.parseInt(authorTime) * 1000),
    committer,
    committerEmail,
    committerTime: new Date(Number.parseInt(committerTime) * 1000),
    summary,
    parent: parent?.split(" "),
    pr: Number.parseInt(pr?.[1] || "-1"),
    branch: branch?.[1],
  };
  return m as Match;
}

/**
 * Attach the sha of main branch
 */
export const gitHead = () => {
  const projectHeads = new Map<string, string>();

  return async function* gitHead(source: AsyncIterable<Partial<Match>>) {
    for await (let m of source) {
      let project = m.project;
      if (project === undefined) {
        yield m;
        continue;
      }

      // see if we already have a cached
      let head: string | undefined = projectHeads.get(project);
      if (!head) {
        try {
          head = (await execa("git", ["rev-parse", "HEAD"], { cwd: m.rootDir }))
            .stdout;

          projectHeads.set(project, head);
        } catch {}
      }
      m.head = head;
      yield m;
    }
  };
};

export const gitProject = itMap(gitProjectMatch);
export const gitBlame = itMap(gitBlameMatch);
export const githubPr = itMap(githubPrMatch);
