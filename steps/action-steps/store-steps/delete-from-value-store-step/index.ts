import { ActionStep } from "../../action-step";
import { ValueStoreInterface } from "../../../../stores/value-store";

export class DeleteFromValueStoreStep<TValue> extends ActionStep {
  constructor(public readonly valueStore: ValueStoreInterface<TValue>) {
    super(`Delete from ${JSON.stringify(valueStore.name)}`);
  }

  async execute(): Promise<void> {
    this.valueStore.delete();
  }
}
