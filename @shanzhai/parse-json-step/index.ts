import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

export class ParseJsonStep extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<string>,
    public readonly output: Output<Json>
  ) {
    super(name, output.effects);
  }

  async execute(): Promise<void> {
    await this.output.set(JSON.parse(await this.input.get()));
  }
}
