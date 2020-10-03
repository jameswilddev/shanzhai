import { ActionStep } from "@shanzhai/interfaces";
import { KeyValueStoreInterface } from "../key-value-store-interface";

export class DeleteFromKeyValueStoreStep<
  TKey extends string,
  TValue
> extends ActionStep {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>,
    public readonly key: TKey
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
