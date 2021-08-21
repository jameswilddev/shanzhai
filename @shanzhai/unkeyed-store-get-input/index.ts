import { Input, UnkeyedStore } from "@shanzhai/interfaces";

export class UnkeyedStoreGetInput<TValue> implements Input<TValue> {
  constructor(public readonly unkeyedStore: UnkeyedStore<TValue>) {}

  async get(): Promise<TValue> {
    return await this.unkeyedStore.get();
  }
}
