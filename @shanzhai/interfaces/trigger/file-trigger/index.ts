import { Step } from "../../step";

/**
 * Indicates that {@link Step}s are to be executed when files matching a glob
 * pattern are created, updated or deleted.
 */
export type FileTrigger = {
  /**
   * Specifies that this is a {@link FileTrigger}.
   */
  readonly type: `file`;

  /**
   * The glob pattern which triggers this {@link FileTrigger}.
   */
  readonly glob: string;

  /**
   * Invoked when the file is deleted or changed.
   * @param path The path to the deleted or changed file.
   * @returns The {@link Step} which is to be executed in response.
   */
  down(path: string): Step;

  /**
   * Invoked when the file is added or changed.
   * @param path The path to the added or changed file.
   * @returns The {@link Step} which is to be executed in response.
   */
  up(path: string): Step;
};
