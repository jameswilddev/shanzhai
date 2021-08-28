import { ActionStep, Input, Output } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which copies a value from an {@link Input} to an
 * {@link Output}.
 * @template TValue The type of the value to copy.
 */
export class CopyStep<TValue> extends ActionStep {
  /**
   * @param name A description of the operation being performed.
   * @param input An {@link Input} from which to retrieve the value to copy.
   * @param output An {@link Output} to which to provide the value being copied.
   */
  constructor(
    name: string,
    public readonly input: Input<TValue>,
    public readonly output: Output<TValue>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await this.output.set(await this.input.get());
  }
}
