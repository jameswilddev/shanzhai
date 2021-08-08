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
  const createdSteps: {
    readonly stepFactory: unknown;
    readonly args: ReadonlyArray<unknown>;
    readonly step: Step;
    readonly leaves: ReadonlyArray<Step>;
  }[] = [];

  const orderingConstraints: (readonly [Step, Step])[] = [];

  function link(from: null | Step, to: Step): void {
    if (
      from !== null &&
      !orderingConstraints.some(
        (constraint) => constraint[0] === from && constraint[1] === to
      )
    ) {
      orderingConstraints.push([from, to]);
    }
  }

  function handleEffects(step: Step): ReadonlyArray<Step> {
    const leaves: Step[] = [];

    for (const effect of step.effects) {
      switch (effect.type) {
        case `keyedStoreDelete`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `keyedStore`:
                if (trigger.keyedStore === effect.keyedStore) {
                  leaves.push(
                    ...handleTrigger(step, trigger.down, [effect.key]).leaves
                  );
                }
                break;

              case `storeAggregate`:
                if (trigger.stores.includes(effect.keyedStore)) {
                  handleTrigger(step, trigger.invalidated, []);
                }
                break;
            }
          }
          break;

        case `keyedStoreSet`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `keyedStore`:
                if (trigger.keyedStore === effect.keyedStore) {
                  leaves.push(
                    ...handleTrigger(step, trigger.up, [effect.key]).leaves
                  );
                }
                break;

              case `storeAggregate`:
                if (trigger.stores.includes(effect.keyedStore)) {
                  handleTrigger(step, trigger.invalidated, []);
                }
                break;
            }
          }
          break;

        case `unkeyedStoreDelete`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `unkeyedStore`:
                if (trigger.unkeyedStore === effect.unkeyedStore) {
                  leaves.push(...handleTrigger(step, trigger.down, []).leaves);
                }
                break;

              case `storeAggregate`:
                if (trigger.stores.includes(effect.unkeyedStore)) {
                  handleTrigger(step, trigger.invalidated, []);
                }
                break;
            }
          }
          break;

        case `unkeyedStoreSet`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `unkeyedStore`:
                if (trigger.unkeyedStore === effect.unkeyedStore) {
                  leaves.push(...handleTrigger(step, trigger.up, []).leaves);
                }
                break;

              case `storeAggregate`:
                if (trigger.stores.includes(effect.unkeyedStore)) {
                  handleTrigger(step, trigger.invalidated, []);
                }
                break;
            }
          }
          break;
      }
    }

    if (leaves.length === 0) {
      leaves.push(step);
    }

    return leaves;
  }

  function handleTrigger<TParameters extends ReadonlyArray<unknown>>(
    triggeredBy: null | Step,
    stepFactory: (...args: TParameters) => Step,
    args: TParameters
  ): { readonly root: Step; readonly leaves: ReadonlyArray<Step> } {
    const existingStep = createdSteps.find(
      (step) =>
        step.stepFactory === stepFactory &&
        step.args.length === args.length &&
        step.args.every((arg, index) => arg === args[index])
    );

    let root: Step;
    let leaves: ReadonlyArray<Step>;

    if (existingStep === undefined) {
      root = stepFactory(...args);

      leaves = handleEffects(root);

      createdSteps.push({
        stepFactory,
        args,
        step: root,
        leaves,
      });
    } else {
      root = existingStep.step;
      leaves = existingStep.leaves;
    }

    if (triggeredBy !== null) {
      link(triggeredBy, root);
    }

    return { root, leaves };
  }

  const unmatchedAddedFiles = [...diff.added];

  function reportMatched(parsedPath: ParsedPath): void {
    const index = unmatchedAddedFiles.indexOf(parsedPath);

    if (index !== -1) {
      unmatchedAddedFiles.splice(index, 1);
    }
  }

  const oneTimeLeaves: Step[] = [];
  const otherTriggerRoots: Step[] = [];

  for (const trigger of triggers) {
    switch (trigger.type) {
      case `oneTime`:
        if (firstRun) {
          oneTimeLeaves.push(...handleTrigger(null, trigger.up, []).leaves);
        }
        break;

      case `file`:
        {
          const fullPath = trigger.path.join(`/`);

          const addedPath = diff.added.find(
            (parsedPath) => parsedPath.fullPath === fullPath
          );

          const changedPath = diff.changed.find(
            (parsedPath) => parsedPath.fullPath === fullPath
          );

          const deletedPath = diff.deleted.find(
            (parsedPath) => parsedPath.fullPath === fullPath
          );

          if (addedPath !== undefined) {
            otherTriggerRoots.push(
              handleTrigger(null, trigger.up, [addedPath]).root
            );

            reportMatched(addedPath);
          }

          if (changedPath !== undefined) {
            const down = handleTrigger(null, trigger.down, [changedPath]);
            const up = handleTrigger(null, trigger.up, [changedPath]);

            otherTriggerRoots.push(down.root);

            for (const downLeaf of down.leaves) {
              link(downLeaf, up.root);
            }
          }

          if (deletedPath !== undefined) {
            otherTriggerRoots.push(
              handleTrigger(null, trigger.down, [deletedPath]).root
            );
          }
        }
        break;

      case `fileExtension`:
        {
          for (const parsedPath of diff.added) {
            if (parsedPath.fileExtension === trigger.extension) {
              otherTriggerRoots.push(
                handleTrigger(null, trigger.up, [parsedPath]).root
              );

              reportMatched(parsedPath);
            }
          }

          for (const parsedPath of diff.changed) {
            if (parsedPath.fileExtension === trigger.extension) {
              const down = handleTrigger(null, trigger.down, [parsedPath]);
              const up = handleTrigger(null, trigger.up, [parsedPath]);

              otherTriggerRoots.push(down.root);

              for (const downLeaf of down.leaves) {
                link(downLeaf, up.root);
              }
            }
          }

          for (const parsedPath of diff.deleted) {
            if (parsedPath.fileExtension === trigger.extension) {
              otherTriggerRoots.push(
                handleTrigger(null, trigger.down, [parsedPath]).root
              );
            }
          }
        }
        break;
    }
  }

  for (const oneTimeLeaf of oneTimeLeaves) {
    for (const otherTriggerRoot of otherTriggerRoots) {
      link(oneTimeLeaf, otherTriggerRoot);
    }
  }

  const steps = createdSteps.map((data) => data.step);

  return { steps, orderingConstraints, unmatchedAddedFiles };
}
