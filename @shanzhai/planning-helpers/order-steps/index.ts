import { Step } from "@shanzhai/interfaces";
import { ParallelStep } from "@shanzhai/parallel-step";
import { SerialStep } from "@shanzhai/serial-step";

export function orderSteps(
  steps: ReadonlyArray<Step>,
  orderingConstraints: ReadonlyArray<readonly [Step, Step]>
): Step {
  // This algorithm currently works by collecting the steps for which there are currently no unresolved dependencies and creating a ParallelStep for them.  This is repeated until all steps are accounted for, after which, the ParallelSteps are organized under a SerialStep.  This works, but is quite problematic from a concurrency perspective; two parallel chains of steps will execute in lockstep as their next steps become available simultaneously; it would be much better to instead have a single ParallelStep with two child SerialSteps, each of which contains a single chain of steps.  Any future implementation should be well-covered by the tests, however.

  const remainingSteps = [...steps];
  const parallels: ReadonlyArray<Step>[] = [];
  const addedSteps: Step[] = [];

  while (remainingSteps.length > 0) {
    const parallel: Step[] = [];

    for (const remainingStep of remainingSteps) {
      if (
        orderingConstraints
          .filter(
            (orderingConstraint) => orderingConstraint[1] === remainingStep
          )
          .every((orderingConstraint) =>
            addedSteps.includes(orderingConstraint[0])
          )
      ) {
        parallel.push(remainingStep);
      }
    }

    if (parallel.length === 0) {
      throw new Error(
        `Unable to produce a plan for a set of steps with cyclic dependencies.`
      );
    } else {
      for (const step of parallel) {
        remainingSteps.splice(remainingSteps.indexOf(step), 1);
      }

      parallels.push(parallel);
      addedSteps.push(...parallel);
    }
  }

  return new SerialStep(
    `root`,
    parallels.map((parallel, i) =>
      parallel.length === 1
        ? parallel[0]
        : new ParallelStep(`parallel${i}`, parallel)
    )
  );
}
