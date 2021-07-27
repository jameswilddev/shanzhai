import {
  Step,
  Trigger,
  Diff,
  ParsedPath,
  StoreAggregateTrigger,
} from "@shanzhai/interfaces";

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

  const raisedStoreAggregates: {
    readonly trigger: StoreAggregateTrigger;
    readonly step: Step;
  }[] = [];

  function handleStoreAggregate(
    triggeredBy: Step,
    trigger: StoreAggregateTrigger
  ): void {
    const existing = raisedStoreAggregates.find(
      (raised) => raised.trigger === trigger
    );

    if (existing === undefined) {
      const step = trigger.invalidated();

      raisedStoreAggregates.push({
        trigger,
        step,
      });

      handleStep(triggeredBy, step);
    } else {
      link(triggeredBy, existing.step);
    }
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

              case `storeAggregate`:
                if (trigger.stores.includes(effect.keyedStore)) {
                  handleStoreAggregate(step, trigger);
                }
                break;

              case `fileExtension`:
                break;

              case `keyedStore`:
                if (trigger.keyedStore === effect.keyedStore) {
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

              case `storeAggregate`:
                if (trigger.stores.includes(effect.keyedStore)) {
                  handleStoreAggregate(step, trigger);
                }
                break;

              case `fileExtension`:
                break;

              case `keyedStore`:
                if (trigger.keyedStore === effect.keyedStore) {
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

              case `storeAggregate`:
                if (trigger.stores.includes(effect.unkeyedStore)) {
                  handleStoreAggregate(step, trigger);
                }
                break;

              case `fileExtension`:
                break;

              case `keyedStore`:
                break;

              case `oneTime`:
                break;

              case `unkeyedStore`:
                if (trigger.unkeyedStore === effect.unkeyedStore) {
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

              case `storeAggregate`:
                if (trigger.stores.includes(effect.unkeyedStore)) {
                  handleStoreAggregate(step, trigger);
                }
                break;

              case `fileExtension`:
                break;

              case `keyedStore`:
                break;

              case `oneTime`:
                break;

              case `unkeyedStore`:
                if (trigger.unkeyedStore === effect.unkeyedStore) {
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

  const oneTimeLeaves: Step[] = [];
  const fileSteps: Step[] = [];

  for (const trigger of triggers) {
    switch (trigger.type) {
      case `file`: {
        const path = trigger.path.join(`/`);

        for (const deleted of diff.deleted) {
          if (deleted.fullPath === path) {
            const step = trigger.down(deleted);
            fileSteps.push(step);
            handleStep(null, step);
          }
        }

        for (const changed of diff.changed) {
          if (changed.fullPath === path) {
            const down = trigger.down(changed);
            const up = trigger.up(changed);

            const downSteps = handleStep(null, down);

            handleStep(null, up);

            for (const downStep of downSteps) {
              link(downStep, up);
            }

            fileSteps.push(down, up);
          }
        }

        for (const added of diff.added) {
          if (added.fullPath === path) {
            const step = trigger.up(added);

            handleStep(null, step);

            const index = unmatchedAddedFiles.indexOf(added);

            if (index !== -1) {
              unmatchedAddedFiles.splice(index, 1);
            }

            fileSteps.push(step);
          }
        }
        break;
      }

      case `storeAggregate`:
        break;

      case `fileExtension`:
        for (const deleted of diff.deleted) {
          if (deleted.fileExtension === trigger.extension) {
            const step = trigger.down(deleted);
            fileSteps.push(step);
            handleStep(null, step);
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

            fileSteps.push(down, up);
          }
        }

        for (const added of diff.added) {
          if (added.fileExtension === trigger.extension) {
            const step = trigger.up(added);

            handleStep(null, step);

            const index = unmatchedAddedFiles.indexOf(added);

            if (index !== -1) {
              unmatchedAddedFiles.splice(index, 1);
            }

            fileSteps.push(step);
          }
        }
        break;

      case `keyedStore`:
        break;

      case `oneTime`:
        if (firstRun) {
          oneTimeLeaves.push(...handleStep(null, trigger.up()));
        }
        break;

      case `unkeyedStore`:
        break;
    }
  }

  for (const oneTimeLeaf of oneTimeLeaves) {
    for (const fileStep of fileSteps) {
      link(oneTimeLeaf, fileStep);
    }
  }

  return {
    steps,
    orderingConstraints,
    unmatchedAddedFiles,
  };
}
