import * as path from "path";
import * as fs from "fs";
import { Output, ActionStep } from "@shanzhai/interfaces";

/**
 * Reads a file from disk as a binary {@link Buffer}.
 */
export class ReadBinaryFileStep extends ActionStep {
  /**
   * @param name         A description of the operation being performed.
   * @param pathSegments An array of path segments forming the path to the file
   *                     to read.
   * @param output       An {@link Output} to which to write the read
   *                     {@link Buffer}.
   */
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>,
    public readonly output: Output<Buffer>
  ) {
    super(name, output.effects);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await this.output.set(
      await fs.promises.readFile(path.join(...this.pathSegments))
    );
  }
}
