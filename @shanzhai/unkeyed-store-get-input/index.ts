import { Input, UnkeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link Input} which gets the current value from an {@link UnkeyedStore}.
 * @template TValue The type of value that the {@link UnkeyedStore} can hold.
 */
export class UnkeyedStoreGetInput<TValue> implements Input<TValue> {
  /**
   * @param unkeyedStore The {@link UnkeyedStore} fro mwhich to retrieve a
   *                     value.
   */
  constructor(public readonly unkeyedStore: UnkeyedStore<TValue>) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<TValue> {
    return await this.unkeyedStore.get();
  }
}
