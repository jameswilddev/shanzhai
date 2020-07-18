export interface KeyValueStoreInterface<TKey, TValue> {
  get(key: TKey): TValue;

  set(key: TKey, value: TValue): void;

  delete(key: TKey): void;
}

export class KeyValueStore<TKey, TValue>
  implements KeyValueStoreInterface<TKey, TValue> {
  private readonly data = new Map<TKey, TValue>();

  constructor(public readonly name: string) {}

  get(key: TKey): TValue {
    if (this.data.has(key)) {
      return this.data.get(key) as TValue;
    } else {
      throw new Error(
        `Cannot get value ${JSON.stringify(
          key
        )} of unset value store ${JSON.stringify(this.name)}.`
      );
    }
  }

  set(key: TKey, value: TValue): void {
    this.data.set(key, value);
  }

  delete(key: TKey): void {
    this.data.delete(key);
  }
}
