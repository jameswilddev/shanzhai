import { ActionStep, UnkeyedStore } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which deletes the value from an {@link UnkeyedStore},
 * if one is set.
 */
export class DeleteFromUnkeyedStoreStep extends ActionStep {
  /**
   * @param unkeyedStore The {@link UnkeyedStore} to delete the value of.
   */
  constructor(public readonly unkeyedStore: UnkeyedStore<unknown>) {
    super(`Delete from ${JSON.stringify(unkeyedStore.name)}`, [
      { type: `unkeyedStoreDelete`, unkeyedStore },
    ]);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    this.unkeyedStore.delete();
  }
}
