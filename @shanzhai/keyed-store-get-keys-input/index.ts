import { Input, KeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link Input} which gets all keys from a {@link KeyedStore} as an array of
 * strings.
 */
export class KeyedStoreGetKeysInput implements Input<ReadonlyArray<string>> {
  /**
   * @param keyedStore The {@link KeyedStore} from which to retrieve all keys.
   */
  constructor(public readonly keyedStore: KeyedStore<unknown>) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<ReadonlyArray<string>> {
    return await this.keyedStore.getKeys();
  }
}
