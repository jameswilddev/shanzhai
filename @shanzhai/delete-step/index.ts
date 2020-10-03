import * as path from "path";
import * as fs from "fs";
import { ActionStep } from "@shanzhai/interfaces";

export class DeleteStep extends ActionStep {
  constructor(
    name: string,
    public readonly pathSegments: ReadonlyArray<string>
  ) {
    super(name, []);
  }

  async execute(): Promise<void> {
    await fs.promises.rmdir(path.join(...this.pathSegments), {
      recursive: true,
    });
  }
}
