import * as path from "path";
import * as fs from "fs";
import { Output, ActionStep } from "@shanzhai/interfaces";

/**
 * Reads a file from disk as a text {@link Strung}.
 */
export class ReadTextFileStep extends ActionStep {
  /**
   * @param pathSegments An array of path segments forming the path to the file
   *                     to read.
   * @param output       An {@link Output} to which to write the read
   *                     {@link Strung}.
   */
  constructor(
    public readonly pathSegments: ReadonlyArray<string>,
    public readonly output: Output<string>
  ) {
    super(
      `Read text file ${JSON.stringify(pathSegments.join(`/`))}`,
      output.effects
    );
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await this.output.set(
      await fs.promises.readFile(path.join(...this.pathSegments), `utf8`)
    );
  }
}
