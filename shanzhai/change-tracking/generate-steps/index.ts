import { Diff } from "@shanzhai/change-tracking-helpers";
import { Step } from "@shanzhai/interfaces";
import { SerialStep } from "@shanzhai/serial-step";
import { ParallelStep } from "@shanzhai/parallel-step";

export const generateSteps = <TInput>(
  name: string,
  regenerateAll: boolean,
  diff: Diff<TInput>,
  extractName: (input: TInput) => string,
  down: (input: TInput) => ReadonlyArray<Step>,
  up: (input: TInput) => ReadonlyArray<Step>
): ReadonlyArray<ParallelStep> => {
  const additionSteps = diff.added.map(
    (input) => new SerialStep(extractName(input), up(input))
  );

  const regeneratedSteps = regenerateAll
    ? [...diff.unchanged, ...diff.changed]
    : diff.changed;

  const regenerationSteps = regeneratedSteps.map(
    (input) =>
      new SerialStep(extractName(input), [...down(input), ...up(input)])
  );

  const deletionSteps = diff.deleted.map(
    (input) => new SerialStep(extractName(input), down(input))
  );

  const steps = [...additionSteps, ...regenerationSteps, ...deletionSteps];

  if (steps.length > 0) {
    return [new ParallelStep(name, steps)];
  } else {
    return [];
  }
};
