import { Plugin, Trigger } from "@shanzhai/interfaces";
import { globCompareFunction } from "@shanzhai/glob-compare-function";

const compareFunction = (
  a: { readonly trigger: Trigger },
  b: { readonly trigger: Trigger }
): number => {
  if (a.trigger.type === `oneTime` && b.trigger.type !== `oneTime`) {
    return -1;
  } else if (
    a.trigger.type === `file` &&
    b.trigger.type !== `oneTime` &&
    b.trigger.type !== `file`
  ) {
    return -1;
  } else if (a.trigger.type === `file` && b.trigger.type === `file`) {
    return globCompareFunction(a.trigger.glob, b.trigger.glob);
  } else if (
    a.trigger.type === `keyedStore` &&
    b.trigger.writesToStores.includes(a.trigger.keyedStore)
  ) {
    return 1;
  } else if (
    a.trigger.type === `keyedStore` &&
    a.trigger.refreshAllWhenStoresChange.some((store) =>
      b.trigger.writesToStores.includes(store)
    )
  ) {
    return 1;
  } else if (
    a.trigger.type === `storeAggregate` &&
    a.trigger.stores.some((store) => b.trigger.writesToStores.includes(store))
  ) {
    return 1;
  } else {
    return 0;
  }
};

export function listTriggers(plugins: {
  readonly [name: string]: Plugin<{ readonly [name: string]: Trigger }>;
}): ReadonlyArray<{
  readonly pluginName: string;
  readonly triggerName: string;
  readonly trigger: Trigger;
}> {
  return Object.entries(plugins)
    .flatMap(([pluginName, plugin]) =>
      Object.entries(plugin.triggers).map(([triggerName, trigger]) => ({
        pluginName,
        triggerName,
        trigger,
      }))
    )
    .sort((a, b) => compareFunction(a, b) || -compareFunction(b, a));
}
