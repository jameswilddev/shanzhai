import { KeyedStore } from "@shanzhai/interfaces";

/**
 * A {@link KeyedStore} which holds data in memory until the application closes.
 * @template TValue The value stored within.
 */
export class EphemeralKeyedStore<TValue> implements KeyedStore<TValue> {
  /**
   * Indicates that implements {@link KeyedStore}.
   */
  readonly type = `keyedStore`;

  private readonly data = new Map<string, TValue>();

  /**
   * @param name The name of this {@link EphemeralKeyedStore}.
   */
  constructor(public readonly name: string) {}

  /**
   * @inheritdoc
   */
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

  /**
   * @inheritdoc
   */
  async set(key: string, value: TValue): Promise<void> {
    this.data.set(key, value);
  }

  /**
   * @inheritdoc
   */
  async delete(key: string): Promise<void> {
    this.data.delete(key);
  }

  /**
   * @inheritdoc
   */
  async getAll(): Promise<{ readonly [key: string]: TValue }> {
    return Object.fromEntries(this.data.entries());
  }

  /**
   * @inheritdoc
   */
  async getKeys(): Promise<ReadonlyArray<string>> {
    return [...this.data.keys()].sort();
  }
}
