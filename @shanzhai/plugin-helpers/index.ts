import { Plugin, Trigger } from "@shanzhai/interfaces";
import { listAllDependencies } from "./list-all-dependencies";
import { loadDependency } from "./load-dependency";

export async function searchForPlugins(): Promise<
  ReadonlyArray<Plugin<{ readonly [name: string]: Trigger }>>
> {
  const dependencies = await listAllDependencies();

  const output: Plugin<{ readonly [name: string]: Trigger }>[] = [];

  for (const dependency of dependencies) {
    const plugin = await loadDependency(dependency);

    if (plugin !== null) {
      output.push(plugin);
    }
  }

  return output;
}
