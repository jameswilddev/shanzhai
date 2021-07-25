export interface KeyValueStoreInterface<TValue> {
  readonly name: string;

  get(key: string): TValue;

  set(key: string, value: TValue): void;

  delete(key: string): void;

  getAll(): ReadonlyArray<readonly [string, TValue]>;
}
