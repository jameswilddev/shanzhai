import { ActionStep, Input, Output } from "@shanzhai/interfaces";

export class CopyStep<TValue> extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<TValue>,
    public readonly output: Output<TValue>
  ) {
    super(name, output.effects);
  }

  async execute(): Promise<void> {
    await this.output.set(await this.input.get());
  }
}
