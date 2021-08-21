export interface KeyedStore<TValue> {
  readonly type: `keyedStore`;

  readonly name: string;

  get(key: string): TValue;

  set(key: string, value: TValue): void;

  delete(key: string): void;

  getAll(): { readonly [key: string]: TValue };

  getKeys(): ReadonlyArray<string>;
}
