import { ParsedPath } from "../../parsed-path";
import { Step } from "../../step";

/**
 * Indicates that {@link Step}s are to be executed when files with a specific
 * extension are created, changed or deleted.
 */
export type FileExtensionTrigger = {
  /**
   * Specifies that this is a {@link FileExtensionTrigger}.
   */
  readonly type: `fileExtension`;

  /**
   * The file extension which triggers this {@link FileExtensionTrigger}.
   */
  readonly extension: string;

  /**
   * Invoked when a matching file is deleted or changed.
   * @param path The {@link ParsedPath} of the deleted or changed file.
   * @returns The {@link Step} which is to be executed in response.
   */
  down(path: ParsedPath): Step;

  /**
   * Invoked when a matching file is added or changed.
   * @param path The {@link ParsedPath} of the added or changed file.
   * @returns The {@link Step} which is to be executed in response.
   */
  up(path: ParsedPath): Step;
};
