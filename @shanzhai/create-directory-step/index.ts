import * as path from "path";
import * as fs from "fs";
import { ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which creates a directory (and any parent directories)
 * which do not already exist.
 */
export class CreateDirectoryStep extends ActionStep {
  /**
   * @param name         A description of the operation being performed.
   * @param pathSegments An array of path segments to be combined into a path
   *                     to ensure exists as a directory.
   */
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>
  ) {
    super(name, []);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await fs.promises.mkdir(path.join(...this.pathSegments), {
      recursive: true,
    });
  }
}
