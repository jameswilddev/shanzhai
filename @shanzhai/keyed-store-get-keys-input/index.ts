import { Input, KeyedStore } from "@shanzhai/interfaces";

export class KeyedStoreGetKeysInput implements Input<ReadonlyArray<string>> {
  constructor(public readonly keyedStore: KeyedStore<unknown>) {}

  async get(): Promise<ReadonlyArray<string>> {
    return await this.keyedStore.getKeys();
  }
}
