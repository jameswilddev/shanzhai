import { KeyedStore } from "@shanzhai/interfaces";

export interface KeyValueStoreInterface<TKey extends string, TValue>
  extends KeyedStore<TKey> {
  get(key: TKey): TValue;

  set(key: TKey, value: TValue): void;

  delete(key: TKey): void;

  getAll(): ReadonlyArray<readonly [TKey, TValue]>;
}
