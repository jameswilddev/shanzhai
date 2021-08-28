import { Input, KeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link Input} which gets all keys and values from a {@link KeyedStore} as
 * an object.
 * @template TValue The type of value held by the {@link KeyedStore}.
 */
export class KeyedStoreGetAllInput<TValue>
  implements Input<{ readonly [key: string]: TValue }>
{
  /**
   * @param keyedStore The {@link KeyedStore} from which to retrieve all keys
   *                   and values.
   */
  constructor(public readonly keyedStore: KeyedStore<TValue>) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<{ readonly [key: string]: TValue }> {
    return await this.keyedStore.getAll();
  }
}
