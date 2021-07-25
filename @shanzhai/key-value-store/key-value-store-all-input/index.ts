import { Input } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "../key-value-store-interface";

export class KeyValueStoreAllInput<TValue>
  implements Input<ReadonlyArray<readonly [string, TValue]>>
{
  constructor(public readonly keyValueStore: KeyValueStoreInterface<TValue>) {}

  async get(): Promise<ReadonlyArray<readonly [string, TValue]>> {
    return this.keyValueStore.getAll();
  }
}
