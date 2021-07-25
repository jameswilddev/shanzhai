import { Output, Effect } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "..";

export class KeyValueStoreOutput<TValue> implements Output<TValue> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TValue>,
    public readonly key: string
  ) {}

  async set(value: TValue): Promise<void> {
    this.keyValueStore.set(this.key, value);
  }

  readonly effects: ReadonlyArray<Effect> = [
    {
      type: `keyedStoreSet`,
      store: this.keyValueStore,
      key: this.key,
    },
  ];
}
