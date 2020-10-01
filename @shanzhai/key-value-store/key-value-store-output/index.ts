import { Output } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "..";

export class KeyValueStoreOutput<TKey extends string, TValue>
  implements Output<TValue> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>,
    public readonly key: TKey
  ) {}

  async set(value: TValue): Promise<void> {
    this.keyValueStore.set(this.key, value);
  }
}
