import { Output, Effect } from "@shanzhai/interfaces";

/**
 * A {@link Output} which wraps a value in an object with a single key/value.
 * @template TKey   The key to use when wrapping the value.
 * @template TValue The type of the value to wrap.
 */
export class WrapInObjectOutput<TKey extends string, TValue>
  implements Output<TValue>
{
  /**
   * @inheritdoc
   */
  public readonly effects: ReadonlyArray<Effect>;

  /**
   * @param key    The key to use when wrapping the value in an object.
   * @param output The object to which to pass the wrapped value.
   */
  constructor(
    public readonly key: TKey,
    public readonly output: Output<{ readonly [TKeyInstance in TKey]: TValue }>
  ) {
    this.effects = output.effects;
  }

  /**
   * @inheritdoc
   */
  async set(value: TValue): Promise<void> {
    this.output.set({ [this.key]: value } as {
      readonly [TKeyInstance in TKey]: TValue;
    });
  }
}
