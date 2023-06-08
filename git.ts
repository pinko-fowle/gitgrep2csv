import * as path from "node:path";
import { execa } from "execa";
import { itMap } from "./streams.js";
import { Match } from "./types.js";

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

  // get the project from the path
  const project = path.basename(rootDir);
  m.project = project;

  // get the file path inside the project dir
  const projectStart = m.matchedPath?.indexOf(rootDir) || 0;
  m.path = m.matchedPath?.substring(projectStart + project.length + 1);

  return m;
}

async function gitBlameMatch(m: Partial<Match>): Promise<Partial<Match>> {
  return m;
}

export const gitProject = itMap(gitProjectMatch);
export const gitBlame = itMap(gitBlameMatch);
