import * as pug from "pug";
import { Input, Output, ActionStep } from "@shanzhai/interfaces";

export class ParsePugStep extends ActionStep {
  constructor(
    public readonly name: string,
    public readonly input: Input<string>,
    public readonly output: Output<pug.compileTemplate>
  ) {
    super(name, output.effects);
  }

  async execute(): Promise<void> {
    await this.output.set(pug.compile(await this.input.get()));
  }
}
