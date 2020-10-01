import * as path from "path";
import * as fs from "fs";
import { Output, ActionStep } from "@shanzhai/interfaces";

export class ReadBinaryFileStep extends ActionStep {
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>,
    public readonly output: Output<Buffer>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    await this.output.set(
      await fs.promises.readFile(path.join(...this.pathSegments))
    );
  }
}
