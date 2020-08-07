import { Diff } from "../diff";
import { Step } from "../../steps/step";
import { SerialStep } from "../../steps/aggregation-steps/serial-step";
import { ParallelStep } from "../../steps/aggregation-steps/parallel-step";

export const generateSteps = <TInput>(
  name: string,
  regenerateAll: boolean,
  diff: Diff<TInput>,
  extractName: (input: TInput) => string,
  down: (input: TInput) => ReadonlyArray<Step>,
  up: (input: TInput) => ReadonlyArray<Step>
): ParallelStep => {
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

  return new ParallelStep(name, steps);
};
