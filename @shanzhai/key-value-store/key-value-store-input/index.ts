import { Input } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "..";

export class KeyValueStoreInput<TValue> implements Input<TValue> {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TValue>,
    public readonly key: string
  ) {}

  async get(): Promise<TValue> {
    return this.keyValueStore.get(this.key);
  }
}
