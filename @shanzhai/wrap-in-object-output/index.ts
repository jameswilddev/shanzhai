import { Output, Effect } from "@shanzhai/interfaces";

export class WrapInObjectOutput<TKey extends string, TValue>
  implements Output<TValue>
{
  public readonly effects: ReadonlyArray<Effect>;

  constructor(
    public readonly key: TKey,
    public readonly output: Output<{ readonly [TKeyInstance in TKey]: TValue }>
  ) {
    this.effects = output.effects;
  }

  async set(value: TValue): Promise<void> {
    this.output.set({ [this.key]: value } as {
      readonly [TKeyInstance in TKey]: TValue;
    });
  }
}
