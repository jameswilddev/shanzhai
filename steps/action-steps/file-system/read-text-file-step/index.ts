import * as path from "path";
import * as fs from "fs";
import { ActionStep } from "../../action-step";
import { Output } from "../../../outputs/output";

export class ReadTextFileStep extends ActionStep {
  constructor(
    public readonly pathSegments: ReadonlyArray<string>,
    public readonly output: Output<string>
  ) {
    super(`Read text file ${JSON.stringify(pathSegments.join(`/`))}`);
  }

  async execute(): Promise<void> {
    this.output.set(
      await fs.promises.readFile(path.join(...this.pathSegments), `utf8`)
    );
  }
}
