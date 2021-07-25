import { ActionStep } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "../key-value-store-interface";

export class DeleteFromKeyValueStoreStep<TValue> extends ActionStep {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TValue>,
    public readonly key: string
  ) {
    super(
      `Delete ${JSON.stringify(key)} from ${JSON.stringify(
        keyValueStore.name
      )}`,
      [{ type: `keyedStoreDelete`, store: keyValueStore, key }]
    );
  }

  async execute(): Promise<void> {
    this.keyValueStore.delete(this.key);
  }
}
