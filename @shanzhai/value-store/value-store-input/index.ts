import { Input } from "@shanzhai/interfaces";
import { ValueStoreInterface } from "../value-store-interface";

export class ValueStoreInput<T> implements Input<T> {
  constructor(public readonly valueStore: ValueStoreInterface<T>) {}

  get(): T {
    return this.valueStore.get();
  }
}
