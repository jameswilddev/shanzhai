import { Trigger } from "@shanzhai/interfaces";

export function listTriggerOrderingConstraints(
  triggers: ReadonlyArray<Trigger>
): ReadonlyArray<readonly [Trigger, Trigger]> {
  return triggers.flatMap((trigger) =>
    trigger.writesToStores.flatMap((store) =>
      triggers
        .filter(
          (otherTrigger) =>
            (otherTrigger.type === `keyedStore` &&
              (otherTrigger.keyedStore === store ||
                otherTrigger.refreshAllWhenStoresChange.includes(store))) ||
            (otherTrigger.type === `storeAggregate` &&
              otherTrigger.stores.includes(store))
        )
        .map((otherTrigger) => [trigger, otherTrigger])
    )
  );
}
