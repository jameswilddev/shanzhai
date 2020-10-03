import { ActionStep } from "../action-step";
import { Effect } from "../effect";

export interface Step {
  readonly name: string;

  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void>;

  effects: ReadonlyArray<Effect>;
}
