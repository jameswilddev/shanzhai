import * as path from "path";
import * as fs from "fs";
import { ActionStep } from "../../action-step";

export class CreateDirectoryStep extends ActionStep {
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    await fs.promises.mkdir(path.join(...this.pathSegments), {
      recursive: true,
    });
  }
}
