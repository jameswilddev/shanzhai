export interface KeyedStore<TValue> {
  readonly type: `keyedStore`;

  readonly name: string;

  get(key: string): Promise<TValue>;

  set(key: string, value: TValue): Promise<void>;

  delete(key: string): Promise<void>;

  getAll(): Promise<{ readonly [key: string]: TValue }>;

  getKeys(): Promise<ReadonlyArray<string>>;
}
