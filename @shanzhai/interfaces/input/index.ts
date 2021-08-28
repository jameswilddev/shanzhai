// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Step } from "../step";

/**
 * An object which provides a value to a {@link Step}.
 * @template T The type of value provided.
 */
export interface Input<T> {
  /**
   * Executed by the {@link Step} when it requires a value.
   * @returns The provided value.
   */
  get(): Promise<T>;
}
