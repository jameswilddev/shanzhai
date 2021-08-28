import { Effect } from "../effect";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../step";

/**
 * An object which stores the output of a {@link Step}.
 * @template T The type of value stored.
 */
export interface Output<T> {
  /**
   * Executed by the {@link Step} when it has produced a value.
   * @param value The value to store.
   */
  set(value: T): Promise<void>;

  /**
   * The {@link Effect}s of {@link set}ting this {@link Output}.
   */
  readonly effects: ReadonlyArray<Effect>;
}
