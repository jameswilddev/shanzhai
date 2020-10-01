import { Input } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "../key-value-store-interface";

export class KeyValueStoreAllInput<TKey extends string, TValue>
  implements Input<ReadonlyArray<readonly [TKey, TValue]>> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>
  ) {}

  async get(): Promise<ReadonlyArray<readonly [TKey, TValue]>> {
    return this.keyValueStore.getAll();
  }
}
