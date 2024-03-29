import * as path from "path";
import { Plugin, Trigger } from "@shanzhai/interfaces";
import { readPackageJson } from "./read-package-json";
import { loadDependency } from "./load-dependency";

/**
 * Scans the package.json file in the current directory to discover
 * {@link Plugin}s both within it and its direct dependencies.
 * @returns Resolves to an object where the values are the discovered plugins.
 */
export async function searchForPlugins(): Promise<{
  readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
}> {
  const packageJsonContent = await readPackageJson();

  const output: {
    [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
  } = {};

  for (const dependency of packageJsonContent.dependencies) {
    const plugin = await loadDependency(dependency);

    if (plugin !== null) {
      output[dependency] = plugin;
    }
  }

  if (packageJsonContent.root !== null) {
    output[`.`] = require(path.join(process.cwd(), ...packageJsonContent.root));
  }

  return output;
}
