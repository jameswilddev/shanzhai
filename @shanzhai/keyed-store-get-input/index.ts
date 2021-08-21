import { Input, KeyedStore } from "@shanzhai/interfaces";

export class KeyedStoreGetInput<TValue> implements Input<TValue> {
  constructor(
    public readonly keyedStore: KeyedStore<TValue>,
    public readonly key: string
  ) {}

  async get(): Promise<TValue> {
    return this.keyedStore.get(this.key);
  }
}
