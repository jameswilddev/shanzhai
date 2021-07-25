import { KeyedStore } from "@shanzhai/interfaces";

export interface KeyValueStoreInterface<TValue> extends KeyedStore {
  readonly name: string;

  get(key: string): TValue;

  set(key: string, value: TValue): void;

  delete(key: string): void;

  getAll(): ReadonlyArray<readonly [string, TValue]>;
}
