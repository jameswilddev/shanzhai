import { KeyValueStoreInterface } from "../key-value-store-interface";

export class KeyValueStore<TKey extends string, TValue>
  implements KeyValueStoreInterface<TKey, TValue>
{
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

  getAll(): ReadonlyArray<readonly [TKey, TValue]> {
    return Array.from(this.data.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }

  getKeys(): ReadonlyArray<TKey> {
    return Array.from(this.data.keys()).sort();
  }
}
