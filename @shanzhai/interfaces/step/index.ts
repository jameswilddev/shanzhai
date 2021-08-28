import { ActionStep } from "../action-step";
import { Effect } from "../effect";

/**
 * A discrete unit of computation during a build.
 */
export interface Step {
  /**
   * Used to identify this {@link Step} in user interfaces.
   */
  readonly name: string;

  /**
   * Executes a callback per {@link ActionStep}.  If multiple
   * {@link ActionStep}s exist within this {@link Step} (should this
   * {@link Step} be an aggregation {@link Step} for example) this must adhere
   * to ordering constraints in the case of SerialSteps for example.
   *
   * This is used in a number of contexts, such as counting the number of steps
   * which need to be executed, to actually executing them, with the callback
   * being used to feed back before and after execution.
   * @param callback The callback to be executed for each {@link ActionStep}.
   */
  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void>;

  /**
   * A list of the {@link Effect}s which will be
   */
  effects: ReadonlyArray<Effect>;
}
