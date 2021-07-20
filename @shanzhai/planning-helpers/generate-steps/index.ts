import { Step, Trigger, Diff, ParsedPath } from "@shanzhai/interfaces";

export function generateSteps(
  triggers: ReadonlyArray<Trigger>,
  firstRun: boolean,
  diff: Diff<ParsedPath>
): {
  readonly steps: ReadonlyArray<Step>;
  readonly orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
  readonly unmatchedAddedFiles: ReadonlyArray<ParsedPath>;
} {
  const steps: Step[] = [];
  const orderingConstraints: (readonly [Step, Step])[] = [];
  const unmatchedAddedFiles = [...diff.added];

  function link(from: Step, to: Step): void {
    orderingConstraints.push([from, to]);
  }

  function handleStep(
    triggeredBy: null | Step,
    step: Step
  ): ReadonlyArray<Step> {
    steps.push(step);

    if (triggeredBy !== null) {
      link(triggeredBy, step);
    }

    const output = [];

    for (const effect of step.effects) {
      switch (effect.type) {
        case `keyedStoreSet`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `file`:
                break;

              case `keyedStore`:
                if (trigger.store === effect.store) {
                  output.push(...handleStep(step, trigger.up(effect.key)));
                }
                break;

              case `oneTime`:
                break;

              case `unkeyedStore`:
                break;
            }
          }
          break;

        case `keyedStoreDelete`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `file`:
                break;

              case `keyedStore`:
                if (trigger.store === effect.store) {
                  output.push(...handleStep(step, trigger.down(effect.key)));
                }
                break;

              case `oneTime`:
                break;

              case `unkeyedStore`:
                break;
            }
          }
          break;

        case `unkeyedStoreSet`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `file`:
                break;

              case `keyedStore`:
                break;

              case `oneTime`:
                break;

              case `unkeyedStore`:
                if (trigger.store === effect.store) {
                  output.push(...handleStep(step, trigger.up()));
                }
                break;
            }
          }
          break;

        case `unkeyedStoreDelete`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `file`:
                break;

              case `keyedStore`:
                break;

              case `oneTime`:
                break;

              case `unkeyedStore`:
                if (trigger.store === effect.store) {
                  output.push(...handleStep(step, trigger.down()));
                }
                break;
            }
          }
          break;
      }
    }

    if (output.length === 0) {
      output.push(step);
    }

    return output;
  }

  for (const trigger of triggers) {
    switch (trigger.type) {
      case `file`:
        for (const deleted of diff.deleted) {
          if (deleted.fileExtension === trigger.extension) {
            handleStep(null, trigger.down(deleted));
          }
        }

        for (const changed of diff.changed) {
          if (changed.fileExtension === trigger.extension) {
            const down = trigger.down(changed);
            const up = trigger.up(changed);

            const downSteps = handleStep(null, down);

            handleStep(null, up);

            for (const downStep of downSteps) {
              link(downStep, up);
            }
          }
        }

        for (const added of diff.added) {
          if (added.fileExtension === trigger.extension) {
            handleStep(null, trigger.up(added));

            const index = unmatchedAddedFiles.indexOf(added);

            if (index !== -1) {
              unmatchedAddedFiles.splice(index, 1);
            }
          }
        }
        break;

      case `keyedStore`:
        break;

      case `oneTime`:
        if (firstRun) {
          handleStep(null, trigger.up());
        }
        break;

      case `unkeyedStore`:
        break;
    }
  }

  return {
    steps,
    orderingConstraints,
    unmatchedAddedFiles,
  };
}
