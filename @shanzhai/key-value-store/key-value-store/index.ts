import { KeyValueStoreInterface } from "../key-value-store-interface";

export class KeyValueStore<TValue> implements KeyValueStoreInterface<TValue> {
  private readonly data = new Map<string, TValue>();

  constructor(public readonly name: string) {}

  get(key: string): TValue {
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

  set(key: string, value: TValue): void {
    this.data.set(key, value);
  }

  delete(key: string): void {
    this.data.delete(key);
  }

  getAll(): ReadonlyArray<readonly [string, TValue]> {
    return Array.from(this.data.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }
}
