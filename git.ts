import { itMap } from "./streams.js";
import { Match } from "./types.js";

async function gitProjectMatch(m: Partial<Match>): Promise<Partial<Match>> {
  return m;
}

async function gitBlameMatch(m: Partial<Match>): Promise<Partial<Match>> {
  return m;
}

export const gitProject = itMap(gitProjectMatch);
export const gitBlame = itMap(gitBlameMatch);
