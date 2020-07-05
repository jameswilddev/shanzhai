import { ValueStoreInterface } from "../../../stores/value-store";
import { Output } from "../output";

export class ValueStoreOutput<T> implements Output<T> {
  constructor(public readonly valueStore: ValueStoreInterface<T>) {}

  set(value: T): void {
    this.valueStore.set(value);
  }
}
