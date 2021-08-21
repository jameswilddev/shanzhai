import { ActionStep, UnkeyedStore } from "@shanzhai/interfaces";

export class DeleteFromUnkeyedStoreStep extends ActionStep {
  constructor(public readonly unkeyedStore: UnkeyedStore<unknown>) {
    super(`Delete from ${JSON.stringify(unkeyedStore.name)}`, [
      { type: `unkeyedStoreDelete`, unkeyedStore },
    ]);
  }

  async execute(): Promise<void> {
    this.unkeyedStore.delete();
  }
}
