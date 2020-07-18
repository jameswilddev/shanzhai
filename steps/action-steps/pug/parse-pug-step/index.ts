import * as pug from "pug";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { ActionStep } from "../../action-step";

export class ParsePugStep extends ActionStep {
  constructor(
    public readonly name: string,
    public readonly input: Input<string>,
    public readonly output: Output<pug.compileTemplate>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    this.output.set(pug.compile(this.input.get()));
  }
}
