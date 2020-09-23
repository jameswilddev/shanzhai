import { Input } from "@shanzhai/interfaces";

export class ConstantInput<TValue> implements Input<TValue> {
  constructor(public readonly value: TValue) {}

  get(): TValue {
    return this.value;
  }
}
