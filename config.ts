import process from "node:process";
import type { ReadInput } from "./streams.js";
import { readInput } from "./streams.js";

import dotenv from "dotenv";
import yn from "yn";
import yargs from "yargs";

import { Config } from "./types.js";

type Process = typeof process;
type Env = typeof process.env;

/**
 * Assign a name, primarily to use for env variable prefix
 */
export let appName: string = "gitgrep";
/**
 * Source to read. Defaults to `-` for stdin.
 */
export let input: ReadInput | undefined = "-";
/**
 * Whether to load dotenv or a function to load it
 */
export let loadDotEnv: boolean | Function = () => loadDotEnvOnce;
/**
 * Seperator for multi-line code blocks
 */
export let multilineSep: string = "";

/**
 * Populate a Config with defaults.
 */
export const defaults = (base?: Partial<Config>): Config => ({
  appName,
  appEnv: (base?.appName || appName).toLowerCase(),
  input,
  multilineSep,
  ...base,
});

/**
 * For reference, a copy of the startup defaults
 */
export const initialDefaults = Object.freeze(defaults());

/**
 * Whether or not dotenv has been ran.
 */
let _didLoadDotEnv = false;

/**
 * Strategy for always reloading dotenv.
 * Can be useful if config might change & wants freshened.
 */
export const reloadDotEnv = () => {
  dotenv.config();
  dotenv.config({ path: ".env.config" });
  _didLoadDotEnv = true;
};

/**
 * Default strategy to load dotenv first time only.
 */
export const loadDotEnvOnce = () => {
  if (!_didLoadDotEnv) {
    reloadDotEnv();
  }
};

/**
 * Get config from args & env
 */
export const argsConfig = (
  args: string[] = [],
  base: Partial<Config> = defaults()
): Config => {
  // copy base
  const config: Config = { ...base } as Config;

  // get dotenv load strategy
  let load: boolean | Function = config.loadDotEnv ?? true;
  if (load === true) load = loadDotEnv;
  if (load === true) load = loadDotEnvOnce;
  // allow env to say it *doesnt* want dotenv
  const envLoadDotEnv = yn(
    config?.process?.env?.[`${config?.appEnv}_LOAD_DOTENV`],
    { default: true }
  );
  if (load && load instanceof Function && envLoadDotEnv) {
    load();
  }

  let computed = yargs(args.slice(2));
  if (config.appEnv) {
    computed = computed.env(config.appEnv ?? "GITGREP");
  }
  computed = computed
    .default(config)
    .option("input", {
      alias: "i",
      nargs: 1,
    })
    .option("multilineSep", {
      alias: "multisep",
      alias: "s",
      nargs: 1,
    })
  return computed.argv as unknown as Config;
};

export function processConfig(p = process, c?: Partial<Config>) {
  const c2 = { ...c, process };
  return argsConfig(p.argv, c2);
}

export default argsConfig;
