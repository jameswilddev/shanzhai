import * as path from "path";
import * as fs from "fs";
import { ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which deletes a file or directory if it exists.
 */
export class DeleteStep extends ActionStep {
  /**
   * @param name         A description of the operation being performed.
   * @param pathSegments An array of path segments to be combined into a path
   *                     to delete if it exists.
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
    await fs.promises.rmdir(path.join(...this.pathSegments), {
      recursive: true,
    });
  }
}
