import { ActionStep, Input, Output } from "@shanzhai/interfaces";

export class CopyStep<TValue> extends ActionStep {
  constructor(
    public readonly input: Input<TValue>,
    public readonly output: Output<TValue>
  ) {
    super(`Copy`, output.effects);
  }

  async execute(): Promise<void> {
    await this.output.set(await this.input.get());
  }
}
