import { UnkeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link UnkeyedStore} which holds data in memory until the application closes.
 * @template TValue The value stored within.
 */
export class EphemeralUnkeyedStore<T> implements UnkeyedStore<T> {
  /**
   * Indicates that implements {@link UnkeyedStore}.
   */
  readonly type = `unkeyedStore`;

  private value: null | [T] = null;

  /**
   * @param name The name of this {@link EphemeralUnkeyedStore}.
   */
  constructor(public readonly name: string) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<T> {
    if (this.value === null) {
      throw new Error(
        `Cannot get value of unset unkeyed store ${JSON.stringify(this.name)}.`
      );
    } else {
      return this.value[0];
    }
  }

  /**
   * @inheritdoc
   */
  async set(value: T): Promise<void> {
    this.value = [value];
  }

  /**
   * @inheritdoc
   */
  async delete(): Promise<void> {
    this.value = null;
  }
}
