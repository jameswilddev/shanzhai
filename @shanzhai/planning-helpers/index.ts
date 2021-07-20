import { Step, Diff, Plugin, Trigger } from "@shanzhai/interfaces";
import { mapDiff, parsePath } from "@shanzhai/change-tracking-helpers";
import { generateSteps } from "./generate-steps";
import { orderSteps } from "./order-steps";

export function plan(
  plugins: {
    readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
  },
  firstRun: boolean,
  diff: Diff<string>
): {
  readonly unmatchedAddedFiles: ReadonlyArray<string>;
  readonly step: Step;
} {
  const parsedDiff = mapDiff(diff, parsePath);

  const triggers: Trigger[] = [];

  for (const pluginName in plugins) {
    const plugin = plugins[pluginName];

    for (const triggerName in plugin.triggers) {
      triggers.push(plugin.triggers[triggerName]);
    }
  }

  const steps = generateSteps(triggers, firstRun, parsedDiff.diff);
  const step = orderSteps(steps.steps, steps.orderingConstraints);

  return {
    unmatchedAddedFiles: [
      ...parsedDiff.errors,
      ...steps.unmatchedAddedFiles.map((parsedPath) => parsedPath.fullPath),
    ],
    step,
  };
}
