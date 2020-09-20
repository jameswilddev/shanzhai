import { ActionStep } from "../action-steps/action-step";

export interface Step {
  readonly name: string;

  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void>;
}
