import { KeyValueStoreInterface } from "../../../stores/key-value-store";
import { Input } from "@shanzhai/interfaces";

export class KeyValueStoreInput<TKey extends string, TValue>
  implements Input<TValue> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>,
    public readonly key: TKey
  ) {}

  get(): TValue {
    return this.keyValueStore.get(this.key);
  }
}
