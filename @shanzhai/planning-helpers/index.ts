import { Step, Diff, Plugin, Trigger, Effect } from "@shanzhai/interfaces";
import { generateStepForTrigger } from "./generate-step-for-trigger";
import { listTriggerOrderingConstraints } from "./list-trigger-ordering-constraints";
import { listTriggers } from "./list-triggers";
import { orderSteps } from "./order-steps";

/**
 * Queries a given set of {@link Plugin}s to produce a hierarchy of
 * {@link Step}s.
 * @param plugins  The {@link Plugin}s to query.
 * @param firstRun True when this is the first run, false when a subsequent run.
 * @param diff     The diff of filenames for which a build is being performed.
 * @returns        A hierarchy of {@link Step}s to execute.
 */
export async function plan(
  plugins: {
    readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
  },
  firstRun: boolean,
  diff: Diff<string>
): Promise<{
  readonly unmatchedAddedFiles: ReadonlyArray<string>;
  readonly step: Step;
}> {
  let triggers = listTriggers(plugins);

  if (!firstRun) {
    triggers = triggers.filter((trigger) => trigger.trigger.type !== `oneTime`);
  }

  const triggerOrderingConstraints = listTriggerOrderingConstraints(
    triggers.map((trigger) => trigger.trigger)
  );

  const effects: Effect[] = [];

  const triggerSteps: { readonly trigger: Trigger; readonly step: Step }[] = [];

  for (const trigger of triggers) {
    const result = await generateStepForTrigger(diff, effects, trigger);
    effects.push(...result.step.effects);
    diff = result.unclaimedFiles;

    triggerSteps.push({ trigger: trigger.trigger, step: result.step });
  }

  return {
    unmatchedAddedFiles: diff.added,
    step: orderSteps(
      triggerSteps.map((triggerStep) => triggerStep.step),
      triggerOrderingConstraints.map((orderingConstraint) => [
        (
          triggerSteps.find(
            (triggerStep) => triggerStep.trigger === orderingConstraint[0]
          ) as { readonly trigger: Trigger; readonly step: Step }
        ).step,
        (
          triggerSteps.find(
            (triggerStep) => triggerStep.trigger === orderingConstraint[1]
          ) as { readonly trigger: Trigger; readonly step: Step }
        ).step,
      ])
    ),
  };
}
