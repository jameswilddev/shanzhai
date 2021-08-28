import { Output } from "@shanzhai/interfaces";

/**
 * An {@link Output} which discards all values provided to it.
 * @template TValue The type of values to discard.
 */
export class NullOutput<TValue> implements Output<TValue> {
  /**
   * @inheritdoc
   */
  async set(value: TValue): Promise<void> {
    value;
  }

  /**
   * @inheritdoc
   */
  readonly effects = [];
}
