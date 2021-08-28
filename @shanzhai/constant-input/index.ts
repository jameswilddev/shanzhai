import { Input } from "@shanzhai/interfaces";

/**
 * An {@link Input} which provides a constant value.
 * @template TValue The type of the value provided.
 */
export class ConstantInput<TValue> implements Input<TValue> {
  /**
   * @param value The value provided.
   */
  constructor(public readonly value: TValue) {}

  /**
   * @inheritdoc
   */
  async get(): Promise<TValue> {
    return this.value;
  }
}
