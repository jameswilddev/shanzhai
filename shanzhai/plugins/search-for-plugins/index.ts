import { Plugin } from "@shanzhai/interfaces";
import { listAllDependencies } from "./list-all-dependencies";
import { loadDependency } from "./load-dependency";

export async function searchForPlugins(): Promise<ReadonlyArray<Plugin>> {
  const dependencies = await listAllDependencies();

  const output: Plugin[] = [];

  for (const dependency of dependencies) {
    const plugin = await loadDependency(dependency);

    if (plugin !== null) {
      output.push(plugin);
    }
  }

  return output;
}
