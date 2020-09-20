import { ActionStep } from "../../action-step";
import { KeyValueStoreInterface } from "../../../../stores/key-value-store";

export class DeleteFromKeyValueStoreStep<
  TKey extends string,
  TValue
> extends ActionStep {
  constructor(
    public readonly keyValueStore: KeyValueStoreInterface<TKey, TValue>,
    public readonly key: TKey
  ) {
    super(
      `Delete ${JSON.stringify(key)} from ${JSON.stringify(keyValueStore.name)}`
    );
  }

  async execute(): Promise<void> {
    this.keyValueStore.delete(this.key);
  }
}
