import { ValueStoreInterface } from "../value-store-interface";
import { Output } from "@shanzhai/interfaces";

export class ValueStoreOutput<T> implements Output<T> {
  constructor(public readonly valueStore: ValueStoreInterface<T>) {}

  async set(value: T): Promise<void> {
    this.valueStore.set(value);
  }
}
