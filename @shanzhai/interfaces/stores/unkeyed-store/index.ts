export interface UnkeyedStore<TValue> {
  readonly type: `unkeyedStore`;

  readonly name: string;

  get(): TValue;

  set(value: TValue): void;

  delete(): void;
}
