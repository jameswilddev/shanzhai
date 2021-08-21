import { Output, Effect, KeyedStore } from "@shanzhai/interfaces";

export class KeyedStoreSetOutput<TValue> implements Output<TValue> {
  constructor(
    public readonly keyedStore: KeyedStore<TValue>,
    public readonly key: string
  ) {}

  async set(value: TValue): Promise<void> {
    this.keyedStore.set(this.key, value);
  }

  readonly effects: ReadonlyArray<Effect> = [
    {
      type: `keyedStoreSet`,
      keyedStore: this.keyedStore,
      key: this.key,
    },
  ];
}
