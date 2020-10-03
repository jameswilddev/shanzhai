import { ActionStep } from "../action-step";
import { Output } from "../output";

export interface Step {
  readonly name: string;

  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void>;

  outputs: ReadonlyArray<Output<unknown>>;
}
