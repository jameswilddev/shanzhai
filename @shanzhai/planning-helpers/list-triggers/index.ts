import {
  FileTrigger,
  KeyedStoreTrigger,
  StoreAggregateTrigger,
  Plugin,
  Trigger,
} from "@shanzhai/interfaces";
import { globCompareFunction } from "@shanzhai/glob-compare-function";

export function listTriggers(plugins: {
  readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
}): ReadonlyArray<{
  readonly pluginName: string;
  readonly triggerName: string;
  readonly trigger: Trigger;
}> {
  type TriggerWithMetadata<T extends Trigger> = {
    readonly pluginName: string;
    readonly triggerName: string;
    readonly trigger: T;
  };

  const triggers: ReadonlyArray<TriggerWithMetadata<Trigger>> = Object.entries(
    plugins
  ).flatMap(([pluginName, plugin]) =>
    Object.entries(plugin.triggers).map(([triggerName, trigger]) => ({
      pluginName,
      triggerName,
      trigger,
    }))
  );

  const output: TriggerWithMetadata<Trigger>[] = [
    ...triggers.filter((trigger) => trigger.trigger.type === `oneTime`),
    ...triggers
      .filter(
        (trigger): trigger is TriggerWithMetadata<FileTrigger> =>
          trigger.trigger.type === `file`
      )
      .sort((a, b) => globCompareFunction(a.trigger.glob, b.trigger.glob)),
  ];

  const remainingStoreTriggers = triggers.filter(
    (
      trigger
    ): trigger is TriggerWithMetadata<
      KeyedStoreTrigger | StoreAggregateTrigger
    > =>
      trigger.trigger.type === `keyedStore` ||
      trigger.trigger.type === `storeAggregate`
  );

  while (remainingStoreTriggers.length > 0) {
    const storesYetToBeWritten = remainingStoreTriggers.flatMap(
      (trigger) => trigger.trigger.writesToStores
    );

    const matches = remainingStoreTriggers.filter(
      (trigger) =>
        (trigger.trigger.type === `storeAggregate` &&
          !trigger.trigger.stores.some((store) =>
            storesYetToBeWritten.includes(store)
          )) ||
        (trigger.trigger.type === `keyedStore` &&
          !trigger.trigger.refreshAllWhenStoresChange.some((store) =>
            storesYetToBeWritten.includes(store)
          ) &&
          !storesYetToBeWritten.includes(trigger.trigger.keyedStore))
    );

    if (matches.length === 0) {
      throw new Error(
        `The triggers of the installed plugins form a cyclic dependency (a trigger is dependent upon one or more stores it directly or indirectly writes to).`
      );
    }

    for (const match of matches) {
      const index = remainingStoreTriggers.indexOf(match);
      remainingStoreTriggers.splice(index, 1);

      output.push(match);
    }
  }

  return output;
}
