import { Step } from "../../step";

/**
 * Indicates that a {@link Step} is to be executed when the build process
 * starts, before any other events are raised.
 */
export type OneTimeTrigger = {
  /**
   * Specifies that this is a {@link OneTimeTrigger}.
   */
  readonly type: `oneTime`;

  up(): Step;
};
