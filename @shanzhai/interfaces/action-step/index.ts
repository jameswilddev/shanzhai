import { Input } from "../input";
import { Output } from "../output";
import { Step } from "../step";

export abstract class ActionStep implements Step {
  constructor(
    public readonly name: string,
    public readonly inputs: ReadonlyArray<Input<unknown>>,
    public readonly outputs: ReadonlyArray<Output<unknown>>
  ) {}

  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void> {
    return callback(this);
  }

  abstract execute(): Promise<void>;
}
