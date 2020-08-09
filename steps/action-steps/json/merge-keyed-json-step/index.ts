import { KeyedJson } from "../convert-json-to-type-script-step";
import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";

export class MergeKeyedJsonStep extends ActionStep {
  constructor(
    name: string,
    public readonly inputs: ReadonlyArray<Input<KeyedJson>>,
    public readonly output: Output<KeyedJson>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    let output: KeyedJson = {};

    for (const input of this.inputs) {
      output = { ...output, ...input.get() };
    }

    this.output.set(output);
  }
}
