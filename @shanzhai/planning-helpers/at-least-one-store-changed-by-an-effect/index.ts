import { UnkeyedStore, KeyedStore, Effect } from "@shanzhai/interfaces";

export function atLeastOneStoreChangedByAnEffect(
  stores: ReadonlyArray<UnkeyedStore<unknown> | KeyedStore<unknown>>,
  effects: ReadonlyArray<Effect>
): boolean {
  return effects.some(
    (effect) =>
      (effect.type === `unkeyedStoreSet` &&
        stores.includes(effect.unkeyedStore)) ||
      ((effect.type === `keyedStoreSet` ||
        effect.type === `keyedStoreDelete`) &&
        stores.includes(effect.keyedStore))
  );
}
