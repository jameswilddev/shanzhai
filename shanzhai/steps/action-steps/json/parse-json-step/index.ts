import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { Json } from "../../../../json";

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
