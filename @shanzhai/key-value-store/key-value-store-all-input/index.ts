import { Input } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "../key-value-store-interface";

export class KeyValueStoreAllInput<TValue>
  implements Input<{ readonly [key: string]: TValue }>
{
  constructor(public readonly keyValueStore: KeyValueStoreInterface<TValue>) {}

  async get(): Promise<{ readonly [key: string]: TValue }> {
    return Object.fromEntries(this.keyValueStore.getAll());
  }
}
