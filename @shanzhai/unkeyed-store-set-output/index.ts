import { UnkeyedStore, Output, Effect } from "@shanzhai/interfaces";

export class UnkeyedStoreSetOutput<T> implements Output<T> {
  constructor(public readonly unkeyedStore: UnkeyedStore<T>) {}

  async set(value: T): Promise<void> {
    this.unkeyedStore.set(value);
  }

  readonly effects: ReadonlyArray<Effect> = [
    {
      type: `unkeyedStoreSet`,
      unkeyedStore: this.unkeyedStore,
    },
  ];
}
