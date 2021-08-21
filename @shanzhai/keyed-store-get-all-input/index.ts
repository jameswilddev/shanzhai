import { Input, KeyedStore } from "@shanzhai/interfaces";

export class KeyedStoreGetAllInput<TValue>
  implements Input<{ readonly [key: string]: TValue }>
{
  constructor(public readonly keyedStore: KeyedStore<TValue>) {}

  async get(): Promise<{ readonly [key: string]: TValue }> {
    return await this.keyedStore.getAll();
  }
}
