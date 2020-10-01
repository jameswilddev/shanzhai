import { Input } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "..";

export class KeyValueStoreInput<TKey extends string, TValue>
  implements Input<TValue> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>,
    public readonly key: TKey
  ) {}

  async get(): Promise<TValue> {
    return this.keyValueStore.get(this.key);
  }
}
