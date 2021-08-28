import { UnkeyedStore, Output, Effect } from "@shanzhai/interfaces";

/**
 * An {@link Output} which sets the current value of an {@link UnkeyedStore}.
 * @template TValue The type of value that the {@link UnkeyedStore} can hold.
 */
export class UnkeyedStoreSetOutput<T> implements Output<T> {
  /**
   * @param unkeyedStore The {@link UnkeyedStore} to which to write a value.
   */
  constructor(public readonly unkeyedStore: UnkeyedStore<T>) {}

  /**
   * @inheritdoc
   */
  async set(value: T): Promise<void> {
    this.unkeyedStore.set(value);
  }

  /**
   * @inheritdoc
   */
  readonly effects: ReadonlyArray<Effect> = [
    {
      type: `unkeyedStoreSet`,
      unkeyedStore: this.unkeyedStore,
    },
  ];
}
