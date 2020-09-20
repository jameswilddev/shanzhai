import { ActionStep } from "@shanzhai/interfaces";
import { ValueStoreInterface } from "../value-store-interface";

export class DeleteFromValueStoreStep<TValue> extends ActionStep {
  constructor(public readonly valueStore: ValueStoreInterface<TValue>) {
    super(`Delete from ${JSON.stringify(valueStore.name)}`);
  }

  async execute(): Promise<void> {
    this.valueStore.delete();
  }
}
