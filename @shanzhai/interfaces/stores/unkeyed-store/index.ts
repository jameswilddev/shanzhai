export interface UnkeyedStore<TValue> {
  readonly type: `unkeyedStore`;

  readonly name: string;

  get(): Promise<TValue>;

  set(value: TValue): Promise<void>;

  delete(): Promise<void>;
}
