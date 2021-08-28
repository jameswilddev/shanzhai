import { ActionStep, KeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which deletes a value from a {@link KeyedStore},
 * if it is set.
 */
export class DeleteFromKeyedStoreStep extends ActionStep {
  /**
   * @param keyedStore The {@link KeyedStore} to delete a key/value from.
   * @param key        The key to delete from the given {@link keyedStore}.
   */
  constructor(
    public readonly keyedStore: KeyedStore<unknown>,
    public readonly key: string
  ) {
    super(
      `Delete ${JSON.stringify(key)} from ${JSON.stringify(keyedStore.name)}`,
      [{ type: `keyedStoreDelete`, keyedStore: keyedStore, key }]
    );
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    this.keyedStore.delete(this.key);
  }
}
