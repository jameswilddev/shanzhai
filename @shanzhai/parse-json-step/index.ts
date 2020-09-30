import { Input, Output, ActionStep, Json } from "@shanzhai/interfaces";

export class ParseJsonStep extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<string>,
    public readonly output: Output<Json>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    this.output.set(JSON.parse(this.input.get()));
  }
}
