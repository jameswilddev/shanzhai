import minimatch = require("minimatch");
import {
  Diff,
  Step,
  Trigger,
  Effect,
  KeyedStoreDeleteEffect,
  KeyedStoreSetEffect,
} from "@shanzhai/interfaces";
import { SerialStep } from "@shanzhai/serial-step";
import { atLeastOneStoreChangedByAnEffect } from "../at-least-one-store-changed-by-an-effect";

export async function generateParallelStepsForTrigger(
  unclaimedFiles: Diff<string>,
  effects: ReadonlyArray<Effect>,
  trigger: Trigger
): Promise<{
  readonly unclaimedFiles: Diff<string>;
  readonly parallelSteps: ReadonlyArray<Step>;
}> {
  switch (trigger.type) {
    case `oneTime`:
      return {
        unclaimedFiles,
        parallelSteps: [trigger.up()],
      };

    case `file`: {
      const nextAdded: string[] = [];
      const nextChanged: string[] = [];
      const nextDeleted: string[] = [];
      const parallelSteps: Step[] = [];

      for (const added of unclaimedFiles.added) {
        if (minimatch(added, trigger.glob)) {
          parallelSteps.push(trigger.up(added));
        } else {
          nextAdded.push(added);
        }
      }

      for (const changed of unclaimedFiles.changed) {
        if (minimatch(changed, trigger.glob)) {
          parallelSteps.push(
            new SerialStep(changed, [
              trigger.down(changed),
              trigger.up(changed),
            ])
          );
        } else {
          nextChanged.push(changed);
        }
      }

      for (const deleted of unclaimedFiles.deleted) {
        if (minimatch(deleted, trigger.glob)) {
          parallelSteps.push(trigger.down(deleted));
        } else {
          nextDeleted.push(deleted);
        }
      }

      return {
        unclaimedFiles: {
          added: nextAdded,
          changed: nextChanged,
          deleted: nextDeleted,
          unchanged: unclaimedFiles.unchanged,
        },
        parallelSteps,
      };
    }

    case `keyedStore`: {
      const downKeys: string[] = effects
        .filter(
          (effect): effect is KeyedStoreDeleteEffect =>
            effect.type === `keyedStoreDelete` &&
            effect.keyedStore === trigger.keyedStore
        )
        .map((effect) => effect.key);

      const upKeys: string[] = effects
        .filter(
          (effect): effect is KeyedStoreSetEffect =>
            effect.type === `keyedStoreSet` &&
            effect.keyedStore === trigger.keyedStore
        )
        .map((effect) => effect.key);

      if (
        atLeastOneStoreChangedByAnEffect(
          trigger.refreshAllWhenStoresChange,
          effects
        )
      ) {
        const keysCurrentlyInStore = await trigger.keyedStore.getKeys();

        const keysToRefresh = keysCurrentlyInStore.filter(
          (key) => !downKeys.includes(key) && !upKeys.includes(key)
        );

        downKeys.push(...keysToRefresh);
        upKeys.push(...keysToRefresh);
      }

      const keys = [
        ...downKeys,
        ...upKeys.filter((key) => !downKeys.includes(key)),
      ];

      return {
        unclaimedFiles,
        parallelSteps: keys.map((key) =>
          downKeys.includes(key)
            ? upKeys.includes(key)
              ? new SerialStep(key, [trigger.down(key), trigger.up(key)])
              : trigger.down(key)
            : trigger.up(key)
        ),
      };
    }

    case `storeAggregate`:
      if (atLeastOneStoreChangedByAnEffect(trigger.stores, effects)) {
        return { unclaimedFiles, parallelSteps: [trigger.invalidated()] };
      } else {
        return { unclaimedFiles, parallelSteps: [] };
      }
  }
}
