import { ValueStoreInterface } from "../../../stores/value-store";
import { Input } from "@shanzhai/interfaces";

export class ValueStoreInput<T> implements Input<T> {
  constructor(public readonly valueStore: ValueStoreInterface<T>) {}

  get(): T {
    return this.valueStore.get();
  }
}
