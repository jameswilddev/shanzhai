import * as path from "path";
import * as fs from "fs";
import { Input, ActionStep } from "@shanzhai/interfaces";

export class WriteFileStep<T extends string | Buffer> extends ActionStep {
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>,
    public readonly input: Input<T>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    await fs.promises.writeFile(
      path.join(...this.pathSegments),
      this.input.get()
    );
  }
}
