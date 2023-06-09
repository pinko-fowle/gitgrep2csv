import * as path from "node:path";
import * as fs from "node:fs/promises";
import { camelCase } from "camel-case";
import { execa } from "execa";
import { itMap } from "./streams.js";
import { GitBlame, Match } from "./types.js";

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

/**
 * Extract a git blame --porcelain for a single line only
 * If we need blame on multiple lines this will need to be heavily rebuilt
 */
async function parseGitBlame(lines: string[]) {
  const output = {} as GitBlame;
  const split: string[][] = lines.map((line) => line.split(" "));

  // first line
  const [rev, lineNum, lineNumNew, subsequent] = split[0];
  Object.assign(output, { rev, lineNum, lineNumNew, subsequent });

  // headers
  let n = 1,
    cursor;
  for (
    cursor = split[n];
    cursor[0].startsWith("author") || cursor[0].startsWith("committer");
    cursor = split[++n]
  ) {
    const key = camelCase(cursor[0]);
    let value: any = cursor[1];
    const numberify = Number.parseInt(value);
    if (numberify) value = numberify;
    if (numberify && key.endsWith("Time")) value = new Date(numberify);
    (output as any)[key] = value;
  }

  // summary
  output.summary = lines[n++];

  // we ignore file output(s) since we already know the line/text
  return output;
}

async function gitBlameMatch(m: Partial<Match>): Promise<Partial<Match>> {
  if (!m?.path || !m?.rootDir) {
    return m;
  }

  const ignorePath = path.resolve(m.rootDir, ".git-blame-ignore-revs");
  let ignore: string[] = [];
  try {
    await fs.stat(ignorePath);
    ignore = ["--ignore-revs-file", ignorePath];
  } catch {}

  const line = (m.matches?.[0] || 0) + 1;
  const blameLines = await execa(
    "git",
    [
      "blame",
      "--porcelain", // machine output
      "-L",
      `${line},${line}`, // a specific line number
      ...ignore,
      m.path.substring(1),
    ],
    { cwd: m.rootDir }
  );

  m.blame = await parseGitBlame(blameLines.stdout.split(/\r?\n/));
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

async function githubPrMatch(m: Partial<Match>): Promise<Partial<Match>> {
  const cwd = process.cwd() + path.sep + path.dirname(m.matchedPath || "");
  const mergeLog = await execa(
    `git log --merges --format='${mergeFormat}' --ancestry-path ${m.blame?.rev}..main | grep 'pull request' | head -n1`,
    { cwd, shell: true }
  );
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
    authorTime: new Date(Number.parseInt(authorTime)),
    committer,
    committerEmail,
    committerTime: new Date(Number.parseInt(authorTime)),
    summary,
    parent: parent.split(" "),
    pr: Number.parseInt(pr?.[1] || "-1"),
    branch: branch?.[1],
  };
  return m;
}

export const gitProject = itMap(gitProjectMatch);
export const gitBlame = itMap(gitBlameMatch);
export const githubPr = itMap(githubPrMatch);
