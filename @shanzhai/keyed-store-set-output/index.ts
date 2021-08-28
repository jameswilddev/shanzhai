import { Output, Effect, KeyedStore } from "@shanzhai/interfaces";

/**
 * A {@link Output} which sets a key/value in a {@link KeyedStore}.
 */
export class KeyedStoreSetOutput<TValue> implements Output<TValue> {
  /**
   * @param keyedStore The {@link KeyedStore} in which a key/value is to be set.
   * @param key        The key which is to be set in the given
   *                   {@link keyedStore}.
   */
  constructor(
    public readonly keyedStore: KeyedStore<TValue>,
    public readonly key: string
  ) {}

  /**
   * @inheritdoc
   */
  async set(value: TValue): Promise<void> {
    this.keyedStore.set(this.key, value);
  }

  /**
   * @inheritdoc
   */
  readonly effects: ReadonlyArray<Effect> = [
    {
      type: `keyedStoreSet`,
      keyedStore: this.keyedStore,
      key: this.key,
    },
  ];
}
