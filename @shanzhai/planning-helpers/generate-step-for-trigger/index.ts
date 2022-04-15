import { Diff, Step, Trigger, Effect } from "@shanzhai/interfaces";
import { generateParallelStepsForTrigger } from "../generate-parallel-steps-for-trigger";
import { NopStep } from "@shanzhai/nop-step";
import { ParallelStep } from "@shanzhai/parallel-step";

export async function generateStepForTrigger(
  unclaimedFiles: Diff<string>,
  effects: ReadonlyArray<Effect>,
  trigger: {
    readonly pluginName: string;
    readonly triggerName: string;
    readonly trigger: Trigger;
  }
): Promise<{
  readonly unclaimedFiles: Diff<string>;
  readonly step: Step;
}> {
  const result = await generateParallelStepsForTrigger(
    unclaimedFiles,
    effects,
    trigger.trigger
  );

  switch (result.parallelSteps.length) {
    case 0:
      return {
        unclaimedFiles: result.unclaimedFiles,
        step: new NopStep(
          `Trigger "${trigger.triggerName}" of plugin "${trigger.pluginName}" did not run`
        ),
      };

    case 1:
      return {
        unclaimedFiles: result.unclaimedFiles,
        step: result.parallelSteps[0],
      };

    default:
      return {
        unclaimedFiles: result.unclaimedFiles,
        step: new ParallelStep(
          `Trigger "${trigger.triggerName}" of plugin "${trigger.pluginName}"`,
          result.parallelSteps
        ),
      };
  }
}
