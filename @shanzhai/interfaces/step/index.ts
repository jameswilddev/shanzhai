import { ActionStep } from "../action-step";
import { Input } from "../input";
import { Output } from "../output";

export interface Step {
  readonly name: string;

  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void>;

  inputs: ReadonlyArray<Input<unknown>>;
  outputs: ReadonlyArray<Output<unknown>>;
}
