import { KeyedStore } from "@shanzhai/interfaces";

export class EphemeralKeyedStore<TValue> implements KeyedStore<TValue> {
  readonly type = `keyedStore`;

  private readonly data = new Map<string, TValue>();

  constructor(public readonly name: string) {}

  async get(key: string): Promise<TValue> {
    if (this.data.has(key)) {
      return this.data.get(key) as TValue;
    } else {
      throw new Error(
        `Cannot get unset value ${JSON.stringify(
          key
        )} of keyed store ${JSON.stringify(this.name)}.`
      );
    }
  }

  async set(key: string, value: TValue): Promise<void> {
    this.data.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.data.delete(key);
  }

  async getAll(): Promise<{ readonly [key: string]: TValue }> {
    return Object.fromEntries(this.data.entries());
  }

  async getKeys(): Promise<ReadonlyArray<string>> {
    return [...this.data.keys()].sort();
  }
}
