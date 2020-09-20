import { ValueStoreInterface } from "../value-store-interface";
import { Output } from "@shanzhai/interfaces";

export class ValueStoreOutput<T> implements Output<T> {
  constructor(public readonly valueStore: ValueStoreInterface<T>) {}

  set(value: T): void {
    this.valueStore.set(value);
  }
}
