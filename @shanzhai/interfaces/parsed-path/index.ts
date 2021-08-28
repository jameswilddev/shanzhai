/**
 * Describes a parsed file path.
 */
export type ParsedPath = {
  /**
   * A {@link String} which is unique and safe to use as a Javascript and/or
   * TypeScript identifier.
   */
  readonly typeScriptName: string;

  /**
   * The full, unmodified path.
   */
  readonly fullPath: string;

  /**
   * The file extension.
   */
  readonly fileExtension: string;

  /**
   * The full path, minus the file extension.
   */
  readonly fullPathWithoutExtension: string;
};
