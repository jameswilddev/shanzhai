import * as path from "path";
import * as fs from "fs";
import { Input, ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which writes to files on disk.
 * @template T The type of the file content to write.
 */
export class WriteFileStep<T extends string | Buffer> extends ActionStep {
  /**
   * @param name         A description of the operation being performed.
   * @param pathSegments An array of path segments to be combined into a path
   *                     to write to.
   * @param input        An {@link Input} from which to retrieve a
   *                     {@link String} or {@link Buffer} to write to the
   *                     specified file.
   */
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>,
    public readonly input: Input<T>
  ) {
    super(name, []);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    await fs.promises.writeFile(
      path.join(...this.pathSegments),
      await this.input.get()
    );
  }
}
