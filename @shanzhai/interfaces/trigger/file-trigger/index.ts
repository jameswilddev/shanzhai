import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";

/**
 * Indicates that {@link Step}s are to be executed when a specific file is
 * created, changed or deleted.
 */
export type FileTrigger = {
  /**
   * Specifies that this is a {@link FileTrigger}.
   */
  readonly type: `file`;

  /**
   * Segments of the path to the file which triggers this {@link FileTrigger}.
   */
  readonly path: ReadonlyArray<string>;

  /**
   * Invoked when the file is deleted or changed.
   * @param path The {@link ParsedPath} of the deleted or changed file.
   * @returns The {@link Step} which is to be executed in response.
   */
  down(path: ParsedPath): Step;

  /**
   * Invoked when the file is added or changed.
   * @param path The {@link ParsedPath} of the added or changed file.
   * @returns The {@link Step} which is to be executed in response.
   */
  up(path: ParsedPath): Step;
};
