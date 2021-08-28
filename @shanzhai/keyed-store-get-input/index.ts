import { Input, KeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link Input} which gets a specific key's value from a {@link KeyedStore}.
 * @template TValue The type of value held by the {@link KeyedStore}.
 */
export class KeyedStoreGetInput<TValue> implements Input<TValue> {
  /**
   * @param keyedStore The {@link KeyedStore} from which to retrieve a key's
   *                   value.
   * @param key        The key of the value to retrieve from the given
   *                   {@link keyedStore}.
   */
  constructor(
    public readonly keyedStore: KeyedStore<TValue>,
    public readonly key: string
  ) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<TValue> {
    return this.keyedStore.get(this.key);
  }
}
