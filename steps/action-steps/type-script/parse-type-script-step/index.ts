import * as typescript from "typescript";
import { ActionStep } from "../../action-step";
import { Input } from "../../../inputs/input";
import { Output } from "../../../outputs/output";
import { compilerOptions } from "../compiler-options";

export class ParseTypeScriptStep extends ActionStep {
  constructor(
    name: string,
    public readonly input: Input<string>,
    public readonly fileName: string,
    public readonly output: Output<typescript.SourceFile>
  ) {
    super(name);
  }

  async execute(): Promise<void> {
    const input = this.input.get();

    const result = typescript.createSourceFile(
      this.fileName,
      input,
      typescript.ScriptTarget.ES3,
      false,
      typescript.ScriptKind.TS
    );

    const diagnostics = typescript
      .createProgram({ rootNames: [], options: compilerOptions })
      .getSyntacticDiagnostics(result);

    if (diagnostics.length > 0) {
      let output = `Failed to parse TypeScript:`;

      for (const diagnostic of diagnostics) {
        const line =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line +
          1;

        const message = typescript.flattenDiagnosticMessageText(
          diagnostic.messageText,
          `\n`,
          1
        );

        output += `\nLine ${line}: ${message}`;
      }

      throw new Error(output);
    }

    this.output.set(result);
  }
}
