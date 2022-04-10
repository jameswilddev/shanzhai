import minimatch = require("minimatch");
import { FileTrigger, Step, Trigger, Diff } from "@shanzhai/interfaces";
import { globCompareFunction } from "@shanzhai/glob-compare-function";

export function generateSteps(
  triggers: ReadonlyArray<Trigger>,
  firstRun: boolean,
  diff: Diff<string>
): {
  readonly steps: ReadonlyArray<Step>;
  readonly orderingConstraints: ReadonlyArray<readonly [Step, Step]>;
  readonly unmatchedAddedFiles: ReadonlyArray<string>;
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
                  leaves.push(
                    ...handleTrigger(step, trigger.invalidated, []).leaves
                  );
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
                  leaves.push(
                    ...handleTrigger(step, trigger.invalidated, []).leaves
                  );
                }
                break;
            }
          }
          break;

        case `unkeyedStoreSet`:
          for (const trigger of triggers) {
            switch (trigger.type) {
              case `storeAggregate`:
                if (trigger.stores.includes(effect.unkeyedStore)) {
                  leaves.push(
                    ...handleTrigger(step, trigger.invalidated, []).leaves
                  );
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

  const oneTimeLeaves: Step[] = [];
  const otherTriggerRoots: Step[] = [];

  for (const trigger of triggers) {
    switch (trigger.type) {
      case `oneTime`:
        if (firstRun) {
          oneTimeLeaves.push(...handleTrigger(null, trigger.up, []).leaves);
        }
        break;
    }
  }

  const fileTriggers = triggers
    .filter((trigger): trigger is FileTrigger => trigger.type === `file`)
    .sort((a, b) => globCompareFunction(a.glob, b.glob));

  for (const path of diff.added) {
    for (const trigger of fileTriggers) {
      if (minimatch(path, trigger.glob)) {
        otherTriggerRoots.push(handleTrigger(null, trigger.up, [path]).root);

        const index = unmatchedAddedFiles.indexOf(path);
        unmatchedAddedFiles.splice(index, 1);

        break;
      }
    }
  }

  for (const path of diff.changed) {
    for (const trigger of fileTriggers) {
      if (minimatch(path, trigger.glob)) {
        const down = handleTrigger(null, trigger.down, [path]);
        const up = handleTrigger(null, trigger.up, [path]);

        otherTriggerRoots.push(down.root);

        for (const downLeaf of down.leaves) {
          link(downLeaf, up.root);
        }

        break;
      }
    }
  }

  for (const path of diff.deleted) {
    for (const trigger of fileTriggers) {
      if (minimatch(path, trigger.glob)) {
        otherTriggerRoots.push(handleTrigger(null, trigger.down, [path]).root);

        break;
      }
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
