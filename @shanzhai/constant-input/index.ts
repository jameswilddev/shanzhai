import { Input } from "@shanzhai/interfaces";

export class ConstantInput<TValue> implements Input<TValue> {
  constructor(public readonly value: TValue) {}

  async get(): Promise<TValue> {
    return this.value;
  }
}
