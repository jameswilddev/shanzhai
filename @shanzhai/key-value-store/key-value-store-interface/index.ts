export interface KeyValueStoreInterface<TKey extends string, TValue> {
  readonly name: string;

  get(key: TKey): TValue;

  set(key: TKey, value: TValue): void;

  delete(key: TKey): void;

  getAll(): ReadonlyArray<readonly [TKey, TValue]>;
}
