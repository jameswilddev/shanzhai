import { ActionStep, KeyedStore } from "@shanzhai/interfaces";

export class DeleteFromKeyedStoreStep extends ActionStep {
  constructor(
    public readonly keyedStore: KeyedStore<unknown>,
    public readonly key: string
  ) {
    super(
      `Delete ${JSON.stringify(key)} from ${JSON.stringify(keyedStore.name)}`,
      [{ type: `keyedStoreDelete`, keyedStore: keyedStore, key }]
    );
  }

  async execute(): Promise<void> {
    this.keyedStore.delete(this.key);
  }
}
