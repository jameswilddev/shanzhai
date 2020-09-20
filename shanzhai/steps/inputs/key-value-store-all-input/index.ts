import { KeyValueStoreInterface } from "../../../stores/key-value-store";
import { Input } from "../input";

export class KeyValueStoreAllInput<TKey extends string, TValue>
  implements Input<ReadonlyArray<readonly [TKey, TValue]>> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>
  ) {}

  get(): ReadonlyArray<readonly [TKey, TValue]> {
    return this.keyValueStore.getAll();
  }
}
