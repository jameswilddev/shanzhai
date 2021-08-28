import { Effect } from "../effect";
import { Step } from "../step";

/**
 * A base class for {@link Step}s which perform an action.
 */
export abstract class ActionStep implements Step {
  /**
   * @param name The {@link name} of this {@link ActionStep}.
   * @param effects The {@link Effect}s of executing this {@link ActionStep}.
   */
  constructor(
    public readonly name: string,
    public readonly effects: ReadonlyArray<Effect>
  ) {}

  /**
   * @inheritdoc
   */
  executePerActionStep(
    callback: (actionStep: ActionStep) => Promise<void>
  ): Promise<void> {
    return callback(this);
  }

  /**
   * Implement to define this {@link ActionStep}'s behavior.
   */
  abstract execute(): Promise<void>;
}
